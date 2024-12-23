import * as THREE from 'three';

export const setupFireplace = (scene: THREE.Scene) => {
  // Interactive Fireplace
  const fireplaceGeometry = new THREE.BoxGeometry(4, 4, 1);
  const fireplaceMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x8B4513,
    flatShading: true 
  });
  const fireplace = new THREE.Mesh(fireplaceGeometry, fireplaceMaterial);
  fireplace.position.set(5, 2, -14.5);
  scene.add(fireplace);

  // Fireplace mantel
  const mantelGeometry = new THREE.BoxGeometry(5, 0.3, 1.2);
  const mantel = new THREE.Mesh(mantelGeometry, fireplaceMaterial);
  mantel.position.set(5, 4, -14.4);
  scene.add(mantel);

  // Interactive fire
  const fireGeometry = new THREE.BoxGeometry(3, 2, 0.5);
  const fireMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xFF4500,
    transparent: true,
    opacity: 0.8
  });
  const fire = new THREE.Mesh(fireGeometry, fireMaterial);
  fire.position.set(5, 1.5, -14.2);
  fire.userData.isFireplace = true;
  fire.userData.isLit = true;
  scene.add(fire);

  // Add click handler for fireplace
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, scene.userData.camera);
    const intersects = raycaster.intersectObjects([fire]);

    if (intersects.length > 0) {
      const fireObject = intersects[0].object;
      fireObject.userData.isLit = !fireObject.userData.isLit;
      
      if (fireObject.userData.isLit) {
        fireMaterial.color.setHex(0xFF4500);
        fireMaterial.opacity = 0.8;
        scene.userData.fireplaceLight.intensity = 1;
      } else {
        fireMaterial.color.setHex(0x444444);
        fireMaterial.opacity = 0.4;
        scene.userData.fireplaceLight.intensity = 0;
      }
    }
  });
};