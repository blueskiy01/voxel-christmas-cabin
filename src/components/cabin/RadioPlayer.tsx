import React, { useState, useRef } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const RADIO_STATIONS = [
  {
    id: "christmas-classics",
    name: "Christmas Classics",
    url: "https://streaming.live365.com/b05055_128mp3"
  },
  {
    id: "holiday-hits",
    name: "Holiday Hits",
    url: "https://streaming.live365.com/b91275_128mp3"
  },
  {
    id: "christmas-jazz",
    name: "Christmas Jazz",
    url: "https://streaming.live365.com/b13695_128mp3"
  }
];

const RadioPlayer = () => {
  const [selectedStation, setSelectedStation] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleStationChange = (value: string) => {
    setSelectedStation(value);
    const station = RADIO_STATIONS.find(s => s.id === value);
    
    if (station && audioRef.current) {
      audioRef.current.src = station.url;
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          toast({
            title: "Playback Error",
            description: "Unable to play this station. Please try again.",
            variant: "destructive"
          });
        });
      }
    }
  };

  const togglePlay = () => {
    if (!selectedStation) {
      toast({
        title: "No Station Selected",
        description: "Please select a radio station first.",
        variant: "destructive"
      });
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          toast({
            title: "Playback Error",
            description: "Unable to play this station. Please try again.",
            variant: "destructive"
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="absolute left-[-8] top-[2] w-[6] h-[4] bg-black/80 rounded-lg p-4 flex flex-col justify-between">
      <audio ref={audioRef} />
      
      <RadioGroup value={selectedStation} onValueChange={handleStationChange} className="gap-2">
        {RADIO_STATIONS.map((station) => (
          <div key={station.id} className="flex items-center space-x-2">
            <RadioGroupItem value={station.id} id={station.id} />
            <label htmlFor={station.id} className="text-white text-sm cursor-pointer">
              {station.name}
            </label>
          </div>
        ))}
      </RadioGroup>

      <Button 
        onClick={togglePlay} 
        variant="outline" 
        size="sm"
        className="mt-2 w-full bg-white/10 hover:bg-white/20 text-white"
      >
        {isPlaying ? <VolumeX className="mr-2" /> : <Volume2 className="mr-2" />}
        {isPlaying ? "Stop" : "Play"}
      </Button>
    </div>
  );
};

export default RadioPlayer;