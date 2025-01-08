'use client';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useRef, useState } from 'react';

// Convertir latitude/longitude en coordonnées 3D
function latLongToXYZ(lat, lon, radius = 1) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return [x, y, z];
}

// Composant pour les markers
function Marker({ position }) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color="red" />
        </mesh>
    );
}


function RotatingGlobe() {
    // Charger les textures
    const [color, normal, aoMap] = useLoader(TextureLoader, [
        './assets/color.jpg',
        './assets/normal.png',
        './assets/occlusion.jpg',
    ]);

    // Référence pour le mesh du globe
    const globeRef = useRef();
    const [rotationSpeed, setRotationSpeed] = useState(0.003); // Vitesse de rotation
    const [scale, setScale] = useState(2.5); // Échelle initiale
    const [isHovered, setIsHovered] = useState(false); // État hover

    // Données des markers (latitude, longitude)
    const markers = [
        { lat: 48.8566, lon: 2.3522, name: 'Paris' }, // Paris
        { lat: 40.7128, lon: -74.006, name: 'New York' }, // New York
        { lat: 35.6895, lon: 139.6917, name: 'Tokyo' }, // Tokyo
    ];

    // Rotation à chaque frame
    useFrame(() => {
        if (globeRef.current) {
            // Interpolation pour ralentir ou accélérer en fonction de l'état `isHovered`
            const targetSpeed = isHovered ? 0 : 0.003; // 0 pour arrêt, 0.01 pour vitesse normale
            setRotationSpeed((speed) =>
                Math.abs(speed - targetSpeed) < 0.0001 ? targetSpeed : speed + (targetSpeed - speed) * 0.03
            );

            // Interpolation pour l'échelle
            const targetScale = isHovered ? 2.6 : 2.5;
            setScale((currentScale) =>
                Math.abs(currentScale - targetScale) < 0.001
                    ? targetScale
                    : currentScale + (targetScale - currentScale) * 0.1
            );

            // Appliquer les transformations
            globeRef.current.rotation.y += rotationSpeed;
            globeRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <>
            <mesh
                ref={globeRef}
                onPointerOver={() => setIsHovered(true)}
                onPointerOut={() => setIsHovered(false)}
            >
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
            </mesh>

            {markers.map((marker, index) => {
                const position = latLongToXYZ(marker.lat, marker.lon, 10.02); // Position légèrement au-dessus de la surface
                return <Marker key={index} position={position} />;
            })}
        </>
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