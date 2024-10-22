import { useEffect, useState } from 'react'
import './App.css';
import SceneInit from './SceneInit';
import SystemItem from './SystemItem';
import * as THREE from "three";
import { solarSystemList } from "./constants/solarSystem"
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

    const list = solarSystemList.map(item => {
      // Create Planet
      const planet = new SystemItem(item);
      const mesh = planet.getMesh();
      const group = new THREE.Group();
      group.add(mesh);
      // Add rotation
      const rotation = new Rotation(mesh);
      const rotationMesh = rotation.getMesh();
      group.add(rotationMesh);
      return group;
    });

    list.forEach(planet => {
      mainScene.scene.add(planet)
    });

    const animate = () => {
      list.forEach((planet, index) => {
        planet.rotation.y += solarSystemList[index].rotation;
      });
      requestAnimationFrame(animate);
    };
    animate();

  }, []);

  return (
    <main>
      <canvas id="canvas"></canvas>
    </main>
  )
}

export default App
