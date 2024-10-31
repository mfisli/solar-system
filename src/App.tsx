import './App.css';
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene';
import { ViewProvider } from './context/View';
import { CameraProvider } from './context/Camera';

function App() {

  return (
    <main>
      <ViewProvider>
        <Canvas camera={{ fov: 45, position: [10, 10, 150], far: 200000 }}>
          <CameraProvider>
            <Scene />
          </CameraProvider>
        </Canvas>
      </ViewProvider>
    </main>
  )
}

export default App
