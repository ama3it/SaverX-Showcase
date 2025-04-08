import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ShoppingMall component
const ShoppingMall: React.FC = () => {
    // Constants for the building dimensions
    const FLOOR_WIDTH = 50;
    const FLOOR_LENGTH = 70;
    const FLOOR_HEIGHT = 4;
    const FLOOR_COUNT = 5;
    const COLUMN_RADIUS = 0.5;
    const COLUMN_HEIGHT = FLOOR_HEIGHT * FLOOR_COUNT;
    const COLUMN_SEGMENTS = 16;

    // Function to create columns at corners and middle areas
    const createColumns = () => {
        const columns = [];
        const columnPositions = [
            // Corner columns
            { x: -FLOOR_WIDTH / 2 + 2, z: -FLOOR_LENGTH / 2 + 2 },
            { x: FLOOR_WIDTH / 2 - 2, z: -FLOOR_LENGTH / 2 + 2 },
            { x: -FLOOR_WIDTH / 2 + 2, z: FLOOR_LENGTH / 2 - 2 },
            { x: FLOOR_WIDTH / 2 - 2, z: FLOOR_LENGTH / 2 - 2 },

            // Middle columns along the length
            { x: -FLOOR_WIDTH / 4, z: -FLOOR_LENGTH / 2 + 2 },
            { x: 0, z: -FLOOR_LENGTH / 2 + 2 },
            { x: FLOOR_WIDTH / 4, z: -FLOOR_LENGTH / 2 + 2 },
            { x: -FLOOR_WIDTH / 4, z: FLOOR_LENGTH / 2 - 2 },
            { x: 0, z: FLOOR_LENGTH / 2 - 2 },
            { x: FLOOR_WIDTH / 4, z: FLOOR_LENGTH / 2 - 2 },

            // Middle columns along the width
            { x: -FLOOR_WIDTH / 2 + 2, z: -FLOOR_LENGTH / 4 },
            { x: -FLOOR_WIDTH / 2 + 2, z: 0 },
            { x: -FLOOR_WIDTH / 2 + 2, z: FLOOR_LENGTH / 4 },
            { x: FLOOR_WIDTH / 2 - 2, z: -FLOOR_LENGTH / 4 },
            { x: FLOOR_WIDTH / 2 - 2, z: 0 },
            { x: FLOOR_WIDTH / 2 - 2, z: FLOOR_LENGTH / 4 },

            // Interior columns in a grid pattern
            { x: -FLOOR_WIDTH / 4, z: -FLOOR_LENGTH / 4 },
            { x: -FLOOR_WIDTH / 4, z: 0 },
            { x: -FLOOR_WIDTH / 4, z: FLOOR_LENGTH / 4 },
            { x: 0, z: -FLOOR_LENGTH / 4 },
            { x: 0, z: 0 },
            { x: 0, z: FLOOR_LENGTH / 4 },
            { x: FLOOR_WIDTH / 4, z: -FLOOR_LENGTH / 4 },
            { x: FLOOR_WIDTH / 4, z: 0 },
            { x: FLOOR_WIDTH / 4, z: FLOOR_LENGTH / 4 },
        ];

        columnPositions.forEach((pos, index) => {
            columns.push(
                <mesh
                    key={`column-${index}`}
                    position={[pos.x, COLUMN_HEIGHT / 2 - FLOOR_HEIGHT / 2, pos.z]}
                >
                    <cylinderGeometry args={[COLUMN_RADIUS, COLUMN_RADIUS, COLUMN_HEIGHT, COLUMN_SEGMENTS]} />
                    <meshStandardMaterial color="#dddddd" />
                </mesh>
            );
        });

        return columns;
    };

    // Function to create floors
    const createFloors = () => {
        const floors = [];

        for (let i = 0; i < FLOOR_COUNT; i++) {
            // Calculate the position of each floor
            const yPosition = i * FLOOR_HEIGHT;

            floors.push(
                <group key={`floor-${i}`}>
                    {/* Main floor slab */}
                    <mesh position={[0, yPosition, 0]} receiveShadow>
                        <boxGeometry args={[FLOOR_WIDTH, 0.2, FLOOR_LENGTH]} />
                        <meshStandardMaterial color="#f0f0f0" />
                    </mesh>

                    {/* Glass railings for upper floors */}
                    {i > 0 && (
                        <>
                            {/* Front glass railing */}
                            <mesh position={[0, yPosition + 1, FLOOR_LENGTH / 2 - 1]}>
                                <boxGeometry args={[FLOOR_WIDTH - 4, 1.5, 0.1]} />
                                <meshStandardMaterial transparent opacity={0.3} color="#a7c5eb" />
                            </mesh>

                            {/* Back glass railing */}
                            <mesh position={[0, yPosition + 1, -FLOOR_LENGTH / 2 + 1]}>
                                <boxGeometry args={[FLOOR_WIDTH - 4, 1.5, 0.1]} />
                                <meshStandardMaterial transparent opacity={0.3} color="#a7c5eb" />
                            </mesh>

                            {/* Left glass railing */}
                            <mesh position={[-FLOOR_WIDTH / 2 + 1, yPosition + 1, 0]}>
                                <boxGeometry args={[0.1, 1.5, FLOOR_LENGTH - 4]} />
                                <meshStandardMaterial transparent opacity={0.3} color="#a7c5eb" />
                            </mesh>

                            {/* Right glass railing */}
                            <mesh position={[FLOOR_WIDTH / 2 - 1, yPosition + 1, 0]}>
                                <boxGeometry args={[0.1, 1.5, FLOOR_LENGTH - 4]} />
                                <meshStandardMaterial transparent opacity={0.3} color="#a7c5eb" />
                            </mesh>
                        </>
                    )}

                    {/* Central opening for escalators/stairs */}
                    <mesh position={[0, yPosition + 0.11, 0]}>
                        <boxGeometry args={[FLOOR_WIDTH / 3, 0.22, FLOOR_LENGTH / 3]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>

                    {/* Escalators connecting floors */}
                    {i < FLOOR_COUNT - 1 && (
                        <>
                            <mesh
                                position={[FLOOR_WIDTH / 8, yPosition + FLOOR_HEIGHT / 2, 0]}
                                rotation={[0, 0, Math.PI / 8]}
                            >
                                <boxGeometry args={[FLOOR_HEIGHT * 1.5, 0.1, 3]} />
                                <meshStandardMaterial color="#333333" />
                            </mesh>

                            <mesh
                                position={[-FLOOR_WIDTH / 8, yPosition + FLOOR_HEIGHT / 2, 0]}
                                rotation={[0, 0, -Math.PI / 8]}
                            >
                                <boxGeometry args={[FLOOR_HEIGHT * 1.5, 0.1, 3]} />
                                <meshStandardMaterial color="#333333" />
                            </mesh>
                        </>
                    )}
                </group>
            );
        }

        return floors;
    };

    // Function to create glass exterior walls
    const createGlassWalls = () => {
        const wallHeight = FLOOR_COUNT * FLOOR_HEIGHT;

        return (
            <group>
                {/* Front glass wall */}
                <mesh position={[0, wallHeight / 2, FLOOR_LENGTH / 2]} receiveShadow castShadow>
                    <boxGeometry args={[FLOOR_WIDTH, wallHeight, 0.1]} />
                    <meshPhysicalMaterial
                        color="#a7c5eb"
                        transparent
                        opacity={0.2}
                        roughness={0}
                        metalness={0.1}
                        transmission={0.95}
                    />
                </mesh>

                {/* Back glass wall */}
                <mesh position={[0, wallHeight / 2, -FLOOR_LENGTH / 2]} receiveShadow castShadow>
                    <boxGeometry args={[FLOOR_WIDTH, wallHeight, 0.1]} />
                    <meshPhysicalMaterial
                        color="#a7c5eb"
                        transparent
                        opacity={0.2}
                        roughness={0}
                        metalness={0.1}
                        transmission={0.95}
                    />
                </mesh>

                {/* Left glass wall */}
                <mesh position={[-FLOOR_WIDTH / 2, wallHeight / 2, 0]} receiveShadow castShadow>
                    <boxGeometry args={[0.1, wallHeight, FLOOR_LENGTH]} />
                    <meshPhysicalMaterial
                        color="#a7c5eb"
                        transparent
                        opacity={0.2}
                        roughness={0}
                        metalness={0.1}
                        transmission={0.95}
                    />
                </mesh>

                {/* Right glass wall */}
                <mesh position={[FLOOR_WIDTH / 2, wallHeight / 2, 0]} receiveShadow castShadow>
                    <boxGeometry args={[0.1, wallHeight, FLOOR_LENGTH]} />
                    <meshPhysicalMaterial
                        color="#a7c5eb"
                        transparent
                        opacity={0.2}
                        roughness={0}
                        metalness={0.1}
                        transmission={0.95}
                    />
                </mesh>
            </group>
        );
    };

    // Function to create entrance
    const createEntrance = () => {
        return (
            <group position={[0, 0, FLOOR_LENGTH / 2]}>
                {/* Entrance gap */}
                <mesh position={[0, 2, 0.1]}>
                    <boxGeometry args={[10, 4, 1]} />
                    <meshStandardMaterial color="#111" />
                </mesh>

                {/* Entrance doors */}
                <mesh position={[0, 2, 0.6]}>
                    <boxGeometry args={[9.8, 3.8, 0.1]} />
                    <meshPhysicalMaterial
                        color="#a7c5eb"
                        transparent
                        opacity={0.3}
                        roughness={0}
                        metalness={0.1}
                        transmission={0.9}
                    />
                </mesh>
            </group>
        );
    };


    // Create floor structure for the roof
    const createRoof = () => {
        const roofY = FLOOR_COUNT * FLOOR_HEIGHT;
        return (
            <group>
                {/* Main roof surface */}
                <mesh position={[0, roofY, 0]} receiveShadow>
                    <boxGeometry args={[FLOOR_WIDTH, 0.3, FLOOR_LENGTH]} />
                    <meshStandardMaterial color="#e0e0e0" />
                </mesh>

                {/* Roof edge detail */}
                <mesh position={[0, roofY + 0.3, 0]}>
                    <boxGeometry args={[FLOOR_WIDTH + 1, 0.4, FLOOR_LENGTH + 1]} />
                    <meshStandardMaterial color="#bbbbbb" />
                </mesh>

                {/* Roof texture/detail - showing slight texture/slope for water drainage */}
                <mesh position={[0, roofY + 0.1, 0]} rotation={[0.01, 0, 0.01]}>
                    <boxGeometry args={[FLOOR_WIDTH - 1, 0.05, FLOOR_LENGTH - 1]} />
                    <meshStandardMaterial color="#d0d0d0" />
                </mesh>
            </group>
        );
    };

    return (
        <>
            {/* Floors */}
            {createFloors()}

            {/* Supporting columns */}
            {createColumns()}

            {/* Glass exterior walls */}
            {createGlassWalls()}

            {/* Building entrance */}
            {createEntrance()}

            {/* Roof structure */}
            {createRoof()}

            {/* AC units on top */}
           

            {/* Ground/foundation */}
            <mesh position={[0, -0.1, 0]} receiveShadow>
                <boxGeometry args={[FLOOR_WIDTH + 10, 0.1, FLOOR_LENGTH + 10]} />
                <meshStandardMaterial color="#999999" />
            </mesh>
        </>
    );
};

// Auto-rotation controller component
const AutoRotate: React.FC = () => {
    const { camera } = useThree();
    const controlsRef = useRef<any>(null);

    useFrame((_, delta) => {
        if (controlsRef.current) {
            controlsRef.current.autoRotate = true;
            controlsRef.current.autoRotateSpeed = 0.5; // Adjust speed as needed
            controlsRef.current.update();
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={55} // Restrict zoom-in to maintain perspective
            maxDistance={100} // Restrict zoom-out
            autoRotate={true}
            autoRotateSpeed={0.5}
        />
    );
};

// Scene setup with lighting and controls
const ShoppingMallScene: React.FC = () => {
    return (
        <Canvas shadows camera={{ position: [70, 70, 90], fov: 75 }}>
            {/* <fog attach="fog" args={['#f0f0f0', 50, 200]} /> */}

            <ambientLight intensity={0.5} />
            <directionalLight
                position={[50, 50, 25]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={100}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
            />

            <pointLight position={[0, 20, 0]} intensity={0.5} />

            <ShoppingMall />

            {/* Auto-rotating camera controls with limited zoom */}
            <AutoRotate />

            {/* <Environment preset="city" /> */}


        </Canvas>
    );
};

export default ShoppingMallScene;