import * as THREE from 'three';

export const setupCabinStructure = (scene: THREE.Scene) => {
  // Create voxel-style materials with flat shading
  const woodMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x8B4513,
    flatShading: true 
  });
  const floorMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xD2B48C,
    flatShading: true 
  });

  // Floor - made larger and thinner
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(20, 0.5, 20),
    floorMaterial
  );
  floor.position.y = -0.25;
  scene.add(floor);

  // Walls - made taller and thinner
  const wallGeometry = new THREE.BoxGeometry(0.5, 6, 20);
  const leftWall = new THREE.Mesh(wallGeometry, woodMaterial);
  leftWall.position.set(-10, 3, 0);
  scene.add(leftWall);

  const rightWall = new THREE.Mesh(wallGeometry, woodMaterial);
  rightWall.position.set(10, 3, 0);
  scene.add(rightWall);

  const backWallGeometry = new THREE.BoxGeometry(20, 6, 0.5);
  const backWall = new THREE.Mesh(backWallGeometry, woodMaterial);
  backWall.position.set(0, 3, -10);
  scene.add(backWall);
};