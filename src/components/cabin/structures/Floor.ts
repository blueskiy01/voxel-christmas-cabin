import * as THREE from 'three';
import { createFloorMaterial } from '../materials/CabinMaterials';

export const createFloor = (scene: THREE.Scene) => {
  const floorMaterial = createFloorMaterial();
  
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(30, 0.2, 30),
    floorMaterial
  );
  floor.position.y = -0.1;
  scene.add(floor);

  return floorMaterial;
};