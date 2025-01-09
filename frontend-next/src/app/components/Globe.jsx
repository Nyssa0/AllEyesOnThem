'use client';
import styles from "../style/components/globe.scss";
import { Canvas, useLoader, useFrame, extend } from '@react-three/fiber';
import { TextureLoader } from 'three';
import {useEffect, useRef, useState} from 'react';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { useThree } from '@react-three/fiber';

// Étendre le renderer pour CSS2D
extend({ CSS2DRenderer });

// Convertir latitude/longitude en coordonnées 3D
function latLongToXYZ(lat, lon, radius = 1) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return [x, y, z];
}
function CSS2DRendererSetup() {
    const { gl, scene, camera } = useThree();

    useEffect(() => {
        const labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        labelRenderer.domElement.style.pointerEvents = 'none'; // Pour éviter de bloquer l'interaction avec la scène
        document.body.appendChild(labelRenderer.domElement);

        const render = () => {
            labelRenderer.render(scene, camera);
        };

        gl.setAnimationLoop(render);

        return () => {
            gl.setAnimationLoop(null);
            document.body.removeChild(labelRenderer.domElement);
        };
    }, [gl, scene, camera]);

    return null;
}

// Ajouter un marqueur CSS2D
function Marker({ position, text }) {
    const markerRef = useRef();

    useEffect(() => {
        if (!markerRef.current) return;

        const div = document.createElement('div');
        div.className = 'marker';
        div.textContent = text;
        div.style.color = 'white';
        div.style.borderRadius = '4px';
        div.style.padding = '5px';
        div.style.fontSize = '12px';

        const cssObject = new CSS2DObject(div);
        cssObject.position.set(...position);

        markerRef.current.add(cssObject);

        return () => {
            if (markerRef.current) {
                markerRef.current.remove(cssObject);
            }
        };
    }, [position, text]);

    return <group ref={markerRef}></group>;
}

function Markers({ markers, radius = 1 }) {
    return (
        <>
            {markers.map((marker, index) => {
                const [x, y, z] = latLongToXYZ(marker.lat, marker.lon, radius); // Légèrement au-dessus du globe
                return <Marker key={index} position={[x, y, z]} text={marker.label} />;
            })}
        </>
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
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 }); // Dernière position de la souris
    const dragVelocity = useRef({ x: 0, y: 0 }); // Vitesse de rotation pendant le drag
    const dragDecay = 0.95; // Amortissement de la vitesse

    // Données des markers (latitude, longitude)
    const markers = [
        { lat: 48.8566, lon: 2.3522 }, // Paris, France
        { lat: 40.7128, lon: -74.006 }, // New York, USA
        { lat: 35.6895, lon: 139.6917 }, // Tokyo, Japon
        { lat: -33.8688, lon: 151.2093 }, // Sydney, Australie
    ];

    // Rotation à chaque frame
    useFrame(() => {
        if (globeRef.current) {
            // Interpolation pour ralentir ou accélérer en fonction de l'état `isHovered`
            const targetSpeed = isHovered ? 0 : 0.003; // 0 pour arrêt, 0.003 pour vitesse normale
            setRotationSpeed((speed) =>
                Math.abs(speed - targetSpeed) < 0.0001 ? targetSpeed : speed + (targetSpeed - speed) * 0.03
            );

            // Interpolation pour l'échelle
            const targetScale = isHovered ? 2.7 : 2.5;
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

    return (
        <>
            <mesh
                ref={globeRef}
                onPointerOver={() => setIsHovered(true)}
                onPointerUp={() => setIsDragging(false)}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerOut={handlePointerUp}
            >
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
                <Markers markers={markers} radius={1} />
            </mesh>
        </>
    );
}

function CSS2DRendererWrapper() {
    const { gl, scene, camera } = useThree();
    const rendererRef = useRef();

    useEffect(() => {
        const renderer = new CSS2DRenderer();
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.pointerEvents = 'none';
        renderer.domElement.style.zIndex = '10';
        document.body.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        return () => {
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    useFrame(() => {
        if (rendererRef.current) {
            rendererRef.current.render(scene, camera);
        }
    });

    return null;
}


export default function Globe() {
    return (
        <Canvas>
            <CSS2DRendererSetup />
            <ambientLight intensity={5} />
            <RotatingGlobe />
        </Canvas>
    );
}