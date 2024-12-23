import * as THREE from 'three';

export const createFireEffect = (scene: THREE.Scene, position: THREE.Vector3) => {
  // Create fire particles with more particles for better effect
  const particleCount = 150;
  const particles = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    // Random position within fire area
    particles[i] = (Math.random() - 0.5) * 2; // x
    particles[i + 1] = Math.random() * 2; // y
    particles[i + 2] = (Math.random() - 0.5) * 0.5; // z
    
    // Create a gradient from bright orange at the bottom to red at the top
    const heightFactor = particles[i + 1] / 2; // normalized height (0 to 1)
    const color = new THREE.Color();
    
    // Mix between warm orange (#F97316) at the bottom and deep red (#ea384c) at the top
    if (heightFactor < 0.3) {
      // Bottom of flame - bright orange
      color.setHex(0xF97316);
    } else if (heightFactor < 0.7) {
      // Middle of flame - mix of orange and red
      color.setHSL(0.05, 1.0, 0.6 - heightFactor * 0.3);
    } else {
      // Top of flame - darker red
      color.setHex(0xea384c);
    }
    
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.15,
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
      // Move particles upward with varying speeds
      positions[i + 1] += 0.03 + Math.random() * 0.02;
      
      // Add slight horizontal movement for flickering effect
      positions[i] += (Math.random() - 0.5) * 0.02;
      positions[i + 2] += (Math.random() - 0.5) * 0.02;
      
      // Reset particles that reach the top
      if (positions[i + 1] > 2) {
        positions[i + 1] = 0;
        positions[i] = (Math.random() - 0.5) * 2;
        positions[i + 2] = (Math.random() - 0.5) * 0.5;
        
        // Reset color to bright orange when particle restarts
        const color = new THREE.Color(0xF97316);
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