import * as THREE from 'three';
import { createFloor } from './structures/Floor';
import { createWalls } from './structures/Walls';
import { createWindowFrame } from './structures/WindowFrame';
import { setupMaterialTextures } from './materials/CabinMaterials';

export const setupCabinStructure = (scene: THREE.Scene) => {
  // Create clipping planes for snow
  const leftPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 14.9);
  const rightPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 14.9);
  const backPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 14.9);
  const topPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), -8);

  // Add clipping planes to the scene for snow
  scene.userData.snowClippingPlanes = [leftPlane, rightPlane, backPlane, topPlane];

  // Create basic structure
  const floorMaterial = createFloor(scene);
  const logMaterial = createWalls(scene);
  createWindowFrame(scene, -14.9, -5);

  // Setup textures
  setupMaterialTextures(logMaterial, floorMaterial);
};