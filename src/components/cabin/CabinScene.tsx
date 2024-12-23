import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setupCabinStructure } from './CabinStructure';
import { setupDecorations } from './CabinDecorations';
import { setupLighting } from './SceneLighting';
import { setupCamera } from './SceneCamera';
import { setupRenderer } from './SceneRenderer';
import TextureSelector from '../TextureSelector';

const CabinScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const [wallTexture, setWallTexture] = useState('/dark-parquet-512x512.png');
  const [floorTexture, setFloorTexture] = useState('/smooth-sand-128x128.png');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x87CEEB);

    const { fireplaceLight } = setupLighting(scene);
    const camera = setupCamera();
    const renderer = setupRenderer();
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.5;
    controls.minPolarAngle = Math.PI / 4;

    const initScene = async () => {
      try {
        await setupCabinStructure(scene, { 
          wallTexturePath: wallTexture, 
          floorTexturePath: floorTexture 
        });
        setupDecorations(scene);
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing scene:', error);
        setIsLoading(false);
      }
    };

    initScene();

    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      fireplaceLight.intensity = 2 + Math.sin(time * 2) * 0.3;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      const frustumSize = 30;
      
      camera.left = frustumSize * aspect / -2;
      camera.right = frustumSize * aspect / 2;
      camera.top = frustumSize / 2;
      camera.bottom = frustumSize / -2;
      
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.clear();
      setupCabinStructure(sceneRef.current, { 
        wallTexturePath: wallTexture, 
        floorTexturePath: floorTexture 
      }).then(() => {
        setupDecorations(sceneRef.current!);
      });
    }
  }, [wallTexture, floorTexture]);

  const handleWallTextureChange = (texture: string) => {
    setWallTexture(texture);
  };

  const handleFloorTextureChange = (texture: string) => {
    setFloorTexture(texture);
  };

  return (
    <div className="relative w-full h-screen">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
          Loading...
        </div>
      )}
      <div ref={mountRef} className="w-full h-screen" />
      <TextureSelector 
        onSelectWallTexture={handleWallTextureChange}
        onSelectFloorTexture={handleFloorTextureChange}
      />
    </div>
  );
};

export default CabinScene;