import * as THREE from 'three';

export const setupCabinStructure = (scene: THREE.Scene) => {
  // Create log wall material with snow coverage effect
  const logMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xA0522D,
    roughness: 0.9,
    metalness: 0.1,
    flatShading: true
  });

  // Create floor material
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xD2B48C,
    roughness: 0.8,
    metalness: 0.1
  });

  // Create window frame material
  const windowFrameMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a3728,
    roughness: 0.7,
    metalness: 0.2
  });

  // Create window glass material with background color and transparency
  const windowGlassMaterial = new THREE.MeshStandardMaterial({
    color: 0x0EA5E9, // Brighter sky blue color
    transparent: true,
    opacity: 0.1,
    metalness: 0.9,
    roughness: 0.1
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
  leftWallGeometry.computeBoundingBox();
  const { min, max } = leftWallGeometry.boundingBox!;
  const range = max.clone().sub(min);
  const uvs = leftWallGeometry.attributes.uv;
  for (let i = 0; i < uvs.count; i++) {
    const u = (leftWallGeometry.attributes.position.getY(i) - min.y) / range.y;
    const v = (leftWallGeometry.attributes.position.getX(i) - min.x) / range.x;
    uvs.setXY(i, u, v); // Removed the *2 multiplier to match original zoom level
  }

  const leftWall = new THREE.Mesh(leftWallGeometry, logMaterial);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-15, 0, 0);
  scene.add(leftWall);

  // Add window frames and glass for left wall
  const addWindow = (x: number, z: number) => {
    // Frame
    const frameGeometry = new THREE.BoxGeometry(0.2, 4.2, 6.2);
    const frame = new THREE.Mesh(frameGeometry, windowFrameMaterial);
    frame.position.set(x, 4, z);
    scene.add(frame);

    // Glass - Create a clipping plane to prevent snow from appearing inside
    const glassGeometry = new THREE.PlaneGeometry(6, 4);
    const glass = new THREE.Mesh(glassGeometry, windowGlassMaterial);
    glass.position.set(x + (x < 0 ? 0.2 : -0.2), 4, z);
    glass.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2;
    
    // Add the glass to a separate group for snow clipping
    const glassGroup = new THREE.Group();
    glassGroup.add(glass);
    glassGroup.userData.isWindow = true; // Mark as window for snow effect
    scene.add(glassGroup);
  };

  // Add windows for left wall
  addWindow(-14.9, -5);
  addWindow(-14.9, 5);

  // Right wall with window cutouts
  const rightWall = leftWall.clone();
  rightWall.position.set(15, 0, 0);
  rightWall.rotation.y = -Math.PI / 2;
  scene.add(rightWall);

  // Add windows for right wall
  addWindow(14.9, -5);
  addWindow(14.9, 5);

  // Back wall with window cutouts
  const backWallShape = new THREE.Shape();
  backWallShape.moveTo(-15, 0);
  backWallShape.lineTo(15, 0);
  backWallShape.lineTo(15, 8);
  backWallShape.lineTo(-15, 8);
  backWallShape.lineTo(-15, 0);

  // Create hole for back window
  const backHole = new THREE.Path();
  backHole.moveTo(-8, 2);
  backHole.lineTo(-2, 2);
  backHole.lineTo(-2, 6);
  backHole.lineTo(-8, 6);
  backWallShape.holes.push(backHole);

  const backWallGeometry = new THREE.ShapeGeometry(backWallShape);
  backWallGeometry.computeBoundingBox();
  const backMin = backWallGeometry.boundingBox!.min;
  const backMax = backWallGeometry.boundingBox!.max;
  const backRange = backMax.clone().sub(backMin);
  const backUVs = backWallGeometry.attributes.uv;
  for (let i = 0; i < backUVs.count; i++) {
    const u = (backWallGeometry.attributes.position.getY(i) - backMin.y) / backRange.y;
    const v = (backWallGeometry.attributes.position.getX(i) - backMin.x) / backRange.x;
    backUVs.setXY(i, u, v); // Removed the *2 multiplier to match original zoom level
  }

  const backWall = new THREE.Mesh(backWallGeometry, logMaterial);
  backWall.position.set(0, 0, -15);
  scene.add(backWall);

  // Add back window frame and glass
  const backFrameGeometry = new THREE.BoxGeometry(6.2, 4.2, 0.2);
  const backFrame = new THREE.Mesh(backFrameGeometry, windowFrameMaterial);
  backFrame.position.set(-5, 4, -14.9);
  scene.add(backFrame);

  // Add back window glass with clipping
  const backGlassGeometry = new THREE.PlaneGeometry(6, 4);
  const backGlass = new THREE.Mesh(backGlassGeometry, windowGlassMaterial);
  backGlass.position.set(-5, 4, -14.8);
  
  // Add the back glass to a separate group for snow clipping
  const backGlassGroup = new THREE.Group();
  backGlassGroup.add(backGlass);
  backGlassGroup.userData.isWindow = true; // Mark as window for snow effect
  scene.add(backGlassGroup);

  // Load textures
  const textureLoader = new THREE.TextureLoader();
  
  // Load dark parquet texture for walls
  textureLoader.load('/dark-parquet-512x512.png', (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    logMaterial.map = texture;
    logMaterial.needsUpdate = true;
  });

  // Load smooth sand texture for the floor with original tiling
  textureLoader.load('/smooth-sand-128x128.png', (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16); // Reverted back to original tiling
    floorMaterial.map = texture;
    floorMaterial.needsUpdate = true;
  });
};