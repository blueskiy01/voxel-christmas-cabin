import React from 'react';
import CabinScene from '@/components/cabin/CabinScene';
import { FurnitureSidebar } from '@/components/furniture/FurnitureSidebar';

const Index = () => {
  return (
    <div className="flex h-screen">
      <FurnitureSidebar />
      <div className="flex-1">
        <CabinScene />
      </div>
    </div>
  );
};

export default Index;