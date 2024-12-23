import * as THREE from 'three';
import { useEffect, useMemo } from 'react';

export const createFireEffect = (scene: THREE.Scene, position: THREE.Vector3) => {
  // Create fire particles
  const particleCount = 100;
  const particles = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    // Random position within fire area
    particles[i] = (Math.random() - 0.5) * 2; // x
    particles[i + 1] = Math.random() * 2; // y
    particles[i + 2] = (Math.random() - 0.5) * 0.5; // z
    
    // Color gradient from yellow to red
    const color = new THREE.Color();
    color.setHSL(0.05 + Math.random() * 0.05, 1, 0.5 + Math.random() * 0.2);
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.1,
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
      // Move particles upward
      positions[i + 1] += 0.02;
      
      // Add some random horizontal movement
      positions[i] += (Math.random() - 0.5) * 0.02;
      positions[i + 2] += (Math.random() - 0.5) * 0.02;
      
      // Reset particles that reach the top
      if (positions[i + 1] > 2) {
        positions[i + 1] = 0;
        positions[i] = (Math.random() - 0.5) * 2;
        positions[i + 2] = (Math.random() - 0.5) * 0.5;
      }
    }
    
    geometry.attributes.position.needsUpdate = true;
    requestAnimationFrame(animate);
  };
  
  animate();
  
  return fireParticles;
};