import * as THREE from 'three';

export const createFireEffect = (scene: THREE.Scene, position: THREE.Vector3) => {
  // Create fire particles
  const particleCount = 150;
  const particles = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    // Random position within fire area
    particles[i] = (Math.random() - 0.5) * 1.5; // x
    particles[i + 1] = Math.random() * 2; // y
    particles[i + 2] = (Math.random() - 0.5) * 0.3; // z
    
    // Enhanced color gradient from yellow to orange to red
    const color = new THREE.Color();
    const hue = 0.05 + Math.random() * 0.05; // Range from orange-red to yellow
    const saturation = 0.8 + Math.random() * 0.2; // High saturation
    const lightness = 0.6 + Math.random() * 0.3; // Brighter colors
    color.setHSL(hue, saturation, lightness);
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
  
  // Animation function
  const animate = () => {
    const positions = geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      // Enhanced particle movement
      positions[i + 1] += 0.03 + Math.random() * 0.02; // Varied upward speed
      positions[i] += (Math.random() - 0.5) * 0.03; // Slight horizontal drift
      positions[i + 2] += (Math.random() - 0.5) * 0.01; // Minimal depth movement
      
      // Reset particles that reach the top
      if (positions[i + 1] > 2) {
        positions[i + 1] = 0;
        positions[i] = (Math.random() - 0.5) * 1.5;
        positions[i + 2] = (Math.random() - 0.5) * 0.3;
      }
    }
    
    geometry.attributes.position.needsUpdate = true;
    requestAnimationFrame(animate);
  };
  
  animate();
  
  return fireParticles;
};