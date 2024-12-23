import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

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
      toast({
        title: "Furniture Added",
        description: `Added ${prompt} to your cabin!`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-96 z-10">
      <Input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type furniture name (e.g., chair, table, sofa) and press Enter"
        className="w-full bg-white/90 backdrop-blur"
      />
    </form>
  );
};

export default InteractivePrompt;