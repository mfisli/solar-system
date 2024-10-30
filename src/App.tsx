import { useEffect, useRef, useState } from 'react'
import './App.css';
import SceneInit from './SceneInit';
import SystemItem from './SystemItem';
import { PointLight } from "three";
import { solarSystemList } from "./constants/solarSystem"
import { Canvas } from '@react-three/fiber'

import Rotation from './Rotation';
import { OrbitControls } from '@react-three/drei'
import Scene from './components/Scene';
import { Bloom, EffectComposer, GodRays, } from '@react-three/postprocessing';
import { ScaleProvider } from './context/Scale';

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

  const lightRef = useRef<PointLight>(null);

  const handleControlChange = (event) => {
    if (!event) {
      return;
    }
    const camera = event.target.object;
    if (lightRef.current) {
      lightRef.current.position.set(0, 1, 0);
      lightRef.current.position.add(camera.position);
    }
  }

  return (
    <main>
      <ScaleProvider>
        <Canvas camera={{ fov: 45, position: [10, 10, 150], far: 200000 }}>
          <color attach='background' args={['black']} />
          <ambientLight intensity={0.09} />
          <pointLight ref={lightRef} position={[0, 0, 0]} intensity={5} decay={1} />
          <OrbitControls onChange={(e) => handleControlChange(e)} enablePan={false} maxDistance={2000} minDistance={5} makeDefault target={[0, 0, 0]} />
          <Scene />
        </Canvas>
        {/* <canvas id="canvas"></canvas> */}
      </ScaleProvider>
    </main>
  )
}

export default App
