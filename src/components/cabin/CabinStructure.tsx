import * as THREE from 'three';
import { createWalls } from './components/Walls';
import { createFloor } from './components/Floor';
import { createWindows } from './components/Windows';

interface CabinStructureProps {
  wallTexturePath?: string;
  floorTexturePath?: string;
}

export const setupCabinStructure = async (
  scene: THREE.Scene, 
  { 
    wallTexturePath = '/dark-parquet-512x512.png', 
    floorTexturePath = '/smooth-sand-128x128.png' 
  }: CabinStructureProps = {}
) => {
  try {
    // Create base components
    const walls = await createWalls(scene, wallTexturePath);
    const floor = await createFloor(scene, floorTexturePath);
    const windows = createWindows(scene);

    // Add baseboard trim
    const wallTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x8E9196,
      roughness: 0.5,
      metalness: 0.2,
    });

    const baseboardGeometry = new THREE.BoxGeometry(30, 0.3, 0.1);
    const leftBaseboard = new THREE.Mesh(baseboardGeometry, wallTrimMaterial);
    leftBaseboard.position.set(0, 0.1, -15);
    leftBaseboard.castShadow = true;
    leftBaseboard.receiveShadow = true;
    scene.add(leftBaseboard);

    const rightBaseboard = new THREE.Mesh(baseboardGeometry, wallTrimMaterial);
    rightBaseboard.position.set(0, 0.1, 15);
    rightBaseboard.castShadow = true;
    rightBaseboard.receiveShadow = true;
    scene.add(rightBaseboard);

    return {
      walls,
      floor,
      windows,
      baseboards: { leftBaseboard, rightBaseboard }
    };
  } catch (error) {
    console.error('Error setting up cabin structure:', error);
    throw error;
  }
};