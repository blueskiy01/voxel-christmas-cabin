import * as THREE from 'three';

export const createChairGeometry = () => {
  const group = new THREE.Group();
  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.2, 1.6),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  seat.position.y = 1;
  group.add(seat);

  const backrest = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 2.4, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  backrest.position.set(0, 2.2, -0.7);
  group.add(backrest);

  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 6);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  
  const positions = [
    [-0.6, 0.5, 0.6],
    [0.6, 0.5, 0.6],
    [-0.6, 0.5, -0.6],
    [0.6, 0.5, -0.6]
  ];

  positions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(x, y, z);
    group.add(leg);
  });

  return group;
};

export const createTableGeometry = () => {
  const group = new THREE.Group();

  // Table top
  const top = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.1, 2),
    new THREE.MeshStandardMaterial({ color: 0x654321 })
  );
  top.position.y = 0.75;
  group.add(top);

  // Legs
  const legGeometry = new THREE.CylinderGeometry(0.08, 0.12, 0.75, 6);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });

  const positions = [
    [-1.4, 0.375, 0.9],
    [1.4, 0.375, 0.9],
    [-1.4, 0.375, -0.9],
    [1.4, 0.375, -0.9]
  ];

  positions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(x, y, z);
    group.add(leg);
  });

  return group;
};

export const createSofaGeometry = () => {
  const group = new THREE.Group();

  // Base
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.5, 1.5),
    new THREE.MeshStandardMaterial({ color: 0x556B2F })
  );
  base.position.y = 0.25;
  group.add(base);

  // Backrest
  const backrest = new THREE.Mesh(
    new THREE.BoxGeometry(3, 1, 0.3),
    new THREE.MeshStandardMaterial({ color: 0x556B2F })
  );
  backrest.position.set(0, 0.75, -0.6);
  group.add(backrest);

  // Armrests
  const armrestGeometry = new THREE.BoxGeometry(0.3, 0.6, 1.5);
  const armrestMaterial = new THREE.MeshStandardMaterial({ color: 0x556B2F });

  const leftArmrest = new THREE.Mesh(armrestGeometry, armrestMaterial);
  leftArmrest.position.set(-1.35, 0.55, 0);
  group.add(leftArmrest);

  const rightArmrest = new THREE.Mesh(armrestGeometry, armrestMaterial);
  rightArmrest.position.set(1.35, 0.55, 0);
  group.add(rightArmrest);

  // Cushions
  const cushionGeometry = new THREE.BoxGeometry(0.9, 0.15, 0.9);
  const cushionMaterial = new THREE.MeshStandardMaterial({ color: 0x668B2F });

  const positions = [-0.95, 0, 0.95];
  positions.forEach(x => {
    const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
    cushion.position.set(x, 0.55, 0);
    group.add(cushion);
  });

  return group;
};

export const createLampGeometry = () => {
  const group = new THREE.Group();

  // Base
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.4, 0.1, 8),
    new THREE.MeshStandardMaterial({ color: 0xDEB887 })
  );
  group.add(base);

  // Pole
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8),
    new THREE.MeshStandardMaterial({ color: 0xDEB887 })
  );
  pole.position.y = 0.75;
  group.add(pole);

  // Lampshade
  const shade = new THREE.Mesh(
    new THREE.ConeGeometry(0.4, 0.6, 8, 1, true),
    new THREE.MeshStandardMaterial({ 
      color: 0xFFFAF0,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    })
  );
  shade.position.y = 1.5;
  shade.rotation.x = Math.PI;
  group.add(shade);

  // Light
  const light = new THREE.PointLight(0xFFFFCC, 0.5, 5);
  light.position.y = 1.3;
  group.add(light);

  return group;
};

export const createTVGeometry = () => {
  const group = new THREE.Group();

  // TV Screen
  const screen = new THREE.Mesh(
    new THREE.BoxGeometry(3, 1.8, 0.1),
    new THREE.MeshStandardMaterial({ 
      color: 0x000000,
      metalness: 0.8,
      roughness: 0.2
    })
  );
  screen.position.y = 1;
  group.add(screen);

  // TV Stand
  const stand = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.8, 0.5),
    new THREE.MeshStandardMaterial({ color: 0x363636 })
  );
  stand.position.y = 0.4;
  group.add(stand);

  // TV Base
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.1, 0.8),
    new THREE.MeshStandardMaterial({ color: 0x363636 })
  );
  base.position.y = 0.05;
  group.add(base);

  return group;
};

export const createBedGeometry = () => {
  const group = new THREE.Group();

  // Base/mattress
  const mattress = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 0.3, 2),
    new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
  );
  mattress.position.y = 0.3;
  group.add(mattress);

  // Frame
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(2.7, 0.2, 2.2),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  frame.position.y = 0.1;
  group.add(frame);

  // Headboard
  const headboard = new THREE.Mesh(
    new THREE.BoxGeometry(2.7, 1.2, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  headboard.position.set(0, 0.7, -1.1);
  group.add(headboard);

  return group;
};

export const createBookshelfGeometry = () => {
  const group = new THREE.Group();

  // Main structure
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(2, 3, 0.4),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  frame.position.y = 1.5;
  group.add(frame);

  // Shelves
  const shelfGeometry = new THREE.BoxGeometry(2, 0.05, 0.4);
  const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

  for (let i = 0; i < 4; i++) {
    const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
    shelf.position.y = 0.5 + i;
    group.add(shelf);
  }

  return group;
};

export const createCabinetGeometry = () => {
  const group = new THREE.Group();

  // Main body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  body.position.y = 1;
  group.add(body);

  // Doors
  const doorGeometry = new THREE.BoxGeometry(0.73, 1.9, 0.05);
  const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x6B4423 });

  const leftDoor = new THREE.Mesh(doorGeometry, doorMaterial);
  leftDoor.position.set(-0.37, 1, 0.3);
  group.add(leftDoor);

  const rightDoor = new THREE.Mesh(doorGeometry, doorMaterial);
  rightDoor.position.set(0.37, 1, 0.3);
  group.add(rightDoor);

  return group;
};

export const createRugGeometry = () => {
  const group = new THREE.Group();

  // Rug
  const rug = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 2),
    new THREE.MeshStandardMaterial({ 
      color: 0x8B0000,
      side: THREE.DoubleSide
    })
  );
  rug.rotation.x = -Math.PI / 2;
  group.add(rug);

  return group;
};

export const createPlantGeometry = () => {
  const group = new THREE.Group();

  // Pot
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.2, 0.4, 8),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  pot.position.y = 0.2;
  group.add(pot);

  // Plant
  const plant = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x228B22 })
  );
  plant.position.y = 0.6;
  group.add(plant);

  return group;
};

export const createClockGeometry = () => {
  const group = new THREE.Group();

  // Clock face
  const face = new THREE.Mesh(
    new THREE.CircleGeometry(0.3, 32),
    new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
  );
  group.add(face);

  // Frame
  const frame = new THREE.Mesh(
    new THREE.RingGeometry(0.3, 0.35, 32),
    new THREE.MeshStandardMaterial({ color: 0x000000 })
  );
  frame.position.z = 0.01;
  group.add(frame);

  return group;
};

export const createPictureFrameGeometry = () => {
  const group = new THREE.Group();

  // Picture
  const picture = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 0.8),
    new THREE.MeshStandardMaterial({ color: 0xF5DEB3 })
  );
  group.add(picture);

  // Frame
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.9, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  frame.position.z = -0.025;
  group.add(frame);

  return group;
};

export const createFireplaceGeometry = () => {
  const group = new THREE.Group();

  // Main structure
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.5, 1),
    new THREE.MeshStandardMaterial({ color: 0x808080 })
  );
  base.position.y = 0.75;
  group.add(base);

  // Mantel
  const mantel = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.2, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  mantel.position.y = 1.6;
  group.add(mantel);

  // Firebox
  const firebox = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 1, 0.8),
    new THREE.MeshStandardMaterial({ 
      color: 0x000000,
      emissive: 0xff4500,
      emissiveIntensity: 0.5
    })
  );
  firebox.position.y = 0.7;
  group.add(firebox);

  return group;
};

export const createMirrorGeometry = () => {
  const group = new THREE.Group();

  // Mirror surface
  const mirror = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1.5),
    new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1
    })
  );
  group.add(mirror);

  // Frame
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.7, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  frame.position.z = -0.05;
  group.add(frame);

  return group;
};
