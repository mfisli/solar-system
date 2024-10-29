import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { createContext, useContext, useRef, useState } from "react";
import { Camera, Matrix4, Object3D, Object3DEventMap, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface CameraContextProps {
    focus: Object3D<Object3DEventMap> | null;
    handleFocus: (event: any) => void;
}

const defaultContext: CameraContextProps = {
    focus: null,
    handleFocus: () => { },
}

export const CameraContext = createContext<CameraContextProps>(defaultContext);

// export const useCamera = useContext(CameraContext);

export const CameraProvider = ({ children }) => {
    const { camera, controls }: { camera: Camera, controls: OrbitControls } = useThree();

    const targetPosition = useRef(new Vector3(0, 0, 0));
    console.log("controls", controls)

    const [focus, setFocus] = useState<Object3D<Object3DEventMap> | null>(null);

    useFrame(() => {
        if (!focus) {
            return;
        }
        targetPosition.current = new Vector3().setFromMatrixPosition(focus.matrixWorld);
        camera.lookAt(targetPosition.current);
        // camera.position.lerp(targetPosition.current, 0.05);
        controls.minDistance = focus.userData.radius + 10;
        controls.target.copy(targetPosition.current);
        controls.update();
    });

    const handleFocus = (event: ThreeEvent<MouseEvent>) => {
        setFocus(event.object);
    }

    return <CameraContext.Provider value={{ focus, handleFocus }}> {children} </CameraContext.Provider>
}