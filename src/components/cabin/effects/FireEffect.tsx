import * as THREE from 'three';

export const createFireEffect = (scene: THREE.Scene, position: THREE.Vector3) => {
  // Create fire particles with more particles for better effect
  const particleCount = 200;
  const particles = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    // Random position within fire area - make it wider at bottom, narrower at top
    const heightRatio = Math.random();
    const spread = 1 - heightRatio * 0.7; // Wider at bottom, narrower at top
    particles[i] = (Math.random() - 0.5) * spread; // x
    particles[i + 1] = heightRatio * 2; // y
    particles[i + 2] = (Math.random() - 0.5) * spread * 0.5; // z
    
    // Create a gradient from bright orange at the bottom to red at the top
    const heightFactor = heightRatio; // normalized height (0 to 1)
    const color = new THREE.Color();
    
    // Enhanced color gradient for more realistic fire
    if (heightFactor < 0.3) {
      // Bottom of flame - bright orange with slight variation
      color.setHSL(0.05, 1.0, 0.7 + Math.random() * 0.2);
    } else if (heightFactor < 0.7) {
      // Middle of flame - mix of orange and red
      color.setHSL(0.05 - heightFactor * 0.05, 1.0, 0.6 - heightFactor * 0.2);
    } else {
      // Top of flame - darker red with slight variation
      color.setHSL(0.02, 0.9, 0.4 - (heightFactor - 0.7) * 0.3);
    }
    
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
  
  const fireParticles = new THREE.Points(geometry, material);
  fireParticles.position.copy(position);
  scene.add(fireParticles);
  
  // Animation function with more natural movement
  const animate = () => {
    const positions = geometry.attributes.position.array as Float32Array;
    const colors = geometry.attributes.color.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      // Move particles upward with varying speeds based on height
      const currentHeight = positions[i + 1];
      const speedFactor = 1 - (currentHeight / 2); // Slower at top
      positions[i + 1] += (0.04 + Math.random() * 0.02) * speedFactor;
      
      // Add slight horizontal movement for flickering effect
      positions[i] += (Math.random() - 0.5) * 0.03;
      positions[i + 2] += (Math.random() - 0.5) * 0.03;
      
      // Reset particles that reach the top
      if (positions[i + 1] > 2) {
        const spread = 1; // Full spread at bottom
        positions[i + 1] = 0;
        positions[i] = (Math.random() - 0.5) * spread;
        positions[i + 2] = (Math.random() - 0.5) * spread * 0.5;
        
        // Reset color to bright orange when particle restarts
        const color = new THREE.Color();
        color.setHSL(0.05, 1.0, 0.7 + Math.random() * 0.2);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    requestAnimationFrame(animate);
  };
  
  animate();
  
  return fireParticles;
};