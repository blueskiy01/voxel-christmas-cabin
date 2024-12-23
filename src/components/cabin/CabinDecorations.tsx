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
    const ornamentMaterial = new THREE.MeshLambertMaterial({
      color: Math.random() > 0.5 ? 0xFF0000 : 0xFFD700,
      flatShading: true
    });
    
    for(let i = 0; i < 4; i++) {
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

  // Add star on top
  const starGeometry = new THREE.OctahedronGeometry(0.5, 0);
  const starMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFD700,
    emissive: 0xFFD700,
    emissiveIntensity: 0.5,
    flatShading: true
  });
  const star = new THREE.Mesh(starGeometry, starMaterial);
  star.position.set(-5, 6.5, -5);
  star.rotation.y = Math.PI / 4;
  scene.add(star);

  // Enhanced Fireplace
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

  // Animated fire glow
  const fireGeometry = new THREE.BoxGeometry(3, 2, 0.5);
  const fireMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xFF4500,
    transparent: true,
    opacity: 0.8
  });
  const fire = new THREE.Mesh(fireGeometry, fireMaterial);
  fire.position.set(5, 1.5, -14.2);
  scene.add(fire);

  // Add stockings
  const createStocking = (x: number) => {
    const stockingGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.3);
    const stockingMaterial = new THREE.MeshLambertMaterial({
      color: 0xC41E3A,
      flatShading: true
    });
    const stocking = new THREE.Mesh(stockingGeometry, stockingMaterial);
    stocking.position.set(x, 3.2, -14.2);
    scene.add(stocking);
  };

  createStocking(3.5);
  createStocking(5);
  createStocking(6.5);
};