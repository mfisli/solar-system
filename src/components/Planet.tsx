import { Camera, ThreeEvent, useFrame, useLoader, useThree } from "@react-three/fiber";
import { RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import { BufferGeometry, Color, DoubleSide, EllipseCurve, Mesh, MeshPhongMaterial, TextureLoader, Vector3 } from "three";
import { PlanetProps } from "../constants/solarSystem";
import { MeshBasicNodeMaterial, userData } from "three/webgpu";
import { CameraContext, CameraFocus } from "../context/Camera";
import { ViewContext } from "../context/View";
import { Line, useCursor } from "@react-three/drei";


const Planet = ({ id, textureFile, bumpFile, specFile, atmosphereFile, positionX, radius, year, ring }: PlanetProps) => {
    const view = useContext(ViewContext);
    const { handleFocus } = useContext(CameraContext);
    const groupRef = useRef<Mesh | null>(null);
    const sphereRef = useRef<Mesh | null>(null);
    const materialRef = useRef<MeshPhongMaterial | null>(null);
    const atmosphereRef = useRef<Mesh | null>(null);

    useEffect(() => {
        console.log(id, view.targetId);
        if (view.targetId === id && sphereRef.current) {
            const target: CameraFocus = {
                matrixWorld: sphereRef.current?.matrixWorld,
                id,
                radiusScale
            }
            console.log("-", id, "calling")
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
            groupRef.current.rotateY(year);
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
        console.log("sphereRef.current", sphereRef.current)
        // const target: CameraFocus = {
        //     matrixWorld: event.object.matrixWorld,
        //     id,
        //     radiusScale
        // }
        const target: CameraFocus = {
            matrixWorld: sphereRef.current?.matrixWorld,
            id,
            radiusScale
        }
        // if (event.object.matrixWorld === sphereRef.current?.matrixWorld) {
        //     console.log("equal martix", event.object.matrixWorld, sphereRef.current.matrixWorld)
        // } else {
        //     console.log("diff matrix", event.object.matrixWorld, sphereRef.current.matrixWorld)
        // }
        handleFocus(target);
    }

    return (
        <>
            <Line points={curve.getSpacedPoints(200)} color="white" transparent opacity={0.05} lineWidth={1} rotation={[-Math.PI / 2, 0, 0]} />
            <object3D ref={groupRef} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
                <mesh ref={sphereRef} onClick={handleClick} castShadow receiveShadow position-x={positionXScale}>
                    <sphereGeometry args={[radiusScale, 32, 32]} />
                    <meshPhongMaterial ref={materialRef} map={texture} bumpMap={bump} bumpScale={1} specularMap={spec} shininess={0.5} />
                </mesh >
                {
                    atmosphere &&
                    <mesh ref={atmosphereRef} position-x={positionXScale} >
                        <sphereGeometry args={[radiusScale + 0.02, 32, 32]} />
                        <meshPhongMaterial map={atmosphere} transparent={true} opacity={0.1} />
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