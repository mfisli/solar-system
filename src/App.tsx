import { useEffect, useState } from 'react'
import './App.css';
import SceneInit from './SceneInit';
import SystemItem from './SystemItem';
import * as THREE from "three";
import { solarSystemList } from "./constants/solarSystem"
import { Canvas } from '@react-three/fiber'

import Rotation from './Rotation';
import { OrbitControls } from '@react-three/drei'
import Scene from './components/Scene';
import { Bloom, EffectComposer, GodRays, } from '@react-three/postprocessing';

function App() {

  // useEffect(() => {
  //   const mainScene = new SceneInit();
  //   // mainScene.initScene();
  //   // mainScene.animate();

  //   const list = solarSystemList.map(item => {
  //     // Create Planet
  //     const planet = new SystemItem(item);
  //     const mesh = planet.getMesh();
  //     const group = new THREE.Group();
  //     group.add(mesh);
  //     // Add rotation
  //     const rotation = new Rotation(mesh);
  //     const rotationMesh = rotation.getMesh();
  //     group.add(rotationMesh);
  //     return group;
  //   });

  //   list.forEach(planet => {
  //     mainScene.scene.add(planet)
  //   });

  //   const animate = () => {
  //     list.forEach((planet, index) => {
  //       planet.rotation.y += solarSystemList[index].year;
  //     });
  //     requestAnimationFrame(animate);
  //   };
  //   animate();
  // }, []);

  return (
    <main>
      <Canvas camera={{ position: [0, 50, 150], far: 200000 }}>
        <color attach='background' args={['black']} />
        <ambientLight intensity={0.09} />
        <OrbitControls enablePan={false} maxDistance={2000} minDistance={50} makeDefault />
        <Scene />
      </Canvas>
      {/* <canvas id="canvas"></canvas> */}
    </main>
  )
}

export default App
