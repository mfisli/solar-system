import { shaderMaterial, useTexture } from "@react-three/drei";
import sunImg from "../assets/sun.jpeg"
import { emissive, Material, materialOpacity, Mesh, ShaderMaterial, SphereGeometry } from "three/webgpu";
import { extend, ThreeEvent, useFrame } from "@react-three/fiber";
import { useContext, useRef, useState } from "react";
import noise from '../shaders/noise.glsl';
import { Bloom, EffectComposer, GodRays } from "@react-three/postprocessing";
import { CameraContext } from "../context/Camera";
import { Text } from '@react-three/drei'

const sunRotationY = 0.0002; // move to constants

const Sun = () => {
    const [sunRef, sunRefCurrent] = useState<Mesh | null>(null);
    const shaderRef = useRef<ShaderMaterial | null>(null);


    const { handleFocus } = useContext(CameraContext)

    useFrame(({ clock }) => {
        if (sunRef) {
            sunRef.rotation.y += sunRotationY;
        }
        if (shaderRef.current) {
            shaderRef.current.uniforms.time.value = clock.elapsedTime * 0.4;
        }
    })

    const materialProps = useTexture({
        map: sunImg
    });

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

    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.object.userData = { id: 'sun', radius: 32 };
        handleFocus(event);
    }

    return (
        // do I need rotation-x={Math.PI * 0.25}?
        <mesh ref={sunRefCurrent} rotation-y={Math.PI * 0.25} onClick={handleClick}>
            <sphereGeometry args={[32, 32, 32]} />
            <customShaderMaterial ref={shaderRef} emissiveIntensity={5} time={0} />
            <pointLight position={[0, 0, 0]} intensity={95000} color={'rgb(255, 207, 55)'} />
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
        </mesh>
    )
}

export default Sun;