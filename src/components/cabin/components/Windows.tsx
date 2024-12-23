import * as THREE from 'three';

export const createWindows = (scene: THREE.Scene) => {
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0xFEF7CD,
    roughness: 0.5,
    metalness: 0.3,
    transparent: true,
    opacity: 0.6
  });

  const windowFrameGeometry = new THREE.BoxGeometry(2, 3, 0.3);
  const sillGeometry = new THREE.BoxGeometry(0.4, 0.2, 2.2);
  const sillMaterial = new THREE.MeshStandardMaterial({
    color: 0x8E9196,
    roughness: 0.7,
    metalness: 0.2
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

  return { leftWindow1, leftWindow2, leftSill1, leftSill2 };
};