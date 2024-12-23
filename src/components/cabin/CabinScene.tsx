import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setupCabinStructure } from './CabinStructure';
import { setupDecorations } from './CabinDecorations';

const CabinScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2c3e50);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffd700, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Warm fireplace light
    const fireplaceLight = new THREE.PointLight(0xff6b4a, 1, 10);
    fireplaceLight.position.set(5, 2, -14);
    scene.add(fireplaceLight);

    // Window lights
    const windowLight1 = new THREE.PointLight(0x4682B4, 0.5, 5);
    windowLight1.position.set(-14, 4, -5);
    scene.add(windowLight1);

    const windowLight2 = new THREE.PointLight(0x4682B4, 0.5, 5);
    windowLight2.position.set(-14, 4, 5);
    scene.add(windowLight2);

    // Orthographic camera setup
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
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.5; // Limit rotation
    controls.minPolarAngle = Math.PI / 4;   // Limit rotation

    // Add cabin structure and decorations
    setupCabinStructure(scene);
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

  return <div ref={mountRef} className="w-full h-screen" />;
};

export default CabinScene;