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

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
  deleteButton.style.position = 'absolute';
  deleteButton.style.display = 'none';
  deleteButton.style.zIndex = '1000';
  deleteButton.className = 'bg-white/90 p-1 rounded-full hover:bg-red-100 transition-colors';
  document.body.appendChild(deleteButton);

  const onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    
    if (event.button !== 0) return;
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    
    // Only get furniture objects
    const draggableObjects = scene.children.filter(obj => obj.userData.furniture === true);
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
        
        // Show delete button near the selected object
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
    
    if (isDragging && selectedObject) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      
      // Only intersect with the ground plane
      if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
        selectedObject.position.x = intersectionPoint.x;
        selectedObject.position.z = intersectionPoint.z;
      }

      // Update delete button position
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
    isDragging = false;
    selectedObject = null;
    renderer.domElement.style.cursor = 'auto';
  };

  const onContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    
    if (selectedObject && selectedObject.userData.rotatable) {
      selectedObject.rotation.y += Math.PI / 4;
    }
  };

  // Delete button click handler
  deleteButton.addEventListener('click', () => {
    if (selectedObject && selectedObject.parent) {
      selectedObject.parent.remove(selectedObject);
      deleteButton.style.display = 'none';
      selectedObject = null;
    }
  });

  renderer.domElement.addEventListener('mousedown', onMouseDown);
  renderer.domElement.addEventListener('mousemove', onMouseMove);
  renderer.domElement.addEventListener('mouseup', onMouseUp);
  renderer.domElement.addEventListener('contextmenu', onContextMenu);

  return () => {
    renderer.domElement.removeEventListener('mousedown', onMouseDown);
    renderer.domElement.removeEventListener('mousemove', onMouseMove);
    renderer.domElement.removeEventListener('mouseup', onMouseUp);
    renderer.domElement.removeEventListener('contextmenu', onContextMenu);
    document.body.removeChild(deleteButton);
  };
};