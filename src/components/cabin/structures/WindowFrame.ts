import * as THREE from 'three';
import { createWindowFrameMaterial } from '../materials/CabinMaterials';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import RadioPlayer from '../RadioPlayer';
import React from 'react';
import { createRoot } from 'react-dom/client';

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

  // Add Radio Player
  const radioPlayerDiv = document.createElement('div');
  const root = createRoot(radioPlayerDiv);
  root.render(React.createElement(RadioPlayer));
  
  const radioPlayerLabel = new CSS2DObject(radioPlayerDiv);
  radioPlayerLabel.position.set(x, 4, z);
  scene.add(radioPlayerLabel);
};