import * as THREE from 'three';

export const createChairGeometry = () => {
  const group = new THREE.Group();

  // Seat
  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.1, 1),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  seat.position.y = 0.5;
  group.add(seat);

  // Backrest
  const backrest = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1.2, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  backrest.position.set(0, 1.1, -0.45);
  group.add(backrest);

  // Legs
  const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 6);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  
  const positions = [
    [-0.4, 0.25, 0.4],
    [0.4, 0.25, 0.4],
    [-0.4, 0.25, -0.4],
    [0.4, 0.25, -0.4]
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
    new THREE.BoxGeometry(2, 0.1, 1.5),
    new THREE.MeshStandardMaterial({ color: 0x654321 })
  );
  top.position.y = 0.75;
  group.add(top);

  // Legs
  const legGeometry = new THREE.CylinderGeometry(0.05, 0.08, 0.75, 6);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });

  const positions = [
    [-0.9, 0.375, 0.65],
    [0.9, 0.375, 0.65],
    [-0.9, 0.375, -0.65],
    [0.9, 0.375, -0.65]
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