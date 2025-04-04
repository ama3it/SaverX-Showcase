import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useRef } from 'react';

const numFloors = 11;
const floorHeight = 5;

function Wall({ position, rotation }) {
    return (
        <mesh position={position} rotation={rotation}>
            <boxGeometry args={[40, numFloors * floorHeight, 0.2]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
    );
}

function Floor({ position }) {
    return (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial color="#f0f0f0" />
        </mesh>
    );
}

function Ceiling({ position }) {
    return (
        <mesh position={position}>
            <boxGeometry args={[40, 0.2, 40]} />
            <meshStandardMaterial color="#e0e0e0" />
        </mesh>
    );
}

function Railing({ position, rotation }) {
    return (
        <mesh position={position} rotation={rotation}>
            <boxGeometry args={[40, 1, 0.5]} />
            <meshStandardMaterial color="#666" />
        </mesh>
    );
}

function FanBlade() {
    const ref = useRef();
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.1;
        }
    });
    return (
        <mesh ref={ref} position={[0, 1.5, 0]}>
            <cylinderGeometry args={[2, 2, 0.2, 6]} />
            <meshStandardMaterial color="#444" />
        </mesh>
    );
}

function HVACUnit({ position, size }) {
    return (
        <group position={position}>
            <mesh>
                <boxGeometry args={size} />
                <meshStandardMaterial color="#cccccc" />
            </mesh>
            <FanBlade />
        </group>
    );
}

function ShoppingMall() {
    return (
        <Canvas camera={{ position: [0, 60, 100], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 20, 5]} intensity={1} />

            <group>
                <Wall position={[0, (numFloors * floorHeight) / 2, -20]} />
                <Wall position={[-20, (numFloors * floorHeight) / 2, 0]} rotation={[0, Math.PI / 2, 0]} />
                <Wall position={[20, (numFloors * floorHeight) / 2, 0]} rotation={[0, Math.PI / 2, 0]} />
                
                {Array.from({ length: numFloors }).map((_, floorNumber) => (
                    <group key={floorNumber}>
                        <Floor position={[0, floorNumber * floorHeight, 0]} />
                        <Ceiling position={[0, (floorNumber + 1) * floorHeight - 0.1, 0]} />
                    </group>
                ))}

                <group position={[0, numFloors * floorHeight, 0]}>
                    <Floor position={[0, 0, 0]} />
                    <Railing position={[0, 0.5, -20]} />
                    <Railing position={[0, 0.5, 20]} />
                    <Railing position={[-20, 0.5, 0]} rotation={[0, Math.PI / 2, 0]} />
                    <Railing position={[20, 0.5, 0]} rotation={[0, Math.PI / 2, 0]} />
                    <HVACUnit position={[-10, 0.5, -10]} size={[5, 3, 3]} />
                    <HVACUnit position={[10, 0.5, 10]} size={[5, 3, 3]} />
                </group>
            </group>

            <Environment preset="city" />
            <OrbitControls minDistance={50} maxDistance={120} enablePan target={[0, numFloors * floorHeight / 2, 0]} />
        </Canvas>
    );
}

export default ShoppingMall;
