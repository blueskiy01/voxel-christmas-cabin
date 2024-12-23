import * as THREE from 'three';

export const setupChristmasTree = (scene: THREE.Scene) => {
  // Create tree layers
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
};