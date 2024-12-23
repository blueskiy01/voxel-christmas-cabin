import * as THREE from 'three';

export const setupCabinStructure = (scene: THREE.Scene) => {
  // Create brick wall material with a warmer, cozy color
  const brickMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xA0522D, // Warm brick color
    flatShading: true,
    // Add subtle variations for brick texture effect
    vertexColors: true 
  });

  // Create wooden floor material with a rich, warm tone
  const floorMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xDEB887, // Warm wooden color
    flatShading: true,
    // Add wood grain effect through subtle variations
    vertexColors: true
  });

  const wallTrimMaterial = new THREE.MeshLambertMaterial({
    color: 0x8B4513, // Darker wood trim
    flatShading: true
  });

  // Floor - larger and thinner
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

  // Walls - thinner with brick material
  const wallGeometry = new THREE.BoxGeometry(0.2, 8, 30);
  const leftWall = new THREE.Mesh(wallGeometry, brickMaterial);
  leftWall.position.set(-15, 4, 0);
  scene.add(leftWall);

  const rightWall = new THREE.Mesh(wallGeometry, brickMaterial);
  rightWall.position.set(15, 4, 0);
  scene.add(rightWall);

  const backWallGeometry = new THREE.BoxGeometry(30, 8, 0.2);
  const backWall = new THREE.Mesh(backWallGeometry, brickMaterial);
  backWall.position.set(0, 4, -15);
  scene.add(backWall);

  // Add window frames
  const windowFrameGeometry = new THREE.BoxGeometry(2, 3, 0.3);
  const windowMaterial = new THREE.MeshLambertMaterial({
    color: 0x4682B4,
    flatShading: true
  });

  // Left wall windows
  const leftWindow1 = new THREE.Mesh(windowFrameGeometry, windowMaterial);
  leftWindow1.position.set(-14.9, 4, -5);
  scene.add(leftWindow1);

  const leftWindow2 = new THREE.Mesh(windowFrameGeometry, windowMaterial);
  leftWindow2.position.set(-14.9, 4, 5);
  scene.add(leftWindow2);

  // Add window sills
  const sillGeometry = new THREE.BoxGeometry(0.4, 0.2, 2.2);
  const sillMaterial = new THREE.MeshLambertMaterial({
    color: 0x8B4513,
    flatShading: true
  });

  const leftSill1 = new THREE.Mesh(sillGeometry, sillMaterial);
  leftSill1.position.set(-14.8, 2.4, -5);
  scene.add(leftSill1);

  const leftSill2 = new THREE.Mesh(sillGeometry, sillMaterial);
  leftSill2.position.set(-14.8, 2.4, 5);
  scene.add(leftSill2);
};