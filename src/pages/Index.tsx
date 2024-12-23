import React from 'react';
import IsometricRoom from '@/components/IsometricRoom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-christmas-gold mb-8">Christmas Cabin Decorator</h1>
      <div className="relative bg-black p-8 rounded-lg shadow-2xl">
        <IsometricRoom />
      </div>
      <p className="text-snow mt-4 text-center">
        Welcome to your cozy Christmas cabin! <br/>
        More features coming soon...
      </p>
    </div>
  );
};

export default Index;