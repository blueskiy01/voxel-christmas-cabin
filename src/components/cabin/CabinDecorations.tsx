import * as THREE from 'three';
import { createFireEffect } from './effects/FireEffect';

export const setupDecorations = (scene: THREE.Scene) => {
  // Enhanced Christmas Tree with star
  const createTreeLayer = (y: number, scale: number) => {
    const geometry = new THREE.BoxGeometry(scale, 1, scale);
    const material = new THREE.MeshLambertMaterial({ 
      color: 0x228B22,
      flatShading: true 
    });
    const layer = new THREE.Mesh(geometry, material);
    layer.position.set(-5, y, -5);
    scene.add(layer);
    
    // Add ornaments to each layer
    const ornamentGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    
    for(let i = 0; i < 4; i++) {
      const ornamentMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() > 0.5 ? 0xFF0000 : 0xFFD700,
        flatShading: true
      });
      const ornament = new THREE.Mesh(ornamentGeometry, ornamentMaterial);
      const angle = (i / 4) * Math.PI * 2;
      ornament.position.set(
        -5 + Math.cos(angle) * (scale/2),
        y + 0.5,
        -5 + Math.sin(angle) * (scale/2)
      );
      scene.add(ornament);
    }
  };

  // Create tree layers
  for(let i = 0; i < 5; i++) {
    createTreeLayer(i + 1, 4 - (i * 0.5));
  }

  // Add glowing star on top
  const starGeometry = new THREE.OctahedronGeometry(0.5, 0);
  const starMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFD700,
    emissive: 0xFFD700,
    emissiveIntensity: 0.8,
    flatShading: true
  });
  const star = new THREE.Mesh(starGeometry, starMaterial);
  star.position.set(-5, 6.5, -5);
  star.rotation.y = Math.PI / 4;
  scene.add(star);

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

  // Create realistic fire effect
  const firePosition = new THREE.Vector3(5, 1.5, -14.2);
  const fire = createFireEffect(scene, firePosition);
  fire.userData.isFireplace = true;
  fire.userData.isLit = true;

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
        fireObject.visible = true;
        scene.userData.fireplaceLight.intensity = 1;
      } else {
        fireObject.visible = false;
        scene.userData.fireplaceLight.intensity = 0;
      }
    }
  });

  // Add snowfall
  const snowflakeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
  const snowflakeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const snowflakes: THREE.Mesh[] = [];

  for (let i = 0; i < 100; i++) {
    const snowflake = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial);
    snowflake.position.set(
      Math.random() * 40 - 20,
      Math.random() * 10 + 5,
      Math.random() * 40 - 20
    );
    snowflake.userData.velocity = Math.random() * 0.02 + 0.01;
    snowflakes.push(snowflake);
    scene.add(snowflake);
  }

  // Animation function for snowfall
  const animateSnow = () => {
    snowflakes.forEach(snowflake => {
      snowflake.position.y -= snowflake.userData.velocity;
      if (snowflake.position.y < 0) {
        snowflake.position.y = 15;
      }
    });
    requestAnimationFrame(animateSnow);
  };
  animateSnow();
};
