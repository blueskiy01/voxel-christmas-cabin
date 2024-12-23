import React from 'react';
import ChristmasCabin3D from '@/components/ChristmasCabin3D';
import { FurnitureSidebar } from '@/components/furniture/FurnitureSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <FurnitureSidebar />
        <div className="flex-1">
          <ChristmasCabin3D />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;