import * as THREE from 'three';
import { 
  createChairGeometry,
  createTableGeometry,
  createSofaGeometry,
  createLampGeometry,
  createTVGeometry
} from './furniture/FurnitureGeometries';
import { setupDragControls } from './furniture/DragControls';
import type { FurnitureType, FurniturePreset } from './furniture/FurnitureTypes';

const FURNITURE_PRESETS: Record<FurnitureType, FurniturePreset> = {
  chair: {
    create: createChairGeometry,
    position: { y: 0 },
    aliases: ['chair', 'seat', 'stool', 'dining chair', 'armchair', 'office chair', 'wooden chair']
  },
  table: {
    create: createTableGeometry,
    position: { y: 0 },
    aliases: ['table', 'desk', 'dining table', 'coffee table', 'side table', 'work desk', 'study table']
  },
  sofa: {
    create: createSofaGeometry,
    position: { y: 0 },
    aliases: ['sofa', 'couch', 'loveseat', 'settee', 'divan', 'chesterfield', 'futon']
  },
  lamp: {
    create: createLampGeometry,
    position: { y: 0 },
    aliases: ['lamp', 'light', 'floor lamp', 'standing lamp', 'reading lamp', 'desk lamp', 'table lamp']
  },
  tv: {
    create: createTVGeometry,
    position: { y: 0 },
    aliases: ['tv', 'television', 'screen', 'monitor', 'display', 'flat screen', 'smart tv']
  }
};

export const AVAILABLE_FURNITURE = Object.values(FURNITURE_PRESETS)
  .map(preset => preset.aliases?.[0])
  .filter(Boolean) as string[];

const findFurnitureType = (searchTerm: string): FurnitureType | undefined => {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  return Object.entries(FURNITURE_PRESETS).find(([_, preset]) => 
    preset.aliases?.some(alias => 
      normalizedSearch.includes(alias.toLowerCase())
    )
  )?.[0] as FurnitureType | undefined;
};

export const createFurniture = (scene: THREE.Scene, name: string) => {
  const furnitureType = findFurnitureType(name);
  
  if (!furnitureType) {
    console.warn(`Unknown furniture type: ${name}. Available types: ${AVAILABLE_FURNITURE.join(', ')}`);
    return null;
  }

  const preset = FURNITURE_PRESETS[furnitureType];
  const furniture = preset.create();
  furniture.position.y = preset.position.y;
  
  furniture.position.x = (Math.random() - 0.5) * 10;
  furniture.position.z = (Math.random() - 0.5) * 10;
  
  // Mark as furniture and make it interactive
  furniture.userData.furniture = true;
  furniture.userData.draggable = true;
  furniture.userData.rotatable = true;
  
  scene.add(furniture);
  return furniture;
};

export { setupDragControls };