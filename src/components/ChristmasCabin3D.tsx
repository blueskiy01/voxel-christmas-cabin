import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const ChristmasCabin3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x2c3e50);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 10;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Floor (ground)
    const floorGeometry = new THREE.BoxGeometry(10, 0.2, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    scene.add(floor);

    // Cabin walls
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xA0522D });
    
    // Back wall
    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(10, 5, 0.2),
      wallMaterial
    );
    backWall.position.set(0, 2.5, -5);
    scene.add(backWall);

    // Side walls
    const leftWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 5, 10),
      wallMaterial
    );
    leftWall.position.set(-5, 2.5, 0);
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 5, 10),
      wallMaterial
    );
    rightWall.position.set(5, 2.5, 0);
    scene.add(rightWall);

    // Simple Christmas tree
    const treeGeometry = new THREE.ConeGeometry(1, 2, 8);
    const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const tree = new THREE.Mesh(treeGeometry, treeMaterial);
    tree.position.set(-3, 1, -3);
    scene.add(tree);

    // Fireplace
    const fireplaceGeometry = new THREE.BoxGeometry(2, 2, 1);
    const fireplaceMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const fireplace = new THREE.Mesh(fireplaceGeometry, fireplaceMaterial);
    fireplace.position.set(3, 1, -4.5);
    scene.add(fireplace);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (cameraRef.current) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }

      if (rendererRef.current) {
        rendererRef.current.setSize(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen" />;
};

export default ChristmasCabin3D;