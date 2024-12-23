import * as THREE from 'three';

export type FurnitureType = 
  | 'chair' 
  | 'table' 
  | 'sofa' 
  | 'lamp' 
  | 'tv'
  | 'bed'
  | 'bookshelf'
  | 'cabinet'
  | 'rug'
  | 'plant'
  | 'clock'
  | 'picture'
  | 'fireplace'
  | 'mirror';

export interface FurniturePreset {
  create: () => THREE.Group;
  position: { y: number };
  aliases?: string[];
}