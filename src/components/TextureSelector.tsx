import React from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TextureSelectorProps {
  onSelectWallTexture: (texture: string) => void;
  onSelectFloorTexture: (texture: string) => void;
}

const TextureSelector = ({ onSelectWallTexture, onSelectFloorTexture }: TextureSelectorProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 border-t">
      <div className="max-w-4xl mx-auto flex gap-8">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Wall Texture</Label>
          <RadioGroup
            defaultValue="/dark-parquet-512x512.png"
            onValueChange={onSelectWallTexture}
            className="flex gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="/dark-parquet-512x512.png" id="wall-1" />
              <Label htmlFor="wall-1">Dark Parquet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="/smooth-white-tile-512x512.png" id="wall-2" />
              <Label htmlFor="wall-2">White Tile</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Floor Texture</Label>
          <RadioGroup
            defaultValue="/smooth-sand-128x128.png"
            onValueChange={onSelectFloorTexture}
            className="flex gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="/smooth-sand-128x128.png" id="floor-1" />
              <Label htmlFor="floor-1">Smooth Sand</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="/green-grass-512x512.png" id="floor-2" />
              <Label htmlFor="floor-2">Green Grass</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default TextureSelector;