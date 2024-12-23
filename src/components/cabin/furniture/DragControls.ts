import * as THREE from 'three';

export const setupDragControls = (
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene
) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let selectedObject: THREE.Object3D | null = null;
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0));
  const intersectionPoint = new THREE.Vector3();
  let isPlacingFurniture = false;

  // Create room bounds for interaction check
  const roomBounds = new THREE.Box3(
    new THREE.Vector3(-15, 0, -15),
    new THREE.Vector3(15, 8, 15)
  );

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
  deleteButton.style.position = 'absolute';
  deleteButton.style.display = 'none';
  deleteButton.style.zIndex = '1000';
  deleteButton.className = 'bg-white/90 p-1 rounded-full hover:bg-red-100 transition-colors';
  document.body.appendChild(deleteButton);

  const isInsideRoom = (x: number, y: number) => {
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    const point = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, point)) {
      return roomBounds.containsPoint(point);
    }
    return false;
  };

  const onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const isInRoom = isInsideRoom(mouse.x, mouse.y);
    
    raycaster.setFromCamera(mouse, camera);
    
    const draggableObjects = scene.children.filter(obj => obj.userData.furniture === true);
    const intersects = raycaster.intersectObjects(draggableObjects, true);

    if (intersects.length > 0 && isInRoom) {
      let parent = intersects[0].object;
      while (parent.parent && !parent.userData.draggable) {
        parent = parent.parent;
      }
      
      if (parent.userData.draggable) {
        selectedObject = parent;
        
        // Handle right-click rotation
        if (event.button === 2) {
          selectedObject.rotation.y += Math.PI / 4; // Rotate 45 degrees
          return;
        }
        
        // Handle left-click drag
        if (event.button === 0) {
          isPlacingFurniture = true;
          renderer.domElement.style.cursor = 'move';
        }
        
        const vector = new THREE.Vector3();
        vector.setFromMatrixPosition(selectedObject.matrixWorld);
        vector.project(camera);
        
        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
        
        deleteButton.style.display = 'block';
        deleteButton.style.left = `${x + 30}px`;
        deleteButton.style.top = `${y - 30}px`;
      }
    } else {
      deleteButton.style.display = 'none';
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (isPlacingFurniture && selectedObject) {
      raycaster.setFromCamera(mouse, camera);
      
      if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
        // Constrain movement within room bounds
        intersectionPoint.x = Math.max(-14, Math.min(14, intersectionPoint.x));
        intersectionPoint.z = Math.max(-14, Math.min(14, intersectionPoint.z));
        
        selectedObject.position.x = intersectionPoint.x;
        selectedObject.position.z = intersectionPoint.z;
      }

      const vector = new THREE.Vector3();
      vector.setFromMatrixPosition(selectedObject.matrixWorld);
      vector.project(camera);
      
      const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
      
      deleteButton.style.left = `${x + 30}px`;
      deleteButton.style.top = `${y - 30}px`;
    }
  };

  const onMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    isPlacingFurniture = false;
    renderer.domElement.style.cursor = 'auto';
  };

  // Delete button click handler
  deleteButton.addEventListener('click', () => {
    if (selectedObject) {
      scene.remove(selectedObject);
      selectedObject = null;
      deleteButton.style.display = 'none';
    }
  });

  // Prevent context menu on right-click
  renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());
  
  renderer.domElement.addEventListener('mousedown', onMouseDown);
  renderer.domElement.addEventListener('mousemove', onMouseMove);
  renderer.domElement.addEventListener('mouseup', onMouseUp);

  return () => {
    renderer.domElement.removeEventListener('mousedown', onMouseDown);
    renderer.domElement.removeEventListener('mousemove', onMouseMove);
    renderer.domElement.removeEventListener('mouseup', onMouseUp);
    document.body.removeChild(deleteButton);
  };
};