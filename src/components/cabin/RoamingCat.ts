import * as THREE from 'three';

export const createRoamingCat = (scene: THREE.Scene) => {
  // Create cat body
  const catGeometry = new THREE.BoxGeometry(1, 1, 2);
  const catMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
  const cat = new THREE.Mesh(catGeometry, catMaterial);
  cat.position.set(0, 0.5, 0);
  scene.add(cat);

  // Create food bowl
  const bowlGeometry = new THREE.CylinderGeometry(0.5, 0.3, 0.3, 32);
  const bowlMaterial = new THREE.MeshPhongMaterial({ color: 0x4169E1 });
  const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
  bowl.position.set(-5, 0.15, -5);
  scene.add(bowl);

  // Game state
  let foodLevel = 0;
  let isHungry = true;
  
  // Update food level display
  const updateFoodDisplay = () => {
    const display = document.getElementById('foodLevel');
    if (display) {
      display.textContent = foodLevel.toString();
    }
  };

  // Click handler for feeding the cat
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, scene.userData.camera);
    const intersects = raycaster.intersectObject(cat);

    if (intersects.length > 0 && isHungry) {
      foodLevel = Math.min(100, foodLevel + 10);
      updateFoodDisplay();
      
      // Make cat move to food bowl
      const targetPosition = new THREE.Vector3(-5, 0.5, -5);
      const duration = 1000; // 1 second
      const startPosition = cat.position.clone();
      const startTime = Date.now();
      
      function animateCat() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        
        if (elapsed < duration) {
          const progress = elapsed / duration;
          cat.position.lerpVectors(startPosition, targetPosition, progress);
          requestAnimationFrame(animateCat);
        } else {
          cat.position.copy(targetPosition);
          // Start decreasing food level after eating
          setTimeout(() => {
            const interval = setInterval(() => {
              if (foodLevel > 0) {
                foodLevel = Math.max(0, foodLevel - 5);
                updateFoodDisplay();
              } else {
                isHungry = true;
                clearInterval(interval);
              }
            }, 2000);
          }, 1000);
        }
      }
      
      animateCat();
      isHungry = false;
    }
  });

  // Initial food level display
  updateFoodDisplay();

  return cat;
};