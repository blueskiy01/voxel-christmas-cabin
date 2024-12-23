import * as THREE from 'three';

export const setupWindows = (scene: THREE.Scene) => {
  // Create window frame material
  const windowFrameGeometry = new THREE.BoxGeometry(3, 4, 0.3);
  const windowFrameMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a3728,
    roughness: 0.7,
    metalness: 0.2
  });

  // Create transparent glass material
  const windowGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2,
    transmission: 0.9,
    thickness: 0.05,
    roughness: 0
  });

  // Left window
  const leftWindow = new THREE.Mesh(windowFrameGeometry, windowFrameMaterial);
  leftWindow.position.set(-14.8, 4, -5);
  scene.add(leftWindow);

  const leftGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 3.5),
    windowGlassMaterial
  );
  leftGlass.position.set(-14.6, 4, -5);
  scene.add(leftGlass);

  // Right window
  const rightWindow = leftWindow.clone();
  rightWindow.position.set(-14.8, 4, 5);
  scene.add(rightWindow);

  const rightGlass = leftGlass.clone();
  rightGlass.position.set(-14.6, 4, 5);
  scene.add(rightGlass);

  // Back window
  const backWindow = leftWindow.clone();
  backWindow.rotation.y = Math.PI / 2;
  backWindow.position.set(5, 4, -14.8);
  scene.add(backWindow);

  const backGlass = leftGlass.clone();
  backGlass.rotation.y = Math.PI / 2;
  backGlass.position.set(5, 4, -14.6);
  scene.add(backGlass);
};