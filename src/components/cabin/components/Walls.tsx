import * as THREE from 'three';
import { loadTexture, setupTexture } from '../utils/textureLoader';

export const createWalls = async (scene: THREE.Scene, texturePath: string) => {
  const texture = await loadTexture(texturePath);
  setupTexture(texture, 4, 4);

  const wallMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.5,
    metalness: 0.1,
  });

  // Left wall
  const wallGeometry = new THREE.BoxGeometry(0.2, 8, 30);
  const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
  leftWall.position.set(-15, 4, 0);
  leftWall.castShadow = true;
  leftWall.receiveShadow = true;
  scene.add(leftWall);

  // Right wall
  const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
  rightWall.position.set(15, 4, 0);
  rightWall.castShadow = true;
  rightWall.receiveShadow = true;
  scene.add(rightWall);

  // Back wall
  const backWallGeometry = new THREE.BoxGeometry(30, 8, 0.2);
  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
  backWall.position.set(0, 4, -15);
  backWall.castShadow = true;
  backWall.receiveShadow = true;
  scene.add(backWall);

  return { leftWall, rightWall, backWall };
};