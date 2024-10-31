import { useFrame, useLoader } from "@react-three/fiber";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { DoubleSide, EllipseCurve, Mesh, MeshPhongMaterial, TextureLoader } from "three";
import { PlanetProps } from "../constants/solarSystem";
import { CameraContext, CameraFocus } from "../context/Camera";
import { ViewContext } from "../context/View";
import { Line, useCursor } from "@react-three/drei";


const Planet = ({ id, textureFile, bumpFile, specFile, atmosphereFile, atmosphereThickness, positionX, radius, year, ring }: PlanetProps) => {
    const view = useContext(ViewContext);
    const { handleFocus } = useContext(CameraContext);
    const groupRef = useRef<Mesh | null>(null);
    const sphereRef = useRef<Mesh | null>(null);
    const materialRef = useRef<MeshPhongMaterial | null>(null);
    const atmosphereRef = useRef<Mesh | null>(null);

    useEffect(() => {
        if (view.targetId === id && sphereRef.current) {
            const target: CameraFocus = {
                matrixWorld: sphereRef.current?.matrixWorld,
                id,
                radiusScale
            }
            handleFocus(target);
        }
    }, [view.targetId])

    const positionXScale = useMemo(() => {
        return view.astronomicalUnit * positionX;
    }, [view.astronomicalUnit]);

    const radiusScale = useMemo(() => {
        return view.relativeRadius * radius;
    }, [view.relativeRadius]);

    const curve = useMemo(() => {
        const curve = new EllipseCurve(0, 0, positionXScale, positionXScale, 0, 2 * Math.PI);
        return curve;
    }, [positionXScale]);

    const [isHovered, setIsHovered] = useState(false);
    useCursor(isHovered);

    useFrame(() => {
        if (!curve || !groupRef.current) {
            return;
        }

        if (groupRef.current) {
            groupRef.current.rotateY(year / (positionXScale * 0.09));
        }
        // TODO: placeholder year; should be 24h relative rotation on axis
        if (sphereRef.current) {
            sphereRef.current.rotateY(year);
        }
        if (atmosphereRef.current) {
            atmosphereRef.current.rotateY(year * 0.8);
        }
    })

    const texture = useLoader(TextureLoader, textureFile);
    const bump = bumpFile ? useLoader(TextureLoader, bumpFile) : null;
    const spec = specFile ? useLoader(TextureLoader, specFile) : null;
    const atmosphere = atmosphereFile ? useLoader(TextureLoader, atmosphereFile) : null;

    const ringTexture = ring ? useLoader(TextureLoader, ring.textureFile) : null;

    const handleClick = () => {
        if (!sphereRef.current?.matrixWorld) {
            return;
        }
        handleFocus({
            matrixWorld: sphereRef.current?.matrixWorld,
            id,
            radiusScale
        });
    }

    return (
        <>
            {view.orbitLines &&
                <Line points={curve.getSpacedPoints(200)} color="white" transparent opacity={0.05} lineWidth={1} rotation={[-Math.PI / 2, 0, 0]} />
            }
            <object3D ref={groupRef} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
                <mesh ref={sphereRef} onClick={handleClick} castShadow receiveShadow position-x={positionXScale}>
                    <sphereGeometry args={[radiusScale, 32, 32]} />
                    <meshPhongMaterial ref={materialRef} map={texture} bumpMap={bump} bumpScale={15} specularMap={spec} shininess={0.5} />
                </mesh >
                {
                    atmosphere && atmosphereThickness &&
                    <mesh ref={atmosphereRef} position-x={positionXScale} >
                        <sphereGeometry args={[radiusScale * 1.02, 32, 32]} />
                        <meshPhongMaterial map={atmosphere} transparent={true} opacity={atmosphereThickness} />
                    </mesh>
                }
                {
                    ring &&
                    <mesh castShadow receiveShadow position-x={positionXScale} rotation-x={ring.rotationX} rotation-y={ring.rotationY}>
                        <ringGeometry args={[ring.innerRadius * radiusScale, ring.outerRadius * radiusScale, ring.thetaSegments]} />
                        <meshPhongMaterial map={ringTexture} side={DoubleSide} />
                    </mesh>
                }
            </object3D>
        </>
    )
}

export default Planet;