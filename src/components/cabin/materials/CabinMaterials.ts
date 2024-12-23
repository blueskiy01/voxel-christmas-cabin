import * as THREE from 'three';

export const createLogMaterial = () => {
  return new THREE.MeshStandardMaterial({ 
    color: 0xA0522D,
    roughness: 0.9,
    metalness: 0.1,
    flatShading: true
  });
};

export const createFloorMaterial = () => {
  return new THREE.MeshStandardMaterial({
    color: 0xD2B48C,
    roughness: 0.8,
    metalness: 0.1
  });
};

export const createWindowFrameMaterial = () => {
  return new THREE.MeshStandardMaterial({
    color: 0xDEB887,
    roughness: 0.7,
    metalness: 0.2
  });
};

export const setupMaterialTextures = (logMaterial: THREE.Material, floorMaterial: THREE.Material) => {
  const textureLoader = new THREE.TextureLoader();
  
  textureLoader.load('/dark-parquet-512x512.png', (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    (logMaterial as THREE.MeshStandardMaterial).map = texture;
    logMaterial.needsUpdate = true;
  });

  textureLoader.load('/smooth-sand-128x128.png', (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16);
    (floorMaterial as THREE.MeshStandardMaterial).map = texture;
    floorMaterial.needsUpdate = true;
  });
};