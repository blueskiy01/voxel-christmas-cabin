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

  const wallTrimMaterial = new THREE.MeshStandardMaterial({
    color: 0x8E9196,
    roughness: 0.7,
    metalness: 0.2,
    flatShading: true
  });

  // Floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(30, 0.2, 30),
    floorMaterial
  );
  floor.position.y = -0.1;
  scene.add(floor);

  // Add baseboard trim
  const baseboardGeometry = new THREE.BoxGeometry(30, 0.3, 0.1);
  const leftBaseboard = new THREE.Mesh(baseboardGeometry, wallTrimMaterial);
  leftBaseboard.position.set(0, 0.1, -15);
  scene.add(leftBaseboard);

  const rightBaseboard = new THREE.Mesh(baseboardGeometry, wallTrimMaterial);
  rightBaseboard.position.set(0, 0.1, 15);
  scene.add(rightBaseboard);

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

  // Window frames
  const windowFrameGeometry = new THREE.BoxGeometry(2, 3, 0.3);
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0xFEF7CD,
    roughness: 0.5,
    metalness: 0.3,
    flatShading: true,
    transparent: true,
    opacity: 0.6
  });

  // Left wall windows
  const leftWindow1 = new THREE.Mesh(windowFrameGeometry, windowMaterial);
  leftWindow1.position.set(-14.9, 4, -5);
  scene.add(leftWindow1);

  const leftWindow2 = new THREE.Mesh(windowFrameGeometry, windowMaterial);
  leftWindow2.position.set(-14.9, 4, 5);
  scene.add(leftWindow2);

  // Window sills
  const sillGeometry = new THREE.BoxGeometry(0.4, 0.2, 2.2);
  const sillMaterial = new THREE.MeshStandardMaterial({
    color: 0x8E9196,
    roughness: 0.7,
    metalness: 0.2,
    flatShading: true
  });

  const leftSill1 = new THREE.Mesh(sillGeometry, sillMaterial);
  leftSill1.position.set(-14.8, 2.4, -5);
  scene.add(leftSill1);

  const leftSill2 = new THREE.Mesh(sillGeometry, sillMaterial);
  leftSill2.position.set(-14.8, 2.4, 5);
  scene.add(leftSill2);

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
    texture.repeat.set(16, 16); // Increased repeat due to smaller texture size
    floorMaterial.map = texture;
    floorMaterial.needsUpdate = true;
  });
};