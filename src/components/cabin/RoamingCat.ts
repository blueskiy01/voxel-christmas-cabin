import * as THREE from 'three';
import { createCatBody } from './cat/CatBody';
import { createCatHead } from './cat/CatHead';
import { createCatLegs, animateLegs } from './cat/CatLegs';
import { createCatTail, animateTail } from './cat/CatTail';

export const createRoamingCat = (scene: THREE.Scene) => {
  // Create cat body (main body + head)
  const bodyGeometry = new THREE.Group();
  
  // Add components
  bodyGeometry.add(createCatBody());
  bodyGeometry.add(createCatHead());
  bodyGeometry.add(createCatLegs());
  bodyGeometry.add(createCatTail());

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

      // Animate legs
      const legsGroup = bodyGeometry.children.find(child => child instanceof THREE.Group && child.children[0]?.geometry instanceof THREE.CylinderGeometry) as THREE.Group;
      if (legsGroup) {
        animateLegs(legsGroup);
      }
      
      // Animate tail
      const tail = bodyGeometry.children.find(child => child.geometry instanceof THREE.TubeGeometry) as THREE.Mesh;
      if (tail) {
        animateTail(tail);
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