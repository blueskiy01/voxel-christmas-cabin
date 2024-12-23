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

  // Left wall with window cutouts
  const leftWallShape = new THREE.Shape();
  leftWallShape.moveTo(-15, 0);
  leftWallShape.lineTo(15, 0);
  leftWallShape.lineTo(15, 8);
  leftWallShape.lineTo(-15, 8);
  leftWallShape.lineTo(-15, 0);

  // Create holes for windows
  const leftHole1 = new THREE.Path();
  leftHole1.moveTo(-8, 2);
  leftHole1.lineTo(-2, 2);
  leftHole1.lineTo(-2, 6);
  leftHole1.lineTo(-8, 6);
  leftWallShape.holes.push(leftHole1);

  const leftHole2 = new THREE.Path();
  leftHole2.moveTo(2, 2);
  leftHole2.lineTo(8, 2);
  leftHole2.lineTo(8, 6);
  leftHole2.lineTo(2, 6);
  leftWallShape.holes.push(leftHole2);

  const leftWallGeometry = new THREE.ShapeGeometry(leftWallShape);
  const leftWall = new THREE.Mesh(leftWallGeometry, logMaterial);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-15, 0, 0);
  scene.add(leftWall);

  // Right wall with window cutouts
  const rightWall = leftWall.clone();
  rightWall.position.set(15, 0, 0);
  rightWall.rotation.y = -Math.PI / 2;
  scene.add(rightWall);

  // Back wall with window cutouts (excluding the window behind fireplace)
  const backWallShape = new THREE.Shape();
  backWallShape.moveTo(-15, 0);
  backWallShape.lineTo(15, 0);
  backWallShape.lineTo(15, 8);
  backWallShape.lineTo(-15, 8);
  backWallShape.lineTo(-15, 0);

  // Create hole for left window only
  const backHole = new THREE.Path();
  backHole.moveTo(-8, 2);
  backHole.lineTo(-2, 2);
  backHole.lineTo(-2, 6);
  backHole.lineTo(-8, 6);
  backWallShape.holes.push(backHole);

  const backWallGeometry = new THREE.ShapeGeometry(backWallShape);
  const backWall = new THREE.Mesh(backWallGeometry, logMaterial);
  backWall.position.set(0, 0, -15);
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