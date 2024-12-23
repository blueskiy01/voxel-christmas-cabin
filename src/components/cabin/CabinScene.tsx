import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import InteractivePrompt from './InteractiveFurniture';
import { createFurniture } from './FurnitureManager';

const CabinScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  const handleFurnitureAdd = (furnitureName: string) => {
    if (sceneRef.current) {
      createFurniture(sceneRef.current, furnitureName);
    }
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    sceneRef.current = scene;

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 1, 5);
    controls.enableDamping = true;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="fixed inset-0 w-full h-full">
      </div>
      <div className="relative z-10">
        <InteractivePrompt onFurnitureAdd={handleFurnitureAdd} />
      </div>
    </div>
  );
};

export default CabinScene;