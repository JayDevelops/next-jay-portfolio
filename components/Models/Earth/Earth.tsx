"use client"
import {Suspense} from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'
const EarthMesh = () => {
    const earthPlanet = useGLTF('/static/planet/scene.gltf')

    return (
        <primitive
            object={earthPlanet.scene}
            scale={2.5}
            position-y={0}
            rotation-y={0}
        />
    )
}
export default function Earth() {
    return (
        <Canvas
            shadows
            frameloop="demand"
            gl={{preserveDrawingBuffer: true}}
            camera={{
                fov: 45,
                near: 0.1,
                position: [-4, 3, 6]
            }}
        >
            <Suspense fallback={"Loading..."}>
                <OrbitControls
                    autoRotate
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <EarthMesh />
            </Suspense>
        </Canvas>
    )
}
