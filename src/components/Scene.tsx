import { useRef } from "react";
import { solarSystemList } from "../constants/solarSystem";
import Planet from "./Planet";
import Stars from "./Stars"
import Sun from "./Sun";
import { OrbitControls, OrbitControlsChangeEvent } from "@react-three/drei";
import { PointLight } from "three";

const Scene = () => {
    const lightRef = useRef<PointLight>(null);

    const handleControlChange = (event: OrbitControlsChangeEvent | undefined) => {
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
        <>
            <color attach='background' args={['black']} />
            <ambientLight intensity={0.09} />
            <pointLight ref={lightRef} position={[0, 0, 0]} intensity={5} decay={1} />
            <OrbitControls onChange={handleControlChange} enablePan={false} maxDistance={2000} minDistance={5} makeDefault target={[0, 0, 0]} />
            <Sun />
            {solarSystemList.map(item => <Planet key={item.id} {...item} />)}
            <Stars />
        </>
    )
}

export default Scene;