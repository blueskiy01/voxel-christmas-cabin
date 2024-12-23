import { Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FurnitureItem {
  id: string;
  name: string;
  type: string;
  thumbnail: string;
}

const FURNITURE_DATA: FurnitureItem[] = [
  { id: "table1", name: "Wooden Table", type: "table", thumbnail: "🪑" },
  { id: "table2", name: "Dining Table", type: "table", thumbnail: "🪑" },
  { id: "chair1", name: "Armchair", type: "chair", thumbnail: "🪑" },
  { id: "sofa1", name: "Cozy Sofa", type: "sofa", thumbnail: "🛋️" },
];

export function FurnitureSidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFurniture = FURNITURE_DATA.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sidebar className="w-64 border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Furniture & Renovation</SidebarGroupLabel>
          <SidebarGroupContent>
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
              <div className="space-y-2">
                {filteredFurniture.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 border rounded-lg cursor-move hover:bg-accent"
                    draggable="true"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.thumbnail}</span>
                      <span>{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}