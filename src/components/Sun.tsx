import { shaderMaterial } from "@react-three/drei";
import { Mesh, ShaderMaterial } from "three/webgpu";
import { extend, useFrame } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from "react";
// @ts-ignore: file not found
import noise from '../shaders/noise.glsl';
import { Bloom, EffectComposer, GodRays } from "@react-three/postprocessing";
import { CameraContext, CameraFocus } from "../context/Camera";
import { earthRadius } from "../constants/solarSystem";
import { ViewContext } from "../context/View";
import TextLabel from "./TextLabel";

// move to constants
const sunRotationY = 0.0002;
const radiusScale = earthRadius * 109;
export const id = 'sun';

const Sun = () => {
    const [sunRef, sunRefCurrent] = useState<Mesh | null>(null);
    const shaderRef = useRef<ShaderMaterial | null>(null);
    const view = useContext(ViewContext);
    const { handleFocus } = useContext(CameraContext);

    useEffect(() => {
        if (view.targetId === id && sunRef) {
            const target: CameraFocus = {
                matrixWorld: sunRef?.matrixWorld,
                id,
                radiusScale
            }
            handleFocus(target);
        }
    }, [view.targetId])

    useFrame(({ clock }) => {
        if (sunRef) {
            sunRef.rotation.y += sunRotationY;
        }
        if (shaderRef.current) {
            shaderRef.current.uniforms.time.value = clock.elapsedTime * 0.4;
        }
    })

    // https://github.com/theshanergy/solarsystem/blob/master/components/Sun.jsx
    const CustomShaderMaterial = shaderMaterial(
        { emissiveIntensity: 1.0, time: 0 },
        // Vertex Shader
        `
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
        // Fragment Shader
        `
        uniform float time;
        uniform float emissiveIntensity;
        varying vec2 vUv;
        varying vec3 vPosition;

        ${noise}

        void main() {
            float noiseValue = noise(vPosition + time);

            vec3 color = mix(vec3(1.0, 0.1, 0.0), vec3(1.0, 0.2, 0.0), noiseValue);
            float intensity = (noiseValue * 0.5 + 0.5) * emissiveIntensity;

            gl_FragColor = vec4(color * intensity, 1.0);
        }
        `
    )

    extend({ CustomShaderMaterial });

    const handleClick = () => {
        if (!sunRef) {
            return;
        }
        const target: CameraFocus = {
            matrixWorld: sunRef?.matrixWorld,
            id,
            radiusScale
        }
        handleFocus(target);
    }

    return (
        <mesh ref={sunRefCurrent} rotation-y={Math.PI * 0.25} onClick={handleClick}>
            <sphereGeometry args={[radiusScale, 32, 32]} />
            {/* @ts-ignore: type */}
            <customShaderMaterial ref={shaderRef} emissiveIntensity={5} time={0} />
            <pointLight position={[0, 0, 0]} intensity={9500} color={'rgb(255, 207, 55)'} />
            {sunRef &&
                <EffectComposer>
                    <GodRays
                        sun={sunRef}
                        samples={30}
                        density={0.97}
                        decay={0.96}
                        weight={0.6}
                        exposure={0.008}
                        clampMax={1}
                        blur={true}
                    />
                    <Bloom luminanceThreshold={0.1} luminanceSmoothing={1} height={300} />
                </EffectComposer>
            }
            <TextLabel>
                {id}
            </TextLabel>
        </mesh>
    )
}

export default Sun;