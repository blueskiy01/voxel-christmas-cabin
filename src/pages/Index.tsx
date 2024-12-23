import React from 'react';
import CabinScene from '@/components/cabin/CabinScene';
import InteractivePrompt from '@/components/cabin/InteractiveFurniture';

const Index = () => {
  const handleFurnitureAdd = (furnitureName: string) => {
    // This function will be implemented in CabinScene
    const scene = document.querySelector('canvas')?.parentElement;
    if (scene) {
      const threeScene = (scene as any).__three;
      if (threeScene) {
        // The existing furniture creation logic will handle this
        console.log('Adding furniture:', furnitureName);
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