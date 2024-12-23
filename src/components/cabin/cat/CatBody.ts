import * as THREE from 'three';

export const createCatBody = () => {
  const mainBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.6, 1.6),
    new THREE.MeshPhongMaterial({ color: 0xFFA500 })
  );
  mainBody.position.y = 0.5;
  return mainBody;
};