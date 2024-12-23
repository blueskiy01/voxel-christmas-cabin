import React from 'react';
import CabinScene from '@/components/cabin/CabinScene';
import InteractivePrompt from '@/components/cabin/InteractiveFurniture';
import { createFurniture } from '@/components/cabin/FurnitureManager';

const Index = () => {
  const handleFurnitureAdd = (furnitureName: string) => {
    const scene = document.querySelector('canvas')?.parentElement;
    if (scene) {
      const threeScene = (scene as any).__three;
      if (threeScene) {
        createFurniture(threeScene, furnitureName);
      }
    }
  };

  return (
    <div className="relative h-screen">
      <CabinScene />
      <InteractivePrompt onFurnitureAdd={handleFurnitureAdd} />
    </div>
  );
};

export default Index;