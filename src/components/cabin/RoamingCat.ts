import * as THREE from 'three';

export const createRoamingCat = (scene: THREE.Scene) => {
  // Create cat mesh
  const catGroup = new THREE.Group();
  
  // Cat body - make it rounder and bigger
  const bodyGeometry = new THREE.CapsuleGeometry(0.3, 0.5, 8, 16);
  const catMaterial = new THREE.MeshStandardMaterial({ color: 0xFFA500 }); // Orange tabby color
  const body = new THREE.Mesh(bodyGeometry, catMaterial);
  catGroup.add(body);

  // Cat head - make it rounder
  const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
  const head = new THREE.Mesh(headGeometry, catMaterial);
  head.position.set(0.4, 0.2, 0);
  catGroup.add(head);

  // Cat ears
  const earGeometry = new THREE.ConeGeometry(0.1, 0.2, 3);
  const leftEar = new THREE.Mesh(earGeometry, catMaterial);
  leftEar.position.set(0.45, 0.4, 0.1);
  leftEar.rotation.x = -Math.PI / 6;
  catGroup.add(leftEar);

  const rightEar = new THREE.Mesh(earGeometry, catMaterial);
  rightEar.position.set(0.45, 0.4, -0.1);
  rightEar.rotation.x = Math.PI / 6;
  catGroup.add(rightEar);

  // Cat tail - make it longer and curvier
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.4, 0.1, 0),
    new THREE.Vector3(-0.6, 0.2, 0),
    new THREE.Vector3(-0.8, 0.3, 0),
  ]);
  const tailGeometry = new THREE.TubeGeometry(tailCurve, 8, 0.05, 8, false);
  const tail = new THREE.Mesh(tailGeometry, catMaterial);
  catGroup.add(tail);

  // Initial position
  catGroup.position.set(0, 0.3, 0); // Slightly higher off the ground
  scene.add(catGroup);

  // Animation parameters
  let targetPosition = new THREE.Vector3();
  let currentAngle = 0;
  const speed = 0.005; // Reduced speed
  const radius = 8; // Slightly smaller radius

  // Animation function
  const animate = () => {
    // Move in a circular pattern
    currentAngle += speed;
    targetPosition.x = Math.cos(currentAngle) * radius;
    targetPosition.z = Math.sin(currentAngle) * radius;

    // Smoothly move towards target
    catGroup.position.lerp(targetPosition.setY(0.3), 0.01);
    
    // Rotate cat to face movement direction
    catGroup.rotation.y = -currentAngle - Math.PI / 2;

    // Animate tail with a gentle wave
    tail.rotation.z = Math.sin(currentAngle * 3) * 0.1;

    // Gentle bobbing motion
    catGroup.position.y = 0.3 + Math.sin(currentAngle * 2) * 0.05;

    requestAnimationFrame(animate);
  };

  animate();

  return catGroup;
};