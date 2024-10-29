import { Hud, PerspectiveCamera } from "@react-three/drei";
import { solarSystemList } from "../constants/solarSystem";
import { CameraProvider } from "../context/Camera";
import Planet from "./Planet";
import Stars from "./Stars"
import Sun from "./Sun";
import { Camera } from "three";
import { useThree } from "@react-three/fiber";

const Scene = () => {
    const { camera }: { camera: Camera } = useThree();

    return (
        <CameraProvider>
            <Sun />
            {solarSystemList.map(item => <Planet key={item.id} {...item} />)}
            <Stars />
        </CameraProvider>
    )
}

export default Scene;