import React, { useState, useRef, useEffect } from 'react';
import { RadioBrowserApi } from 'radio-browser-api';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from '@tanstack/react-query';

interface Station {
  id: string;
  name: string;
  url: string;
}

const RadioPlayer = () => {
  const [selectedStation, setSelectedStation] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const { data: stations, isLoading } = useQuery({
    queryKey: ['radio-stations'],
    queryFn: async () => {
      const api = new RadioBrowserApi('Christmas Cabin Radio');
      const stations = await api.searchStations({
        tag: 'christmas',
        limit: 5,
        codec: 'MP3'
      });
      return stations.map(station => ({
        id: station.id,
        name: station.name,
        url: station.urlResolved
      }));
    }
  });

  const handleStationChange = (value: string) => {
    setSelectedStation(value);
    const station = stations?.find(s => s.id === value);
    
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
      
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-white" />
        </div>
      ) : (
        <RadioGroup value={selectedStation} onValueChange={handleStationChange} className="gap-2">
          {stations?.map((station) => (
            <div key={station.id} className="flex items-center space-x-2">
              <RadioGroupItem value={station.id} id={station.id} />
              <label htmlFor={station.id} className="text-white text-sm cursor-pointer">
                {station.name}
              </label>
            </div>
          ))}
        </RadioGroup>
      )}

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