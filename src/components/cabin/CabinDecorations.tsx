import * as THREE from 'three';

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

  // Enhanced Windows
  const windowFrameGeometry = new THREE.BoxGeometry(3, 4, 0.3);
  const windowFrameMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a3728,
    roughness: 0.7,
    metalness: 0.2
  });

  // Window glass material with blue tint and transparency
  const windowGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x4682B4,
    transparent: true,
    opacity: 0.3,
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.5
  });

  // Left window
  const leftWindow = new THREE.Mesh(windowFrameGeometry, windowFrameMaterial);
  leftWindow.position.set(-14.8, 4, -5);
  scene.add(leftWindow);

  const leftGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 3.5),
    windowGlassMaterial
  );
  leftGlass.position.set(-14.6, 4, -5);
  scene.add(leftGlass);

  // Right window
  const rightWindow = leftWindow.clone();
  rightWindow.position.set(-14.8, 4, 5);
  scene.add(rightWindow);

  const rightGlass = leftGlass.clone();
  rightGlass.position.set(-14.6, 4, 5);
  scene.add(rightGlass);

  // Back window
  const backWindow = leftWindow.clone();
  backWindow.rotation.y = Math.PI / 2;
  backWindow.position.set(5, 4, -14.8);
  scene.add(backWindow);

  const backGlass = leftGlass.clone();
  backGlass.rotation.y = Math.PI / 2;
  backGlass.position.set(5, 4, -14.6);
  scene.add(backGlass);

  // Add snowfall outside the room
  const snowflakeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
  const snowflakeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const snowflakes: THREE.Mesh[] = [];

  // Create snowflakes only outside the room
  for (let i = 0; i < 100; i++) {
    const snowflake = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial);
    
    // Randomly position snowflakes outside the room
    let x, y, z;
    
    // Randomly choose which side of the room to place the snowflake
    const side = Math.floor(Math.random() * 3);
    
    switch(side) {
      case 0: // Left side
        x = Math.random() * 10 - 25; // -25 to -15
        z = Math.random() * 40 - 20;
        break;
      case 1: // Right side
        x = Math.random() * 10 + 15; // 15 to 25
        z = Math.random() * 40 - 20;
        break;
      case 2: // Back side
        x = Math.random() * 40 - 20;
        z = Math.random() * 10 - 25; // -25 to -15
        break;
      default:
        x = 0;
        z = 0;
    }
    
    y = Math.random() * 10 + 5;
    
    snowflake.position.set(x, y, z);
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
