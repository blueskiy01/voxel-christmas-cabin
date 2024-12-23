import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createFurniture } from "../cabin/FurnitureManager";

interface FurnitureItem {
  id: string;
  name: string;
  type: string;
  thumbnail: string;
}

const FURNITURE_DATA: FurnitureItem[] = [
  // Existing Traditional 
  { id: "table1", name: "Wooden Table", type: "table", thumbnail: "🪑" },
  { id: "table2", name: "Dining Table", type: "table", thumbnail: "🪑" },
  { id: "chair1", name: "Armchair", type: "chair", thumbnail: "🪑" },
  { id: "sofa1", name: "Cozy Sofa", type: "sofa", thumbnail: "🛋️" },
  { id: "bed1", name: "King Bed", type: "bed", thumbnail: "🛏️" },
  { id: "bed2", name: "Bunk Bed", type: "bed", thumbnail: "🛏️" },
  { id: "lamp1", name: "Floor Lamp", type: "lighting", thumbnail: "💡" },
  { id: "lamp2", name: "Table Lamp", type: "lighting", thumbnail: "💡" },
  { id: "rug1", name: "Persian Rug", type: "decor", thumbnail: "🧶" },
  { id: "rug2", name: "Snowflake Rug", type: "decor", thumbnail: "🧶" },
  { id: "tree1", name: "Christmas Tree", type: "decor", thumbnail: "🎄" },
  { id: "fireplace1", name: "Fireplace", type: "decor", thumbnail: "🔥" },
  { id: "bookshelf1", name: "Bookshelf", type: "storage", thumbnail: "📚" },
  { id: "cabinet1", name: "Storage Cabinet", type: "storage", thumbnail: "🗄️" },
  { id: "desk1", name: "Study Desk", type: "table", thumbnail: "🪑" },
  { id: "stool1", name: "Bar Stool", type: "chair", thumbnail: "🪑" },
  { id: "mirror1", name: "Wall Mirror", type: "decor", thumbnail: "🪞" },
  { id: "plant1", name: "Potted Plant", type: "decor", thumbnail: "🪴" },
  { id: "clock1", name: "Wall Clock", type: "decor", thumbnail: "⏰" },
  { id: "picture1", name: "Picture Frame", type: "decor", thumbnail: "🖼️" },

  // Modern Furniture  
  { id: "table3", name: "Glass Coffee Table", type: "table", thumbnail: "🪑" },
  { id: "chair2", name: "Minimalist Chair", type: "chair", thumbnail: "🪑" },
  { id: "sofa2", name: "Modern Sectional Sofa", type: "sofa", thumbnail: "🛋️" },
  { id: "bed3", name: "Platform Bed", type: "bed", thumbnail: "🛏️" },
  { id: "lamp3", name: "LED Floor Lamp", type: "lighting", thumbnail: "💡" },
  { id: "lamp4", name: "Modern Desk Lamp", type: "lighting", thumbnail: "💡" },
  { id: "rug3", name: "Geometric Rug", type: "decor", thumbnail: "🧶" },
  { id: "desk2", name: "Glass Work Desk", type: "table", thumbnail: "🖥️" },
  { id: "stool2", name: "Industrial Bar Stool", type: "chair", thumbnail: "🪑" },
  { id: "cabinet2", name: "Modern Sideboard", type: "storage", thumbnail: "🗄️" },
  { id: "mirror2", name: "Frameless Mirror", type: "decor", thumbnail: "🪞" },
  { id: "clock2", name: "Minimalist Wall Clock", type: "decor", thumbnail: "⏰" },
  { id: "plant2", name: "Monstera Plant", type: "decor", thumbnail: "🪴" },
];

export function FurnitureSidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFurniture = FURNITURE_DATA.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFurnitureClick = (item: FurnitureItem) => {
    const scene = document.querySelector('canvas')?.parentElement;
    if (scene) {
      const threeScene = (scene as any).__three;
      if (threeScene) {
        createFurniture(threeScene, item.type);
      }
    }
  };

  return (
    <div className="w-80 border-r bg-background h-screen">
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search furniture..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="grid grid-cols-1 gap-2">
            {filteredFurniture.map((item) => (
              <button
                key={item.id}
                className="p-2 border rounded-lg hover:bg-accent transition-colors flex items-center gap-2 w-full text-left"
                onClick={() => handleFurnitureClick(item)}
              >
                <span className="text-2xl">{item.thumbnail}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
