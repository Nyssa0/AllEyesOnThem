'use client';
import styles from "../style/components/globe.scss";
import { Canvas, useLoader, useFrame, extend } from '@react-three/fiber';
import { TextureLoader } from 'three';
import {useEffect, useRef, useState} from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, Html, OrbitControls, Environment, ContactShadows } from '@react-three/drei'

// Convertir latitude/longitude en coordonnées 3D
function latLongToXYZ(lat, lon, radius = 1) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return [x, y, z];
}

// Ajouter un marqueur
function Marker({...props }) {
    const ref = useRef();
    const [isOccluded, setOccluded] = useState();
    const [isInRange, setInRange] = useState();
    const isVisible = isInRange && !isOccluded;
    const vec = new THREE.Vector3();

    useFrame((state) => {
        const range = state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10;
        if (range !== isInRange) setInRange(range);
    });
    return (
        <group
            ref={ref}
        >
            <Html
                transform
                occlude
                onOcclude={setOccluded}
                sprite
                distanceFactor={10}
                precision={0.1}
                style={{
                    transition: 'all 0.2s',
                    opacity: isVisible ? 1 : 0,
                    transform: `scale(${isVisible ? 1 : 0.25})`,
                }}
                {...props}
            >
            </Html>
        </group>

    );
}

function RotatingGlobe(props) {
    // Charger les textures
    const [color, normal, aoMap] = useLoader(TextureLoader, [
        './assets/color.jpg',
        './assets/normal.png',
        './assets/occlusion.jpg',
    ]);

    // Référence pour le mesh du globe
    const globeRef = useRef();
    const [rotationSpeed, setRotationSpeed] = useState(0.003); // Vitesse de rotation
    const [scale, setScale] = useState(2); // Échelle initiale
    const [isHovered, setIsHovered] = useState(false); // État hover
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 }); // Dernière position de la souris
    const dragVelocity = useRef({ x: 0, y: 0 }); // Vitesse de rotation pendant le drag
    const dragDecay = 0.95; // Amortissement de la vitesse
    const [isMarkerHovered, setIsMarkerHovered] = useState(false); // État global pour le survol des marqueurs

    // Rotation à chaque frame
    useFrame(() => {
        if (globeRef.current) {
            // Interpolation pour ralentir ou accélérer en fonction de l'état `isHovered`
            const targetSpeed = isHovered || isMarkerHovered ? 0 : 0.003; // 0 pour arrêt, 0.003 pour vitesse normale
            setRotationSpeed((speed) =>
                Math.abs(speed - targetSpeed) < 0.0001 ? targetSpeed : speed + (targetSpeed - speed) * 0.03
            );

            // Interpolation pour l'échelle
            const targetScale = isHovered || isMarkerHovered ? 2.2 : 2;
            setScale((currentScale) =>
                Math.abs(currentScale - targetScale) < 0.001
                    ? targetScale
                    : currentScale + (targetScale - currentScale) * 0.1
            );

            // Appliquer la vitesse de rotation liée au drag ou la rotation automatique
            if (!isDragging) {
                dragVelocity.current.x *= dragDecay;
                dragVelocity.current.y *= dragDecay;
            }

            globeRef.current.rotation.y += rotationSpeed + dragVelocity.current.x; // Rotation horizontale avec vitesse automatique
            globeRef.current.rotation.x += dragVelocity.current.y; // Rotation verticale

            // Limiter la rotation verticale
            globeRef.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, globeRef.current.rotation.x));

            globeRef.current.scale.set(scale, scale, scale);
        }
    });

    // Gestion des événements de souris
    const handlePointerDown = (event) => {
        setIsDragging(true);
        setLastMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handlePointerMove = (event) => {
        if (isDragging && globeRef.current) {
            const deltaX = event.clientX - lastMousePosition.x; // Différence horizontale
            const deltaY = event.clientY - lastMousePosition.y; // Différence verticale

            // Appliquer la rotation
            dragVelocity.current.x = deltaX * 0.001; // Sensibilité horizontale
            dragVelocity.current.y = deltaY * 0.001; // Sensibilité verticale

            // Limiter la rotation X pour éviter un retournement complet
            globeRef.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, globeRef.current.rotation.x));

            setLastMousePosition({ x: event.clientX, y: event.clientY });
        }
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        setIsHovered(false);
    };

    const palestineCoords = latLongToXYZ(31.9522, 35.2332, 1.01);
    const congoCoords = latLongToXYZ(-1.6585, 19.0156, 1.01);
    return (
        <group {...props} dispose={null}>
            <mesh
                ref={globeRef}
                onPointerOver={() => setIsHovered(true)}
                onPointerUp={() => setIsDragging(false)}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerOut={handlePointerUp}
                scale={0.15}
            >
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
                <Marker position={palestineCoords}>
                    <a href="#palestine" className="marker"
                         onPointerOver={() => setIsMarkerHovered(true)}
                         onPointerOut={() => setIsMarkerHovered(false)}
                    >
                    </a>
                </Marker>

                <Marker position={congoCoords}>
                    <a href="#congo" className="marker"
                         onPointerOver={() => setIsMarkerHovered(true)}
                         onPointerOut={() => setIsMarkerHovered(false)}
                    >
                    </a>
                </Marker>
            </mesh>

        </group>
    );
}

export default function Globe() {
    return (
        <Canvas>
            <ambientLight intensity={5} />
            <RotatingGlobe />
        </Canvas>
    );
}