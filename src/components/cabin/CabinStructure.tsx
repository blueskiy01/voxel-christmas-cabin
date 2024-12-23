import * as THREE from 'three';

export const setupCabinStructure = (scene: THREE.Scene) => {
  // Create log wall material with snow coverage effect
  const logMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xA0522D,
    roughness: 0.9,
    metalness: 0.1,
    flatShading: true
  });

  // Create snowy floor material
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xF8F8FF,
    roughness: 0.8,
    metalness: 0.1,
    flatShading: true
  });

  // Floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(30, 0.2, 30),
    floorMaterial
  );
  floor.position.y = -0.1;
  scene.add(floor);

  // Walls with log pattern
  const wallGeometry = new THREE.BoxGeometry(0.2, 8, 30);
  const leftWall = new THREE.Mesh(wallGeometry, logMaterial);
  leftWall.position.set(-15, 4, 0);
  scene.add(leftWall);

  const rightWall = new THREE.Mesh(wallGeometry, logMaterial);
  rightWall.position.set(15, 4, 0);
  scene.add(rightWall);

  const backWallGeometry = new THREE.BoxGeometry(30, 8, 0.2);
  const backWall = new THREE.Mesh(backWallGeometry, logMaterial);
  backWall.position.set(0, 4, -15);
  scene.add(backWall);

  // Load textures
  const textureLoader = new THREE.TextureLoader();
  
  // Load dark parquet texture for walls
  textureLoader.load('/dark-parquet-512x512.png', (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    logMaterial.map = texture;
    logMaterial.needsUpdate = true;
  });

  // Load smooth sand texture for the floor
  textureLoader.load('/smooth-sand-128x128.png', (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16);
    floorMaterial.map = texture;
    floorMaterial.needsUpdate = true;
  });
};