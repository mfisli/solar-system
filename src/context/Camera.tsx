import { useFrame, useThree } from "@react-three/fiber";
import { createContext, useContext, useRef, useState } from "react";
import { Camera, Matrix4, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ViewContext } from "./View";

export interface CameraFocus {
    matrixWorld: Matrix4;
    radiusScale: number;
    id: string;
}

interface CameraContextProps {
    focus: CameraFocus | null;
    handleFocus: (event: any) => void;
}

const defaultContext: CameraContextProps = {
    focus: null,
    handleFocus: () => { },
}

export const CameraContext = createContext<CameraContextProps>(defaultContext);

export const CameraProvider = ({ children }) => {
    const { camera, controls }: { camera: Camera, controls: OrbitControls } = useThree();
    const { isZoom, handleSetTarget } = useContext(ViewContext);

    const targetPosition = useRef(new Vector3(0, 0, 0));

    const [focus, setFocus] = useState<CameraFocus | null>(null);

    useFrame(() => {
        if (!focus) {
            return;
        }
        targetPosition.current = new Vector3().setFromMatrixPosition(focus.matrixWorld);
        camera.lookAt(targetPosition.current);
        if (isZoom) {
            camera.position.lerp(targetPosition.current, 0.005);
        }
        controls.minDistance = focus.radiusScale * 3;
        controls.target.copy(targetPosition.current);
        controls.update();
    });

    const handleFocus = (target: CameraFocus) => {
        setFocus(target);
        handleSetTarget(target.id);
    }

    return <CameraContext.Provider value={{ focus, handleFocus }}> {children} </CameraContext.Provider>
}