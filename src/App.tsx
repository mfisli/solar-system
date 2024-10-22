import { useEffect, useState } from 'react'
import './App.css';
import SceneInit from './SceneInit';
import Planet from './Planet';
import * as THREE from "three";

import sunImg from "./assets/sun.jpeg"
import mercuryImg from "./assets/mercury.jpeg"
import venusImg from "./assets/venus.jpeg"
import earthImg from "./assets/earth.jpeg"
import marsImg from "./assets/mars.jpeg"
import Rotation from './Rotation';

function App() {

  useEffect(() => {
    const mainScene = new SceneInit();
    mainScene.initScene();
    mainScene.animate();

    const sunGeomertry = new THREE.SphereGeometry(8);
    const sunTexture = new THREE.TextureLoader().load(sunImg);
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sunMesh = new THREE.Mesh(sunGeomertry, sunMaterial);
    const solarSystem = new THREE.Group();
    solarSystem.add(sunMesh);
    // mainScene.scene.add(solarSystem);

    // Mercury
    const mercury = new Planet(2, 16, mercuryImg);
    const mercuryMesh = mercury.getMesh();
    const mercurySystem = new THREE.Group();
    mercurySystem.add(mercuryMesh);

    // Venus
    const venus = new Planet(3, 32, venusImg);
    const venusMesh = venus.getMesh();
    const venusSystem = new THREE.Group();
    venusSystem.add(venusMesh);

    // Earth
    const earth = new Planet(4, 48, earthImg);
    const earthMesh = earth.getMesh();
    const earthSystem = new THREE.Group();
    earthSystem.add(earthMesh);

    // Mars
    const mars = new Planet(3, 64, marsImg);
    const marsMesh = mars.getMesh();
    let marsSystem = new THREE.Group();
    marsSystem.add(marsMesh);

    // Rotation
    const mercuryRotation = new Rotation(mercuryMesh);
    const mercuryRotationMesh = mercuryRotation.getMesh();
    mercurySystem.add(mercuryRotationMesh);
    const venusRotation = new Rotation(venusMesh);
    const venusRotationMesh = venusRotation.getMesh();
    venusSystem.add(venusRotationMesh);
    const earthRotation = new Rotation(earthMesh);
    const earthRotationMesh = earthRotation.getMesh();
    earthSystem.add(earthRotationMesh);
    const marsRotation = new Rotation(marsMesh);
    const marsRotationMesh = marsRotation.getMesh();
    marsSystem.add(marsRotationMesh);

    const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);
    const animate = () => {
      sunMesh.rotation.y += 0.001;
      mercurySystem.rotation.y += EARTH_YEAR * 4;
      venusSystem.rotation.y += EARTH_YEAR * 2;
      earthSystem.rotation.y += EARTH_YEAR;
      marsSystem.rotation.y += EARTH_YEAR * 0.5;
      requestAnimationFrame(animate);
    };
    animate();


    // Add items to main scene
    mainScene.scene.add(solarSystem, mercurySystem, venusSystem, earthSystem, marsSystem);
  }, []);

  return (
    <>
      <h1>Solar System</h1>
      <canvas id="canvas"></canvas>
    </>
  )
}

export default App
