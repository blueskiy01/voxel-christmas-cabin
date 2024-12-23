import * as THREE from 'three';

export const createCatHead = () => {
  const headGroup = new THREE.Group();
  
  // Head sphere
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 8, 8),
    new THREE.MeshPhongMaterial({ color: 0xFFA500 })
  );
  head.position.set(0, 0.7, 0.9);
  headGroup.add(head);

  // Ears
  const earGeometry = new THREE.ConeGeometry(0.15, 0.3, 4);
  const earMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA500 });
  
  const leftEar = new THREE.Mesh(earGeometry, earMaterial);
  leftEar.position.set(-0.2, 1.0, 0.9);
  leftEar.rotation.x = -Math.PI / 6;
  headGroup.add(leftEar);
  
  const rightEar = new THREE.Mesh(earGeometry, earMaterial);
  rightEar.position.set(0.2, 1.0, 0.9);
  rightEar.rotation.x = -Math.PI / 6;
  headGroup.add(rightEar);

  return headGroup;
};