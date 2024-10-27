import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, DoubleSide, Mesh, MeshPhongMaterial, TextureLoader } from "three";
import { PlanetProps } from "../constants/solarSystem";
import { MeshBasicNodeMaterial } from "three/webgpu";

const Planet = ({ textureFile, positionX, radius, year, ring }: PlanetProps) => {
    const groupRef = useRef<Mesh | null>(null);
    const sphereRef = useRef<Mesh | null>(null);

    useFrame(() => {
        if (groupRef.current) {
            // FIXME: placeholder year; should be 24h relative
            groupRef.current.rotateY(year);
        }
        if (sphereRef.current) {
            // FIXME: placeholder year; should be 24h relative
            sphereRef.current.rotateY(year);
        }
    })

    const texture = useLoader(TextureLoader, textureFile);
    const ringTexture = ring ? useLoader(TextureLoader, ring.textureFile) : null;

    return (
        <object3D ref={groupRef} >
            <mesh ref={sphereRef} castShadow receiveShadow position-x={positionX}>
                <sphereGeometry args={[radius, 32, 32]} />
                <meshPhongMaterial map={texture} />
            </mesh>
            {ring &&
                <mesh castShadow receiveShadow position-x={positionX} rotation-x={ring.rotationX} rotation-y={ring.rotationY}>
                    <ringGeometry args={[ring.innerRadius, ring.outerRadius, ring.thetaSegments]} />
                    <meshPhongMaterial map={ringTexture} side={DoubleSide} />
                </mesh>
            }
        </object3D>
    )
}

export default Planet;