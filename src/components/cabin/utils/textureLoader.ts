import * as THREE from 'three';

export const loadTexture = (path: string): Promise<THREE.Texture> => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      path,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        resolve(texture);
      },
      undefined,
      reject
    );
  });
};

export const setupTexture = (texture: THREE.Texture, repeatX: number, repeatY: number) => {
  texture.repeat.set(repeatX, repeatY);
  return texture;
};