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
  
  // Define Christmas tree position and radius
  const treePosition = new THREE.Vector3(-5, 0, -5);
  const treeRadius = 2; // Collision radius for the tree
  const treeHeight = 8; // Approximate height of the tree

  // Store the bird in scene's userData for animation
  scene.userData.bird = {
    model: birdGroup,
    getPosition: () => birdGroup.position.clone(),
    animate: () => {
      // Calculate next position
      const nextX = Math.cos(angle) * radius;
      const nextZ = Math.sin(angle) * radius;
      
      // Check distance to tree (only if bird is below tree height)
      if (birdGroup.position.y < treeHeight) {
        const distanceToTree = new THREE.Vector2(
          nextX - treePosition.x,
          nextZ - treePosition.z
        ).length();
        
        // If would collide with tree, adjust radius outward
        if (distanceToTree < treeRadius) {
          const adjustedRadius = radius + (treeRadius - distanceToTree);
          birdGroup.position.x = Math.cos(angle) * adjustedRadius;
          birdGroup.position.z = Math.sin(angle) * adjustedRadius;
        } else {
          birdGroup.position.x = nextX;
          birdGroup.position.z = nextZ;
        }
      } else {
        // Above tree height, move normally
        birdGroup.position.x = nextX;
        birdGroup.position.z = nextZ;
      }
      
      angle += speed;
      birdGroup.position.y = 3 + Math.sin(Date.now() * 0.001) * 0.1;
      
      // Face direction of movement
      birdGroup.rotation.y = -angle;

      // Animate wings
      const wings = [leftWing, rightWing];
      wings.forEach(wing => {
        wing.rotation.z = Math.sin(Date.now() * 0.02) * 0.4;
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