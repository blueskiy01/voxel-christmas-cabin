import * as THREE from 'three';
import { createLogMaterial } from '../materials/CabinMaterials';

export const createWalls = (scene: THREE.Scene) => {
  const logMaterial = createLogMaterial();

  // Left wall with cutout
  const leftWallShape = new THREE.Shape();
  leftWallShape.moveTo(-15, 0);
  leftWallShape.lineTo(15, 0);
  leftWallShape.lineTo(15, 8);
  leftWallShape.lineTo(-15, 8);
  leftWallShape.lineTo(-15, 0);

  // Create cutout hole
  const leftHole1 = new THREE.Path();
  leftHole1.moveTo(-8, 2);
  leftHole1.lineTo(-2, 2);
  leftHole1.lineTo(-2, 6);
  leftHole1.lineTo(-8, 6);
  leftWallShape.holes.push(leftHole1);

  const leftWallGeometry = new THREE.ShapeGeometry(leftWallShape);
  leftWallGeometry.computeBoundingBox();
  const { min, max } = leftWallGeometry.boundingBox!;
  const range = max.clone().sub(min);
  const uvs = leftWallGeometry.attributes.uv;
  for (let i = 0; i < uvs.count; i++) {
    const u = (leftWallGeometry.attributes.position.getY(i) - min.y) / range.y;
    const v = (leftWallGeometry.attributes.position.getX(i) - min.x) / range.x;
    uvs.setXY(i, u, v);
  }

  const leftWall = new THREE.Mesh(leftWallGeometry, logMaterial);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-15, 0, 0);
  scene.add(leftWall);

  // Right wall
  const rightWall = new THREE.Mesh(leftWallGeometry, logMaterial);
  rightWall.position.set(15, 0, 0);
  rightWall.rotation.y = -Math.PI / 2;
  scene.add(rightWall);

  // Back wall
  const backWallShape = new THREE.Shape();
  backWallShape.moveTo(-15, 0);
  backWallShape.lineTo(15, 0);
  backWallShape.lineTo(15, 8);
  backWallShape.lineTo(-15, 8);
  backWallShape.lineTo(-15, 0);

  const backWallGeometry = new THREE.ShapeGeometry(backWallShape);
  backWallGeometry.computeBoundingBox();
  const backMin = backWallGeometry.boundingBox!.min;
  const backMax = backWallGeometry.boundingBox!.max;
  const backRange = backMax.clone().sub(backMin);
  const backUVs = backWallGeometry.attributes.uv;
  for (let i = 0; i < backUVs.count; i++) {
    const u = (backWallGeometry.attributes.position.getY(i) - backMin.y) / backRange.y;
    const v = (backWallGeometry.attributes.position.getX(i) - backMin.x) / backRange.x;
    backUVs.setXY(i, u, v);
  }

  const backWall = new THREE.Mesh(backWallGeometry, logMaterial);
  backWall.position.set(0, 0, -15);
  scene.add(backWall);

  return logMaterial;
};