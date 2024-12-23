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

  // Floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(10, 1, 10),
    floorMaterial
  );
  floor.position.y = -0.5;
  scene.add(floor);

  // Walls
  const wallGeometry = new THREE.BoxGeometry(1, 4, 10);
  const leftWall = new THREE.Mesh(wallGeometry, woodMaterial);
  leftWall.position.set(-5, 2, 0);
  scene.add(leftWall);

  const rightWall = new THREE.Mesh(wallGeometry, woodMaterial);
  rightWall.position.set(5, 2, 0);
  scene.add(rightWall);

  const backWallGeometry = new THREE.BoxGeometry(10, 4, 1);
  const backWall = new THREE.Mesh(backWallGeometry, woodMaterial);
  backWall.position.set(0, 2, -5);
  scene.add(backWall);
};