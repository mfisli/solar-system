import { ThreeEvent, useFrame, useLoader } from "@react-three/fiber";
import { useContext, useMemo, useRef, useState } from "react";
import { Color, DoubleSide, Mesh, MeshPhongMaterial, TextureLoader } from "three";
import { PlanetProps } from "../constants/solarSystem";
import { MeshBasicNodeMaterial } from "three/webgpu";
import { CameraContext } from "../context/Camera";
import { useCursor } from "@react-three/drei";

const Planet = ({ id, textureFile, bumpFile, specFile, atmosphereFile, positionX, radius, year, ring }: PlanetProps) => {
    const groupRef = useRef<Mesh | null>(null);
    const sphereRef = useRef<Mesh | null>(null);
    const materialRef = useRef<MeshPhongMaterial | null>(null);
    const atmosphereRef = useRef<Mesh | null>(null);

    const { handleFocus } = useContext(CameraContext);
    const [isHovered, setIsHovered] = useState(false);
    useCursor(isHovered);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotateY(year);
            // groupRef.current.userData = { key: id }
            // console.log("userData", groupRef.current.userData)
        }
        if (sphereRef.current) {
            // FIXME: placeholder year; should be 24h relative
            sphereRef.current.rotateY(year);
        }
        if (atmosphereRef.current) {
            // FIXME: placeholder year; should be 24h relative
            atmosphereRef.current.rotateY(year * 0.8);
        }
    })

    const texture = useLoader(TextureLoader, textureFile);
    const bump = bumpFile ? useLoader(TextureLoader, bumpFile) : null;
    const spec = specFile ? useLoader(TextureLoader, specFile) : null;
    const atmosphere = atmosphereFile ? useLoader(TextureLoader, atmosphereFile) : null;

    const ringTexture = ring ? useLoader(TextureLoader, ring.textureFile) : null;

    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.object.userData = { id };
        handleFocus(event);
    }

    return (
        <object3D ref={groupRef} onClick={handleClick} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
            <mesh ref={sphereRef} castShadow receiveShadow position-x={positionX}>
                <sphereGeometry args={[radius, 32, 32]} />
                <meshPhongMaterial ref={materialRef} map={texture} bumpMap={bump} bumpScale={1} specularMap={spec} shininess={0.5} />
            </mesh >
            {
                atmosphere &&
                <mesh ref={atmosphereRef} position-x={positionX} >
                    <sphereGeometry args={[radius + 0.1, 32, 32]} />
                    <meshPhongMaterial map={atmosphere} transparent={true} opacity={0.1} />
                </mesh>
            }
            {
                ring &&
                <mesh castShadow receiveShadow position-x={positionX} rotation-x={ring.rotationX} rotation-y={ring.rotationY}>
                    <ringGeometry args={[ring.innerRadius, ring.outerRadius, ring.thetaSegments]} />
                    <meshPhongMaterial map={ringTexture} side={DoubleSide} />
                </mesh>
            }
        </object3D >
    )
}

export default Planet;