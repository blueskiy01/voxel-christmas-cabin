import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CabinScene = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Add lighting
    const light = new THREE.PointLight(0xffa500, 1, 100);
    light.position.set(5, 10, 5);
    scene.add(light);

    // Add floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Add a Christmas tree (cone + cylinder)
    const treeGeometry = new THREE.ConeGeometry(1, 3, 8);
    const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
    const tree = new THREE.Mesh(treeGeometry, treeMaterial);
    tree.position.y = 1.5;
    scene.add(tree);

    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 16);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 0.5;
    scene.add(trunk);

    // Add snowflakes
    for (let i = 0; i < 100; i++) {
      const snowflakeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const snowflakeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const snowflake = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial);

      snowflake.position.set(
        (Math.random() - 0.5) * 20,
        Math.random() * 10,
        (Math.random() - 0.5) * 20
      );

      scene.add(snowflake);
    }

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
};

const ChristmasCabin3D = () => {
  return (
    <div className="w-full h-screen">
      <CabinScene />
    </div>
  );
};

export default ChristmasCabin3D;
