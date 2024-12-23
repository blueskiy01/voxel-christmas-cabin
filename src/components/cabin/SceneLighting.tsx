import * as THREE from 'three';

export const setupLighting = (scene: THREE.Scene) => {
  // Main ambient light with increased intensity
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  // Main directional light (sun) with increased intensity
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
  directionalLight.position.set(5, 10, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  // Fill light for shadows with increased intensity
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);

  // Warm fireplace light with increased intensity
  const fireplaceLight = new THREE.PointLight(0xff6b4a, 3, 10);
  fireplaceLight.position.set(5, 2, -14);
  scene.add(fireplaceLight);

  // Window lights with increased intensity
  const windowLight1 = new THREE.PointLight(0x4682B4, 1.5, 5);
  windowLight1.position.set(-14, 4, -5);
  scene.add(windowLight1);

  const windowLight2 = new THREE.PointLight(0x4682B4, 1.5, 5);
  windowLight2.position.set(-14, 4, 5);
  scene.add(windowLight2);

  return { fireplaceLight };
};