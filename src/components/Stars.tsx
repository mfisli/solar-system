// https://github.com/theshanergy/solarsystem/blob/master/components/Stars.jsx
import { useRef, useMemo, useEffect, useContext } from 'react'
import { useFrame } from '@react-three/fiber'
import { InstancedMesh, Object3D } from 'three'
import { ViewContext } from '../context/View'

const Stars = ({ count = 5000 }) => {
    const meshRef = useRef<InstancedMesh | null>(null);
    const { astronomicalUnit } = useContext(ViewContext);

    const positions = useMemo(() => {
        const positions = [];

        const minDistance = astronomicalUnit * 30;

        for (let i = 0; i < count; i++) {
            const distance = minDistance + Math.random() * 4500;
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.random() * Math.PI;

            const x = distance * Math.sin(phi) * Math.cos(theta);
            const y = distance * Math.sin(phi) * Math.sin(theta);
            const z = distance * Math.cos(phi);
            positions.push(x, y, z);
        }

        return new Float32Array(positions);
    }, [count, astronomicalUnit]);

    useEffect(() => {
        if (!meshRef.current) {
            return;
        }

        const matrix = new Object3D();

        for (let i = 0; i < count; i++) {
            matrix.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            matrix.updateMatrix();
            meshRef.current.setMatrixAt(i, matrix.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [count, positions])

    useFrame(() => {
        if (!meshRef.current) {
            return;
        }

        meshRef.current.rotation.y += 0.00004;
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.4, 0]} />
            <meshBasicMaterial attach='material' color='white' />
        </instancedMesh>
    )
}

export default Stars
