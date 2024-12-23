import * as THREE from 'three';

export const createCatLegs = () => {
  const legsGroup = new THREE.Group();
  const legGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.6);
  const legMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA500 });

  // Create exactly 4 legs
  const legPositions = [
    { x: -0.3, z: 0.6 },  // Front left
    { x: 0.3, z: 0.6 },   // Front right
    { x: -0.3, z: -0.4 }, // Back left
    { x: 0.3, z: -0.4 }   // Back right
  ];

  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos.x, 0.3, pos.z);
    legsGroup.add(leg);
  });

  return legsGroup;
};

export const animateLegs = (legsGroup: THREE.Group) => {
  legsGroup.children.forEach((leg, index) => {
    (leg as THREE.Mesh).position.y = 0.3 + Math.sin(Date.now() * 0.008 + index * Math.PI/2) * 0.1;
  });
};