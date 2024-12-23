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

  // Create transparent glass material for windows
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x88ccff,
    transparent: true,
    opacity: 0.3,
    roughness: 0,
    metalness: 0.2,
    transmission: 0.9,
    thickness: 0.5
  });

  // Floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(30, 0.2, 30),
    floorMaterial
  );
  floor.position.y = -0.1;
  scene.add(floor);

  // Left wall with window
  const leftWallGeometry = new THREE.BoxGeometry(0.2, 8, 30);
  const leftWall = new THREE.Mesh(leftWallGeometry, logMaterial);
  leftWall.position.set(-15, 4, 0);
  scene.add(leftWall);

  // Left wall window
  const windowGeometry = new THREE.BoxGeometry(0.1, 4, 6);
  const leftWindow = new THREE.Mesh(windowGeometry, glassMaterial);
  leftWindow.position.set(-14.9, 4, -5);
  scene.add(leftWindow);

  const leftWindow2 = new THREE.Mesh(windowGeometry, glassMaterial);
  leftWindow2.position.set(-14.9, 4, 5);
  scene.add(leftWindow2);

  // Right wall with window
  const rightWall = new THREE.Mesh(leftWallGeometry, logMaterial);
  rightWall.position.set(15, 4, 0);
  scene.add(rightWall);

  // Right wall window
  const rightWindow = new THREE.Mesh(windowGeometry, glassMaterial);
  rightWindow.position.set(14.9, 4, -5);
  scene.add(rightWindow);

  const rightWindow2 = new THREE.Mesh(windowGeometry, glassMaterial);
  rightWindow2.position.set(14.9, 4, 5);
  scene.add(rightWindow2);

  // Back wall with window
  const backWallGeometry = new THREE.BoxGeometry(30, 8, 0.2);
  const backWall = new THREE.Mesh(backWallGeometry, logMaterial);
  backWall.position.set(0, 4, -15);
  scene.add(backWall);

  // Back wall window
  const backWindowGeometry = new THREE.BoxGeometry(6, 4, 0.1);
  const backWindow = new THREE.Mesh(backWindowGeometry, glassMaterial);
  backWindow.position.set(-5, 4, -14.9);
  scene.add(backWindow);

  const backWindow2 = new THREE.Mesh(backWindowGeometry, glassMaterial);
  backWindow2.position.set(5, 4, -14.9);
  scene.add(backWindow2);

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