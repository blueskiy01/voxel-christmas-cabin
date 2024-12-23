import * as THREE from 'three';

export const setupDragControls = (
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene
) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let selectedObject: THREE.Object3D | null = null;
  let isDragging = false;
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0));
  const intersectionPoint = new THREE.Vector3();

  const onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    
    // Get all objects in the scene that can be dragged
    const draggableObjects = scene.children.filter(obj => obj.userData.draggable);
    const intersects = raycaster.intersectObjects(draggableObjects, true);

    if (intersects.length > 0) {
      // Find the top-level parent that has the draggable flag
      let parent = intersects[0].object;
      while (parent.parent && !parent.userData.draggable) {
        parent = parent.parent;
      }
      
      if (parent.userData.draggable) {
        selectedObject = parent;
        isDragging = true;
        renderer.domElement.style.cursor = 'grabbing';
      }
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    
    if (isDragging && selectedObject) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, intersectionPoint);
      
      // Update position while keeping the original Y position
      selectedObject.position.x = intersectionPoint.x;
      selectedObject.position.z = intersectionPoint.z;
    }
  };

  const onMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    isDragging = false;
    selectedObject = null;
    renderer.domElement.style.cursor = 'auto';
  };

  renderer.domElement.addEventListener('mousedown', onMouseDown);
  renderer.domElement.addEventListener('mousemove', onMouseMove);
  renderer.domElement.addEventListener('mouseup', onMouseUp);

  // Clean up function
  return () => {
    renderer.domElement.removeEventListener('mousedown', onMouseDown);
    renderer.domElement.removeEventListener('mousemove', onMouseMove);
    renderer.domElement.removeEventListener('mouseup', onMouseUp);
  };
};
