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
  
  // Define Christmas tree position and radius
  const treePosition = new THREE.Vector3(-5, 0, -5);
  const treeRadius = 2; // Collision radius for the tree
  
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
        
        // Calculate next position
        const nextPos = catPos.clone();
        nextPos.x += direction.x * speed * 0.1;
        nextPos.z += direction.z * speed * 0.1;
        
        // Check distance to tree
        const distanceToTree = new THREE.Vector2(
          nextPos.x - treePosition.x,
          nextPos.z - treePosition.z
        ).length();
        
        // Only move if not colliding with tree
        if (distanceToTree > treeRadius) {
          catPos.copy(nextPos);
        }
        
        // Face direction of movement
        bodyGeometry.rotation.y = Math.atan2(direction.x, direction.z);
      }
      
      // Add bobbing motion
      catPos.y = 0.3 + Math.sin(Date.now() * 0.004) * 0.1;

      // Animate legs
      const legsGroup = bodyGeometry.children.find(child => 
        child instanceof THREE.Group && 
        child.children[0] instanceof THREE.Mesh && 
        child.children[0].geometry instanceof THREE.CylinderGeometry
      ) as THREE.Group;
      
      if (legsGroup) {
        animateLegs(legsGroup);
      }
      
      // Animate tail
      const tail = bodyGeometry.children.find(child => 
        child instanceof THREE.Mesh && 
        child.geometry instanceof THREE.TubeGeometry
      ) as THREE.Mesh;
      
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