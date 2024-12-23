import * as THREE from 'three';

export type FurnitureType = 'chair' | 'table' | 'sofa' | 'lamp' | 'tv';

export interface FurniturePreset {
  create: () => THREE.Group;
  position: { y: number };
  aliases?: string[];
}