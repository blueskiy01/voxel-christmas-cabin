import * as THREE from 'three';

export const createRoamingCat = (scene: THREE.Scene) => {
  // Create cat mesh
  const catGroup = new THREE.Group();
  
  // Cat body
  const bodyGeometry = new THREE.CapsuleGeometry(0.2, 0.4, 4, 8);
  const catMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
  const body = new THREE.Mesh(bodyGeometry, catMaterial);
  catGroup.add(body);

  // Cat head
  const headGeometry = new THREE.SphereGeometry(0.15, 8, 8);
  const head = new THREE.Mesh(headGeometry, catMaterial);
  head.position.set(0.3, 0.15, 0);
  catGroup.add(head);

  // Cat tail
  const tailGeometry = new THREE.CylinderGeometry(0.03, 0.01, 0.4);
  const tail = new THREE.Mesh(tailGeometry, catMaterial);
  tail.position.set(-0.3, 0.1, 0);
  tail.rotation.z = Math.PI / 4;
  catGroup.add(tail);

  // Initial position
  catGroup.position.set(0, 0.2, 0);
  scene.add(catGroup);

  // Animation parameters
  let targetPosition = new THREE.Vector3();
  let currentAngle = 0;
  const speed = 0.02;
  const radius = 10;

  // Animation function
  const animate = () => {
    // Move in a circular pattern
    currentAngle += speed;
    targetPosition.x = Math.cos(currentAngle) * radius;
    targetPosition.z = Math.sin(currentAngle) * radius;

    // Smoothly move towards target
    catGroup.position.lerp(targetPosition, 0.02);
    
    // Rotate cat to face movement direction
    catGroup.rotation.y = -currentAngle;

    // Animate tail
    tail.rotation.z = Math.PI / 4 + Math.sin(currentAngle * 5) * 0.2;

    requestAnimationFrame(animate);
  };

  animate();

  return catGroup;
};