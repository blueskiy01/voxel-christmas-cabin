import * as THREE from 'three';
import { createWindowFrameMaterial } from '../materials/CabinMaterials';

export const createWindowFrame = (scene: THREE.Scene, x: number, z: number) => {
  const windowFrameMaterial = createWindowFrameMaterial();
  
  // Top frame
  const topFrameGeometry = new THREE.BoxGeometry(0.3, 0.3, 6.2);
  const topFrame = new THREE.Mesh(topFrameGeometry, windowFrameMaterial);
  topFrame.position.set(x, 6, z);
  scene.add(topFrame);

  // Bottom frame
  const bottomFrame = new THREE.Mesh(topFrameGeometry, windowFrameMaterial);
  bottomFrame.position.set(x, 2, z);
  scene.add(bottomFrame);

  // Left frame
  const sideFrameGeometry = new THREE.BoxGeometry(0.3, 4, 0.3);
  const leftFrame = new THREE.Mesh(sideFrameGeometry, windowFrameMaterial);
  leftFrame.position.set(x, 4, z - 3);
  scene.add(leftFrame);

  // Right frame
  const rightFrame = new THREE.Mesh(sideFrameGeometry, windowFrameMaterial);
  rightFrame.position.set(x, 4, z + 3);
  scene.add(rightFrame);

  // Add artwork within the frame
  const artworkGeometry = new THREE.PlaneGeometry(5.8, 3.7);
  const textureLoader = new THREE.TextureLoader();
  const artworkMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7'),
    side: THREE.DoubleSide
  });
  
  const artwork = new THREE.Mesh(artworkGeometry, artworkMaterial);
  artwork.position.set(x + 0.2, 4, z);
  scene.add(artwork);
};