import * as THREE from 'three';

export const setupDecorations = (scene: THREE.Scene) => {
  // Enhanced Christmas Tree with star
  const createTreeLayer = (y: number, scale: number) => {
    const geometry = new THREE.BoxGeometry(scale, 1, scale);
    const material = new THREE.MeshLambertMaterial({ 
      color: 0x228B22,
      flatShading: true 
    });
    const layer = new THREE.Mesh(geometry, material);
    layer.position.set(-5, y, -5);
    scene.add(layer);
    
    // Add ornaments to each layer
    const ornamentGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    
    for(let i = 0; i < 4; i++) {
      const ornamentMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() > 0.5 ? 0xFF0000 : 0xFFD700,
        flatShading: true
      });
      const ornament = new THREE.Mesh(ornamentGeometry, ornamentMaterial);
      const angle = (i / 4) * Math.PI * 2;
      ornament.position.set(
        -5 + Math.cos(angle) * (scale/2),
        y + 0.5,
        -5 + Math.sin(angle) * (scale/2)
      );
      scene.add(ornament);
    }
  };

  // Create tree layers
  for(let i = 0; i < 5; i++) {
    createTreeLayer(i + 1, 4 - (i * 0.5));
  }

  // Add glowing star on top
  const starGeometry = new THREE.OctahedronGeometry(0.5, 0);
  const starMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFD700,
    emissive: 0xFFD700,
    emissiveIntensity: 0.8,
    flatShading: true
  });
  const star = new THREE.Mesh(starGeometry, starMaterial);
  star.position.set(-5, 6.5, -5);
  star.rotation.y = Math.PI / 4;
  scene.add(star);

  // Interactive Fireplace
  const fireplaceGeometry = new THREE.BoxGeometry(4, 4, 1);
  const fireplaceMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x8B4513,
    flatShading: true 
  });
  const fireplace = new THREE.Mesh(fireplaceGeometry, fireplaceMaterial);
  fireplace.position.set(5, 2, -14.5);
  scene.add(fireplace);

  // Fireplace mantel
  const mantelGeometry = new THREE.BoxGeometry(5, 0.3, 1.2);
  const mantel = new THREE.Mesh(mantelGeometry, fireplaceMaterial);
  mantel.position.set(5, 4, -14.4);
  scene.add(mantel);

  // Create dynamic fire particles
  const fireParticles: THREE.Mesh[] = [];
  const fireParticleCount = 50;
  const fireGeometry = new THREE.SphereGeometry(0.1, 8, 8);

  for (let i = 0; i < fireParticleCount; i++) {
    const fireMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xFF4500),
      transparent: true,
      opacity: Math.random() * 0.5 + 0.5
    });
    
    const particle = new THREE.Mesh(fireGeometry, fireMaterial);
    
    // Set initial position within the fireplace
    particle.position.set(
      5 + (Math.random() - 0.5) * 2, // x: spread across fireplace width
      1 + Math.random() * 2,         // y: start from bottom
      -14.2                          // z: slightly in front of fireplace
    );
    
    // Add custom properties for animation
    particle.userData.velocity = Math.random() * 0.02 + 0.01;
    particle.userData.wiggle = Math.random() * Math.PI;
    particle.userData.originalX = particle.position.x;
    
    fireParticles.push(particle);
    scene.add(particle);
  }

  // Animation function for fire
  const animateFire = () => {
    fireParticles.forEach(particle => {
      // Move particle upward
      particle.position.y += particle.userData.velocity;
      
      // Add horizontal wiggle
      particle.userData.wiggle += 0.1;
      particle.position.x = particle.userData.originalX + Math.sin(particle.userData.wiggle) * 0.1;
      
      // Update color based on height
      const material = particle.material as THREE.MeshBasicMaterial;
      const heightFactor = (particle.position.y - 1) / 2; // normalize height
      material.color.setHSL(0.05 - heightFactor * 0.05, 1, 0.5 + heightFactor * 0.2);
      
      // Update opacity
      material.opacity = Math.max(0, 1 - heightFactor);
      
      // Reset particle when it reaches the top
      if (particle.position.y > 3) {
        particle.position.y = 1;
        particle.userData.wiggle = Math.random() * Math.PI;
        material.opacity = 1;
      }
    });
    
    requestAnimationFrame(animateFire);
  };
  animateFire();

  // Add snowfall
  const snowflakeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
  const snowflakeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const snowflakes: THREE.Mesh[] = [];

  for (let i = 0; i < 100; i++) {
    const snowflake = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial);
    snowflake.position.set(
      Math.random() * 40 - 20,
      Math.random() * 10 + 5,
      Math.random() * 40 - 20
    );
    snowflake.userData.velocity = Math.random() * 0.02 + 0.01;
    snowflakes.push(snowflake);
    scene.add(snowflake);
  }

  // Animation function for snowfall
  const animateSnow = () => {
    snowflakes.forEach(snowflake => {
      snowflake.position.y -= snowflake.userData.velocity;
      if (snowflake.position.y < 0) {
        snowflake.position.y = 15;
      }
    });
    requestAnimationFrame(animateSnow);
  };
  animateSnow();
};
