import * as THREE from 'three';

export const createRoamingCat = (scene: THREE.Scene) => {
  // Create cat body (main body + head)
  const bodyGeometry = new THREE.Group();
  
  // Main body - rounded rectangle
  const mainBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.6, 1.2),
    new THREE.MeshPhongMaterial({ color: 0xFFA500 }) // Orange color for tabby cat
  );
  mainBody.position.y = 0.3;
  bodyGeometry.add(mainBody);

  // Head - sphere
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 8, 8),
    new THREE.MeshPhongMaterial({ color: 0xFFA500 })
  );
  head.position.set(0, 0.5, 0.7);
  bodyGeometry.add(head);

  // Ears - triangular prisms
  const earGeometry = new THREE.ConeGeometry(0.15, 0.3, 4);
  const earMaterial = new THREE.MeshPhongMaterial({ color: 0xFFA500 });
  
  const leftEar = new THREE.Mesh(earGeometry, earMaterial);
  leftEar.position.set(-0.2, 0.8, 0.7);
  leftEar.rotation.x = -Math.PI / 6;
  bodyGeometry.add(leftEar);
  
  const rightEar = new THREE.Mesh(earGeometry, earMaterial);
  rightEar.position.set(0.2, 0.8, 0.7);
  rightEar.rotation.x = -Math.PI / 6;
  bodyGeometry.add(rightEar);

  // Tail - curved cylinder
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.3, -0.6),
    new THREE.Vector3(0, 0.5, -0.8),
    new THREE.Vector3(0, 0.7, -0.6)
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
  const radius = 8; // Radius of circular path
  const speed = 0.0003; // Reduced speed for slower movement
  let angle = 0;

  // Store the cat in scene's userData for animation
  scene.userData.cat = {
    model: bodyGeometry,
    animate: () => {
      angle += speed;
      
      // Update position in a circle
      bodyGeometry.position.x = Math.cos(angle) * radius;
      bodyGeometry.position.z = Math.sin(angle) * radius;
      
      // Make cat face the direction it's moving
      bodyGeometry.rotation.y = angle + Math.PI / 2;
      
      // Add subtle up and down movement
      bodyGeometry.position.y = Math.sin(angle * 4) * 0.1 + 0.3;
      
      // Animate tail
      tail.rotation.z = Math.sin(angle * 8) * 0.2;
    }
  };

  // Add animation to the main render loop
  const originalAnimate = scene.userData.animate || (() => {});
  scene.userData.animate = () => {
    originalAnimate();
    scene.userData.cat.animate();
  };
};