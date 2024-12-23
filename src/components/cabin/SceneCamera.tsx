import * as THREE from 'three';

export const setupCamera = () => {
  const aspect = window.innerWidth / window.innerHeight;
  const frustumSize = 30;
  const camera = new THREE.OrthographicCamera(
    frustumSize * aspect / -2,
    frustumSize * aspect / 2,
    frustumSize / 2,
    frustumSize / -2,
    0.1,
    1000
  );
  camera.position.set(20, 20, 20);
  camera.lookAt(0, 0, 0);
  
  return camera;
};