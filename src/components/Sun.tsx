import { shaderMaterial, useTexture } from "@react-three/drei";
import sunImg from "../assets/sun.jpeg"
import { emissive, Material, materialOpacity, Mesh, ShaderMaterial } from "three/webgpu";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import noise from '../shaders/noise.glsl';

const sunRotationY = 0.0002; // move to constants

const Sun = () => {
    const rotationRef = useRef<Mesh | null>(null);
    const shaderRef = useRef<ShaderMaterial | null>()

    useFrame(({ clock }) => {
        if (rotationRef.current) {
            rotationRef.current.rotation.y += sunRotationY;
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

    extend({ CustomShaderMaterial })

    return (
        // do I need rotation-x={Math.PI * 0.25}?
        <mesh ref={rotationRef} rotation-y={Math.PI * 0.25}>
            <sphereGeometry args={[32, 32, 32]} />
            {/* <meshStandardMaterial {...materialProps} /> */}
            <customShaderMaterial ref={shaderRef} emissiveIntensity={5} time={0} />
        </mesh>
    )
}

export default Sun;