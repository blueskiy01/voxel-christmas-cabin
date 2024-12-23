import * as THREE from 'three';

export const setupSnow = (scene: THREE.Scene) => {
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