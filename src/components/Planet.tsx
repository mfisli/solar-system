import { Camera, ThreeEvent, useFrame, useLoader, useThree } from "@react-three/fiber";
import { RefObject, useContext, useMemo, useRef, useState } from "react";
import { BufferGeometry, Color, DoubleSide, EllipseCurve, Mesh, MeshPhongMaterial, TextureLoader, Vector3 } from "three";
import { PlanetProps } from "../constants/solarSystem";
import { MeshBasicNodeMaterial } from "three/webgpu";
import { CameraContext } from "../context/Camera";
import { ScaleContext } from "../context/Scale";
import { Line, useCursor } from "@react-three/drei";


const Planet = ({ id, textureFile, bumpFile, specFile, atmosphereFile, positionX, radius, year, ring }: PlanetProps) => {
    const scale = useContext(ScaleContext);

    const groupRef = useRef<Mesh | null>(null);
    const sphereRef = useRef<Mesh | null>(null);
    const materialRef = useRef<MeshPhongMaterial | null>(null);
    const atmosphereRef = useRef<Mesh | null>(null);
    const orbitRef = useRef();

    const positionXScale = useMemo(() => {
        console.log(id, scale * positionX)
        return scale * positionX;
    }, [scale])

    const curve = useMemo(() => {
        const curve = new EllipseCurve(0, 0, positionXScale, positionXScale, 0, 2 * Math.PI);
        return curve;
    }, [positionXScale]);

    const { camera }: { camera: Camera } = useThree();

    const { handleFocus } = useContext(CameraContext);
    const [isHovered, setIsHovered] = useState(false);
    useCursor(isHovered);

    const orbitSpeed = 0.00001;

    useFrame(({ clock }) => {
        if (!curve || !groupRef.current) {
            return;
        }
        // const geo = new BufferGeometry().setFromPoints(curve.getSpacedPoints(200));
        // geo.rotateX(-Math.PI/2);
        // const time = orbitSpeed * clock.elapsedTime;
        // const travel = (time % year) / year;
        // let points = geo.getPoint(travel);
        // groupRef.current.position.x = points.x;
        // groupRef.current.position.y = points.y;

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
        event.object.userData = { id, radius };
        handleFocus(event);
    }
    //  rotateX={-Math.PI/2}  rotation={[-Math.PI / 2, 0, 0]}
    return (
        <>
            <Line points={curve.getSpacedPoints(200)} color="white" transparent opacity={0.05} lineWidth={1} rotation={[-Math.PI / 2, 0, 0]} />
            {/* <line ref={orbitRef} >
                <bufferGeometry setFromPoints={curve.getSpacedPoints(200)} />
                <lineBasicMaterial color="pink" linewidth={1} />
            </line> */}
            <object3D ref={groupRef} onClick={handleClick} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
                <mesh ref={sphereRef} castShadow receiveShadow position-x={positionXScale}>
                    <sphereGeometry args={[radius, 32, 32]} />
                    <meshPhongMaterial ref={materialRef} map={texture} bumpMap={bump} bumpScale={1} specularMap={spec} shininess={0.5} />
                </mesh >
                {
                    atmosphere &&
                    <mesh ref={atmosphereRef} position-x={positionXScale} >
                        <sphereGeometry args={[radius + 0.1, 32, 32]} />
                        <meshPhongMaterial map={atmosphere} transparent={true} opacity={0.1} />
                    </mesh>
                }
                {
                    ring &&
                    <mesh castShadow receiveShadow position-x={positionXScale} rotation-x={ring.rotationX} rotation-y={ring.rotationY}>
                        <ringGeometry args={[ring.innerRadius, ring.outerRadius, ring.thetaSegments]} />
                        <meshPhongMaterial map={ringTexture} side={DoubleSide} />
                    </mesh>
                }
            </object3D>
        </>
    )
}

export default Planet;