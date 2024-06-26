"use client"
import React, {useEffect, useState} from "react"
import {Canvas} from "@react-three/fiber"
import {OrbitControls, Preload, useGLTF} from "@react-three/drei"

interface MeshComputer {
    isMobile: boolean,
}

function MeshComputer({isMobile}: MeshComputer ) {
    const computer = useGLTF('/desktop_pc/scene.gltf')
    const [isMobileScale, desktopScale]: number[] = [0.65, 1.0]
    const isMobilePos: number[] = [-2.8, -0.0, -1.5]
    const desktopPos: number[] = [0.0, -1.0, -1.20]

    return(
        <mesh>
            <hemisphereLight intensity={ Math.PI / 3 } groundColor="red" />
            <pointLight intensity={2} />
            <spotLight
                position={[-20, 50, 10]}
                angle={Math.PI / 3}
                penumbra={1}
                intensity={5}
                castShadow
                shadow-mapSize={1024}
                color="white"
            />
            <primitive
                object={computer.scene}
                scale={isMobile ? isMobileScale : desktopScale}
                position={isMobile ? isMobilePos : desktopPos}
                rotation={[0.0, -0.2, -0.19]}
            />
        </mesh>
    )
}

export default function Computer() {
    const [isMobile, setIsMobile] = useState<boolean>(false)

    // If we are on mobile devices less than 500px in width, a set "IsMobile" to true.
    useEffect( () => {
        const mediaQuery = window.matchMedia('(max-width: 800px)');
        setIsMobile(mediaQuery.matches); // Dynamically changes to true or false based above

        //  Change setter to the event, and now add the event listener to the media query
        const handleMediaChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)
        mediaQuery.addEventListener('change', handleMediaChange);

        // Return the removed event listener when a new change has arisen
        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange)
        };
    }, [isMobile])

    return(
        <Canvas
            frameloop="demand"
            dpr={[1, 2]}
            shadows
            camera={ {position: [20, 3, 5], fov: 25} }
            gl={ {preserveDrawingBuffer: true} }
        >
            {/*<Suspense fallback={<CanvasLoader />} >*/}
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <MeshComputer isMobile={isMobile}/>
            {/*</Suspense>*/}
            <Preload all/>
        </Canvas>
    )
}

