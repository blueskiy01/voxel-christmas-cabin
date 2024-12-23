import * as THREE from 'three';

interface CabinStructureProps {
  wallTexturePath?: string;
  floorTexturePath?: string;
}

export const setupCabinStructure = (scene: THREE.Scene, { wallTexturePath = '/dark-parquet-512x512.png', floorTexturePath = '/smooth-sand-128x128.png' }: CabinStructureProps = {}) => {
  // Create log wall material with improved lighting properties
  const logMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.1,
  });

  // Create floor material with improved lighting properties
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    roughness: 0.6,
    metalness: 0.1,
  });

  const wallTrimMaterial = new THREE.MeshStandardMaterial({
    color: 0x8E9196,
    roughness: 0.5,
    metalness: 0.2,
  });

  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(30, 0.2, 30),
    floorMaterial
  );
  floor.position.y = -0.1;
  floor.receiveShadow = true;
  scene.add(floor);

  // Add baseboard trim
  const baseboardGeometry = new THREE.BoxGeometry(30, 0.3, 0.1);
  const leftBaseboard = new THREE.Mesh(baseboardGeometry, wallTrimMaterial);
  leftBaseboard.position.set(0, 0.1, -15);
  leftBaseboard.castShadow = true;
  leftBaseboard.receiveShadow = true;
  scene.add(leftBaseboard);

  const rightBaseboard = new THREE.Mesh(baseboardGeometry, wallTrimMaterial);
  rightBaseboard.position.set(0, 0.1, 15);
  rightBaseboard.castShadow = true;
  rightBaseboard.receiveShadow = true;
  scene.add(rightBaseboard);

  // Walls with log pattern
  const wallGeometry = new THREE.BoxGeometry(0.2, 8, 30);
  const leftWall = new THREE.Mesh(wallGeometry, logMaterial);
  leftWall.position.set(-15, 4, 0);
  leftWall.castShadow = true;
  leftWall.receiveShadow = true;
  scene.add(leftWall);

  const rightWall = new THREE.Mesh(wallGeometry, logMaterial);
  rightWall.position.set(15, 4, 0);
  rightWall.castShadow = true;
  rightWall.receiveShadow = true;
  scene.add(rightWall);

  const backWallGeometry = new THREE.BoxGeometry(30, 8, 0.2);
  const backWall = new THREE.Mesh(backWallGeometry, logMaterial);
  backWall.position.set(0, 4, -15);
  backWall.castShadow = true;
  backWall.receiveShadow = true;
  scene.add(backWall);

  // Window frames
  const windowFrameGeometry = new THREE.BoxGeometry(2, 3, 0.3);
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0xFEF7CD,
    roughness: 0.5,
    metalness: 0.3,
    transparent: true,
    opacity: 0.6
  });

  // Left wall windows
  const leftWindow1 = new THREE.Mesh(windowFrameGeometry, windowMaterial);
  leftWindow1.position.set(-14.9, 4, -5);
  leftWindow1.castShadow = true;
  scene.add(leftWindow1);

  const leftWindow2 = new THREE.Mesh(windowFrameGeometry, windowMaterial);
  leftWindow2.position.set(-14.9, 4, 5);
  leftWindow2.castShadow = true;
  scene.add(leftWindow2);

  // Window sills
  const sillGeometry = new THREE.BoxGeometry(0.4, 0.2, 2.2);
  const sillMaterial = new THREE.MeshStandardMaterial({
    color: 0x8E9196,
    roughness: 0.7,
    metalness: 0.2
  });

  const leftSill1 = new THREE.Mesh(sillGeometry, sillMaterial);
  leftSill1.position.set(-14.8, 2.4, -5);
  leftSill1.castShadow = true;
  leftSill1.receiveShadow = true;
  scene.add(leftSill1);

  const leftSill2 = new THREE.Mesh(sillGeometry, sillMaterial);
  leftSill2.position.set(-14.8, 2.4, 5);
  leftSill2.castShadow = true;
  leftSill2.receiveShadow = true;
  scene.add(leftSill2);

  // Load textures with improved settings
  const textureLoader = new THREE.TextureLoader();
  
  // Load texture for walls
  textureLoader.load(wallTexturePath, (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    texture.encoding = THREE.SRGBColorSpace;
    logMaterial.map = texture;
    logMaterial.needsUpdate = true;
  });

  // Load texture for the floor
  textureLoader.load(floorTexturePath, (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16);
    texture.encoding = THREE.SRGBColorSpace;
    floorMaterial.map = texture;
    floorMaterial.needsUpdate = true;
  });
};
