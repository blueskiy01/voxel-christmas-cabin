import * as THREE from 'three';
import { setupWindows } from './decorations/Windows';
import { setupSnow } from './decorations/Snow';
import { setupChristmasTree } from './decorations/ChristmasTree';
import { setupFireplace } from './decorations/Fireplace';

export const setupDecorations = (scene: THREE.Scene) => {
  setupChristmasTree(scene);
  setupFireplace(scene);
  setupWindows(scene);
  setupSnow(scene);
};