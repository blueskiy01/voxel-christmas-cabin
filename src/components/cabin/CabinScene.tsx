import React, { useEffect, useRef, useState } from 'three';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setupCabinStructure } from './CabinStructure';
import { setupDecorations } from './CabinDecorations';
import TextureSelector from '../TextureSelector';

const CabinScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const [wallTexture, setWallTexture] = useState('/dark-parquet-512x512.png');
  const [floorTexture, setFloorTexture] = useState('/smooth-sand-128x128.png');

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x87CEEB); // Light blue sky color

    // Main ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Main directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    // Improve shadow quality
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Fill light for shadows
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Warm fireplace light
    const fireplaceLight = new THREE.PointLight(0xff6b4a, 2, 10);
    fireplaceLight.position.set(5, 2, -14);
    scene.add(fireplaceLight);

    // Window lights
    const windowLight1 = new THREE.PointLight(0x4682B4, 1, 5);
    windowLight1.position.set(-14, 4, -5);
    scene.add(windowLight1);

    const windowLight2 = new THREE.PointLight(0x4682B4, 1, 5);
    windowLight2.position.set(-14, 4, 5);
    scene.add(windowLight2);

    // Camera setup
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 30;
    const camera = new THREE.OrthographicCamera(
      frustumSize * aspect / -2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      1000
    );
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Updated from outputEncoding
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.5;
    controls.minPolarAngle = Math.PI / 4;

    // Initial setup
    setupCabinStructure(scene, { wallTexturePath: wallTexture, floorTexturePath: floorTexture });
    setupDecorations(scene);

    // Animation loop with fireplace flicker effect
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate fireplace light
      const time = Date.now() * 0.001;
      fireplaceLight.intensity = 1 + Math.sin(time * 2) * 0.2;
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
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

  // Update textures when they change
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.clear();
      setupCabinStructure(sceneRef.current, { wallTexturePath: wallTexture, floorTexturePath: floorTexture });
      setupDecorations(sceneRef.current);
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
      <div ref={mountRef} className="w-full h-screen" />
      <TextureSelector 
        onSelectWallTexture={handleWallTextureChange}
        onSelectFloorTexture={handleFloorTextureChange}
      />
    </div>
  );
};

export default CabinScene;