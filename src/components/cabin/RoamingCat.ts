import * as THREE from 'three';

export const createRoamingCat = (scene: THREE.Scene) => {
  // Create cat body (main body + head)
  const bodyGeometry = new THREE.Group();
  
  // Main body - longer rounded rectangle
  const mainBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.6, 1.6), // Made longer (1.2 -> 1.6)
    new THREE.MeshPhongMaterial({ color: 0xFFA500 })
  );
  mainBody.position.y = 0.5; // Raised position to make legs more visible
  bodyGeometry.add(mainBody);

  // Head - sphere
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 8, 8),
    new THREE.MeshPhongMaterial({ color: 0xFFA500 })
  );
  head.position.set(0, 0.7, 0.9); // Adjusted for new body length
  bodyGeometry.add(head);

  // Ears - triangular prisms
  const earGeometry = new THREE.ConeGeometry(0.15, 0.3, 4);
  const earMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA500 });
  
  const leftEar = new THREE.Mesh(earGeometry, earMaterial);
  leftEar.position.set(-0.2, 1.0, 0.9);
  leftEar.rotation.x = -Math.PI / 6;
  bodyGeometry.add(leftEar);
  
  const rightEar = new THREE.Mesh(earGeometry, earMaterial);
  rightEar.position.set(0.2, 1.0, 0.9);
  rightEar.rotation.x = -Math.PI / 6;
  bodyGeometry.add(rightEar);

  // Add four legs - made longer and thicker
  const legGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.6); // Increased height and radius
  const legMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA500 });

  // Front legs - positioned further apart
  const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
  frontLeftLeg.position.set(-0.3, 0.3, 0.6);
  bodyGeometry.add(frontLeftLeg);

  const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
  frontRightLeg.position.set(0.3, 0.3, 0.6);
  bodyGeometry.add(frontRightLeg);

  // Back legs - positioned further apart
  const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
  backLeftLeg.position.set(-0.3, 0.3, -0.4);
  bodyGeometry.add(backLeftLeg);

  const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
  backRightLeg.position.set(0.3, 0.3, -0.4);
  bodyGeometry.add(backRightLeg);

  // Tail - curved cylinder
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.5, -0.8),
    new THREE.Vector3(0, 0.7, -1.0),
    new THREE.Vector3(0, 0.9, -0.8)
  ]);
  
  const tailGeometry = new THREE.TubeGeometry(tailCurve, 8, 0.1, 8, false);
  const tail = new THREE.Mesh(
    tailGeometry,
    new THREE.MeshPhongMaterial({ color: 0xFFA500 })
  );
  bodyGeometry.add(tail);

  // Add cat to scene
  scene.add(bodyGeometry);

  // Animation parameters
  const speed = 0.05;
  const chaseDist = 0.1;
  
  // Store the cat in scene's userData for animation
  scene.userData.cat = {
    model: bodyGeometry,
    animate: () => {
      if (!scene.userData.bird) return;
      
      // Get bird position
      const birdPos = scene.userData.bird.getPosition();
      const catPos = bodyGeometry.position;
      
      // Calculate direction to bird
      const direction = new THREE.Vector3(
        birdPos.x - catPos.x,
        0,
        birdPos.z - catPos.z
      );
      
      if (direction.length() > chaseDist) {
        direction.normalize();
        
        // Move towards bird
        catPos.x += direction.x * speed * 0.1;
        catPos.z += direction.z * speed * 0.1;
        
        // Face direction of movement
        bodyGeometry.rotation.y = Math.atan2(direction.x, direction.z);
      }
      
      // Add bobbing motion
      catPos.y = 0.3 + Math.sin(Date.now() * 0.004) * 0.1;

      // Animate legs with more pronounced movement
      const legs = bodyGeometry.children.filter(child => {
        return (child as THREE.Mesh).geometry instanceof THREE.CylinderGeometry;
      });

      legs.forEach((leg, index) => {
        (leg as THREE.Mesh).position.y = 0.3 + Math.sin(Date.now() * 0.008 + index * Math.PI/2) * 0.1;
      });
      
      // Animate tail
      const tail = bodyGeometry.children.find(child => {
        return (child as THREE.Mesh).geometry instanceof THREE.TubeGeometry;
      });
      
      if (tail) {
        (tail as THREE.Mesh).rotation.z = Math.sin(Date.now() * 0.008) * 0.2;
      }
    }
  };

  // Add animation to the main render loop
  const originalAnimate = scene.userData.animate || (() => {});
  scene.userData.animate = () => {
    originalAnimate();
    scene.userData.cat.animate();
  };
};