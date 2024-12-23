import * as THREE from 'three';

export const createAnimatedPigeon = (scene: THREE.Scene) => {
  // Create a sprite material using the pigeon sprite sheet
  const textureLoader = new THREE.TextureLoader();
  const pigeonTexture = textureLoader.load('/lovable-uploads/bd2273ec-bc75-4a56-9b47-4bfc6977995f.png');
  
  // Set texture parameters for pixel art
  pigeonTexture.magFilter = THREE.NearestFilter;
  pigeonTexture.minFilter = THREE.NearestFilter;
  
  const spriteMaterial = new THREE.SpriteMaterial({ 
    map: pigeonTexture,
    transparent: true
  });
  
  const pigeon = new THREE.Sprite(spriteMaterial);
  
  // Scale the pigeon appropriately
  pigeon.scale.set(1, 1, 1);
  
  // Position the pigeon inside the cabin
  pigeon.position.set(-2, 3, -2);
  
  scene.add(pigeon);
  
  // Animation parameters
  let frame = 0;
  const totalFrames = 4; // Number of frames in the sprite sheet
  const frameWidth = 1 / totalFrames;
  
  // Store the pigeon in scene's userData for animation
  scene.userData.pigeon = {
    sprite: pigeon,
    animate: () => {
      // Update texture offset to create animation
      frame = (frame + 1) % totalFrames;
      spriteMaterial.map.offset.x = frame * frameWidth;
      
      // Add some floating movement
      pigeon.position.y = 3 + Math.sin(Date.now() * 0.001) * 0.1;
    }
  };
  
  // Add animation to the main render loop
  const originalAnimate = scene.userData.animate || (() => {});
  scene.userData.animate = () => {
    originalAnimate();
    scene.userData.pigeon.animate();
  };
};