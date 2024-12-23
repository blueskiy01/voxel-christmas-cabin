import * as THREE from 'three';
import { loadTexture, setupTexture } from '../utils/textureLoader';

export const createFloor = async (scene: THREE.Scene, texturePath: string) => {
  const texture = await loadTexture(texturePath);
  setupTexture(texture, 16, 16);

  const floorMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.6,
    metalness: 0.1,
  });

  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(30, 0.2, 30),
    floorMaterial
  );
  floor.position.y = -0.1;
  floor.receiveShadow = true;
  scene.add(floor);

  return floor;
};