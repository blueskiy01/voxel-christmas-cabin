import * as THREE from 'three';

export const createAnimatedBird = (scene: THREE.Scene) => {
  const birdGroup = new THREE.Group();
  
  // Bird body
  const body = new THREE.Mesh(
    new THREE.ConeGeometry(0.3, 0.8, 8),
    new THREE.MeshPhongMaterial({ color: 0x4169E1 }) // Royal blue color
  );
  body.rotation.x = Math.PI / 2;
  birdGroup.add(body);

  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 8, 8),
    new THREE.MeshPhongMaterial({ color: 0x4169E1 })
  );
  head.position.z = 0.5;
  head.position.y = 0.1;
  birdGroup.add(head);

  // Beak
  const beak = new THREE.Mesh(
    new THREE.ConeGeometry(0.1, 0.3, 4),
    new THREE.MeshPhongMaterial({ color: 0xFFD700 }) // Gold color
  );
  beak.position.z = 0.7;
  beak.position.y = 0.1;
  beak.rotation.x = -Math.PI / 2;
  birdGroup.add(beak);

  // Wings
  const wingGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.3);
  const wingMaterial = new THREE.MeshPhongMaterial({ color: 0x4169E1 });

  const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
  leftWing.position.set(-0.4, 0, 0);
  birdGroup.add(leftWing);

  const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
  rightWing.position.set(0.4, 0, 0);
  birdGroup.add(rightWing);

  // Position the bird
  birdGroup.position.set(-2, 3, -2);
  scene.add(birdGroup);

  // Movement parameters
  let angle = 0;
  const speed = 0.001;
  const radius = 6;

  // Store the bird in scene's userData for animation
  scene.userData.bird = {
    model: birdGroup,
    getPosition: () => birdGroup.position.clone(),
    animate: () => {
      // Move in a circle
      angle += speed;
      birdGroup.position.x = Math.cos(angle) * radius;
      birdGroup.position.z = Math.sin(angle) * radius;
      birdGroup.position.y = 3 + Math.sin(Date.now() * 0.001) * 0.1;
      
      // Face direction of movement
      birdGroup.rotation.y = -angle;

      // Animate wings
      const wings = [leftWing, rightWing];
      wings.forEach(wing => {
        wing.rotation.z = Math.sin(Date.now() * 0.01) * 0.2;
      });
    }
  };

  // Add animation to the main render loop
  const originalAnimate = scene.userData.animate || (() => {});
  scene.userData.animate = () => {
    originalAnimate();
    scene.userData.bird.animate();
  };
};