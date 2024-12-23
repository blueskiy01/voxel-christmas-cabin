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
    
    // Only handle left click for dragging
    if (event.button !== 0) return;
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    
    const draggableObjects = scene.children.filter(obj => obj.userData.draggable);
    const intersects = raycaster.intersectObjects(draggableObjects, true);

    if (intersects.length > 0) {
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

  const onContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    
    // Get the object under the cursor
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const rotatableObjects = scene.children.filter(obj => obj.userData.rotatable);
    const intersects = raycaster.intersectObjects(rotatableObjects, true);

    if (intersects.length > 0) {
      let parent = intersects[0].object;
      while (parent.parent && !parent.userData.rotatable) {
        parent = parent.parent;
      }
      
      if (parent.userData.rotatable) {
        // Rotate 45 degrees on right click
        parent.rotation.y += Math.PI / 4;
      }
    }
  };

  renderer.domElement.addEventListener('mousedown', onMouseDown);
  renderer.domElement.addEventListener('mousemove', onMouseMove);
  renderer.domElement.addEventListener('mouseup', onMouseUp);
  renderer.domElement.addEventListener('contextmenu', onContextMenu);

  // Clean up function
  return () => {
    renderer.domElement.removeEventListener('mousedown', onMouseDown);
    renderer.domElement.removeEventListener('mousemove', onMouseMove);
    renderer.domElement.removeEventListener('mouseup', onMouseUp);
    renderer.domElement.removeEventListener('contextmenu', onContextMenu);
  };
};