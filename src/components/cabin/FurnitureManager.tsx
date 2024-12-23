import * as THREE from 'three';

const FURNITURE_PRESETS = {
  chair: {
    geometry: new THREE.BoxGeometry(1, 1.5, 1),
    material: new THREE.MeshStandardMaterial({ color: 0x8B4513 }),
    position: { y: 0.75 }
  },
  table: {
    geometry: new THREE.BoxGeometry(2, 1, 2),
    material: new THREE.MeshStandardMaterial({ color: 0x8B4513 }),
    position: { y: 0.5 }
  },
  sofa: {
    geometry: new THREE.BoxGeometry(3, 1.2, 1.5),
    material: new THREE.MeshStandardMaterial({ color: 0x556B2F }),
    position: { y: 0.6 }
  },
  lamp: {
    geometry: new THREE.CylinderGeometry(0.2, 0.4, 2),
    material: new THREE.MeshStandardMaterial({ color: 0xDEB887 }),
    position: { y: 1 }
  }
};

export const createFurniture = (scene: THREE.Scene, name: string) => {
  const preset = FURNITURE_PRESETS[name.toLowerCase() as keyof typeof FURNITURE_PRESETS] 
    || FURNITURE_PRESETS.chair;

  const furniture = new THREE.Mesh(preset.geometry, preset.material);
  furniture.position.y = preset.position.y;
  
  // Random position within the cabin
  furniture.position.x = (Math.random() - 0.5) * 10;
  furniture.position.z = (Math.random() - 0.5) * 10;
  
  // Make furniture draggable
  furniture.userData.draggable = true;
  
  scene.add(furniture);
  return furniture;
};

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

  renderer.domElement.addEventListener('mousedown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && intersects[0].object.userData.draggable) {
      selectedObject = intersects[0].object;
      isDragging = true;
      renderer.domElement.style.cursor = 'grabbing';
    }
  });

  renderer.domElement.addEventListener('mousemove', (event) => {
    if (isDragging && selectedObject) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, intersectionPoint);
      
      selectedObject.position.x = intersectionPoint.x;
      selectedObject.position.z = intersectionPoint.z;
    }
  });

  renderer.domElement.addEventListener('mouseup', () => {
    isDragging = false;
    selectedObject = null;
    renderer.domElement.style.cursor = 'auto';
  });
};