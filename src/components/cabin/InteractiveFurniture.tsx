import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AVAILABLE_FURNITURE } from './FurnitureManager';

interface InteractivePromptProps {
  onFurnitureAdd: (furnitureName: string) => void;
}

const InteractivePrompt: React.FC<InteractivePromptProps> = ({ onFurnitureAdd }) => {
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onFurnitureAdd(prompt.trim());
      setPrompt('');
    }
  };

  const handleInvalidInput = () => {
    toast({
      title: "Available Furniture Types",
      description: `Try: ${AVAILABLE_FURNITURE.join(', ')}`,
      variant: "default"
    });
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-96 z-10">
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type furniture name and press Enter"
          className="w-full bg-white/90 backdrop-blur"
        />
        <p className="text-xs text-white/80 text-center">
          Right-click to rotate while dragging. Available: {AVAILABLE_FURNITURE.join(', ')}
        </p>
      </form>
    </div>
  );
};

export default InteractivePrompt;