import * as THREE from 'three';

export const setupDecorations = (scene: THREE.Scene) => {
  // Christmas Tree (simplified voxel style)
  const treeGeometry = new THREE.BoxGeometry(2, 3, 2);
  const treeMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x228B22,
    flatShading: true 
  });
  const tree = new THREE.Mesh(treeGeometry, treeMaterial);
  tree.position.set(-3, 1.5, -3);
  scene.add(tree);

  // Fireplace
  const fireplaceGeometry = new THREE.BoxGeometry(2, 2, 1);
  const fireplaceMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x8B4513,
    flatShading: true 
  });
  const fireplace = new THREE.Mesh(fireplaceGeometry, fireplaceMaterial);
  fireplace.position.set(3, 1, -4.5);
  scene.add(fireplace);

  // Fire glow (simple box for now)
  const fireGlowGeometry = new THREE.BoxGeometry(1.5, 1, 0.5);
  const fireGlowMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xFF4500,
    transparent: true,
    opacity: 0.6 
  });
  const fireGlow = new THREE.Mesh(fireGlowGeometry, fireGlowMaterial);
  fireGlow.position.set(3, 0.5, -4.2);
  scene.add(fireGlow);
};