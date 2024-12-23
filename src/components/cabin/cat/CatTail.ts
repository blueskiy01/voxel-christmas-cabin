import * as THREE from 'three';

export const createCatTail = () => {
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.5, -0.8),
    new THREE.Vector3(0, 0.7, -1.0),
    new THREE.Vector3(0, 0.9, -0.8)
  ]);
  
  return new THREE.Mesh(
    new THREE.TubeGeometry(tailCurve, 8, 0.1, 8, false),
    new THREE.MeshPhongMaterial({ color: 0xFFA500 })
  );
};

export const animateTail = (tail: THREE.Mesh) => {
  tail.rotation.z = Math.sin(Date.now() * 0.008) * 0.2;
};