import * as THREE from 'three';

export const setupCabinStructure = (scene: THREE.Scene) => {
  // Materials for walls and floor
  const logMaterial = new THREE.MeshStandardMaterial({
    color: 0xA0522D, // Log color
    roughness: 0.9,
    metalness: 0.1,
    flatShading: true
  });

  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xF8F8FF, // Snowy floor color
    roughness: 0.8,
    metalness: 0.1,
    flatShading: true
  });

  // Floor
  const floor = new THREE.Mesh(new THREE.BoxGeometry(30, 0.2, 30), floorMaterial);
  floor.position.y = -0.1;
  scene.add(floor);

  // Walls with "cutouts" for windows
  const wallGeometry = new THREE.BufferGeometry();

  // Function to create walls with window cutouts
  const createWallWithWindows = (
    width: number,
    height: number,
    thickness: number,
    windowPositions: { x: number; y: number; width: number; height: number }[]
  ) => {
    const wallShape = new THREE.Shape();
    wallShape.moveTo(-width / 2, -height / 2);
    wallShape.lineTo(-width / 2, height / 2);
    wallShape.lineTo(width / 2, height / 2);
    wallShape.lineTo(width / 2, -height / 2);
    wallShape.lineTo(-width / 2, -height / 2);

    // Subtract windows from the wall shape
    windowPositions.forEach((window) => {
      const windowShape = new THREE.Shape();
      windowShape.moveTo(window.x - window.width / 2, window.y - window.height / 2);
      windowShape.lineTo(window.x - window.width / 2, window.y + window.height / 2);
      windowShape.lineTo(window.x + window.width / 2, window.y + window.height / 2);
      windowShape.lineTo(window.x + window.width / 2, window.y - window.height / 2);
      windowShape.lineTo(window.x - window.width / 2, window.y - window.height / 2);
      wallShape.holes.push(windowShape);
    });

    const extrudeSettings = { depth: thickness, bevelEnabled: false };
    return new THREE.ExtrudeGeometry(wallShape, extrudeSettings);
  };

  // Left wall with window
  const leftWallGeometry = createWallWithWindows(30, 8, 0.2, [
    { x: 0, y: 2, width: 10, height: 5 }, // Centered window
  ]);
  const leftWall = new THREE.Mesh(leftWallGeometry, logMaterial);
  leftWall.position.set(-15, 4, 0);
  scene.add(leftWall);

  // Right wall with window
  const rightWallGeometry = createWallWithWindows(30, 8, 0.2, [
    { x: 0, y: 2, width: 10, height: 5 }, // Centered window
  ]);
  const rightWall = new THREE.Mesh(rightWallGeometry, logMaterial);
  rightWall.position.set(15, 4, 0);
  scene.add(rightWall);

  // Back wall with two windows
  const backWallGeometry = createWallWithWindows(30, 8, 0.2, [
    { x: -8, y: 2, width: 8, height: 5 }, // Left window
    { x: 8, y: 2, width: 8, height: 5 }, // Right window
  ]);
  const backWall = new THREE.Mesh(backWallGeometry, logMaterial);
  backWall.position.set(0, 4, -15);
  scene.add(backWall);

  // Add window glass
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0x87CEEB, // Sky blue for glass
    opacity: 0.5,
    transparent: true,
  });

  const addWindowGlass = (x: number, y: number, z: number, width: number, height: number, thickness: number) => {
    const glassGeometry = new THREE.BoxGeometry(width, height, thickness);
    const glass = new THREE.Mesh(glassGeometry, windowMaterial);
    glass.position.set(x, y, z);
    scene.add(glass);
  };

  // Left wall glass
  addWindowGlass(-15, 4, 0, 10, 5, 0.1);

  // Right wall glass
  addWindowGlass(15, 4, 0, 10, 5, 0.1);

  // Back wall glass
  addWindowGlass(-8, 4, -15, 8, 5, 0.1);
  addWindowGlass(8, 4, -15, 8, 5, 0.1);

  // Floor texture
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('/smooth-sand-128x128.png', (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16);
    floorMaterial.map = texture;
    floorMaterial.needsUpdate = true;
  });

  // Wall texture
  textureLoader.load('/dark-parquet-512x512.png', (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    logMaterial.map = texture;
    logMaterial.needsUpdate = true;
  });
};
