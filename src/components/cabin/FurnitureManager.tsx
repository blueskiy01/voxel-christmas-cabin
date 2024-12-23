import * as THREE from 'three';
import { 
  createChairGeometry,
  createTableGeometry,
  createSofaGeometry,
  createLampGeometry,
  createTVGeometry,
  createBedGeometry,
  createBookshelfGeometry,
  createCabinetGeometry,
  createRugGeometry,
  createPlantGeometry,
  createClockGeometry,
  createPictureFrameGeometry,
  createFireplaceGeometry,
  createMirrorGeometry
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
  },
  bed: {
    create: createBedGeometry,
    position: { y: 0 },
    aliases: ['bed', 'king bed', 'queen bed', 'bunk bed', 'single bed', 'double bed']
  },
  bookshelf: {
    create: createBookshelfGeometry,
    position: { y: 0 },
    aliases: ['bookshelf', 'bookcase', 'shelf', 'shelving unit']
  },
  cabinet: {
    create: createCabinetGeometry,
    position: { y: 0 },
    aliases: ['cabinet', 'storage cabinet', 'sideboard', 'cupboard']
  },
  rug: {
    create: createRugGeometry,
    position: { y: 0.01 },
    aliases: ['rug', 'carpet', 'mat', 'area rug', 'persian rug', 'floor mat']
  },
  plant: {
    create: createPlantGeometry,
    position: { y: 0 },
    aliases: ['plant', 'potted plant', 'indoor plant', 'house plant']
  },
  clock: {
    create: createClockGeometry,
    position: { y: 2 },
    aliases: ['clock', 'wall clock', 'timepiece']
  },
  picture: {
    create: createPictureFrameGeometry,
    position: { y: 2 },
    aliases: ['picture', 'frame', 'artwork', 'painting', 'wall art']
  },
  fireplace: {
    create: createFireplaceGeometry,
    position: { y: 0 },
    aliases: ['fireplace', 'hearth', 'chimney']
  },
  mirror: {
    create: createMirrorGeometry,
    position: { y: 2 },
    aliases: ['mirror', 'wall mirror', 'standing mirror']
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