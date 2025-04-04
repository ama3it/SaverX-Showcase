import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, FC } from 'react';
import { Mesh, Group } from 'three';
import { OrbitControls } from '@react-three/drei';

const Fan: FC<{ position: [number, number, number] }> = ({ position }) => {
  const fanRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (fanRef.current) {
      fanRef.current.rotation.z += delta * 150;
    }
  });

  return (
    <group position={position} ref={fanRef}>
      {/* Fan Blades - using triangular shapes */}
      {[...Array(6)].map((_, i) => (
        <group 
          key={i} 
          rotation={[0, 0, (Math.PI / 3) * i]}
        >
          {/* Main blade using triangular shape */}
          <mesh position={[0, 0.4, 0]} rotation={[0.2, 0, 0]}>
            <cylinderGeometry 
              args={[0.1, 0.01, 0.8, 3, 1]} // triangular prism shape
              rotation={[Math.PI / 2, 0, 0]}
            />
            <meshStandardMaterial 
              color="#8a8a8a"
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>

          {/* Blade root reinforcement */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.1, 3]} />
            <meshStandardMaterial 
              color="#666666"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}

      {/* Enhanced Center Hub */}
      <group>
        {/* Main hub cylinder */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.12, 32]} />
          <meshStandardMaterial 
            color="#555555"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        {/* Hub cap */}
        <mesh position={[0, 0, 0.07]}>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />
          <meshStandardMaterial 
            color="#444444"
            metalness={0.98}
            roughness={0.05}
          />
        </mesh>
      </group>
    </group>
  );
};

const HVACUnit: FC = () => {
  return (
    <group position={[0, 1, 0]}>
      {/* Main Unit Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 1.5]} />
        <meshStandardMaterial color="lightgray" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Front and Back Vents */}
   {/* Front and Back Vents */}
   {/* Front and Back Vents */}
   {[0.76, -0.76].map((zPos, i) => (
        <group key={i}>
          <mesh position={[0, 0, zPos]}>
            <boxGeometry args={[1.8, 1.8, 0.2]} />  {/* Increased depth for more recess */}
            <meshStandardMaterial 
              color="#333" 
              opacity={0.0002}    // Even more transparent
              transparent 
              side={2}
              depthWrite={false}
            />
          </mesh>
          <Fan position={[0, 0, zPos]} />  {/* Aligned with the vent wall instead of offset */}
        </group>
      ))}

      {/* Top Ventilation Slats */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 1, 0.2 + i * 0.1]}>
          <boxGeometry args={[1.6, 0.05, 0.05]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      ))}

      {/* Base Platform */}
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[2.2, 0.2, 1.7]} />
        <meshStandardMaterial color="#555" metalness={0.4} />
      </mesh>

      {/* Right Side Pipes */}
      {[0.2, -0.2].map((zOffset) => (
        <group key={zOffset} position={[1, 0.1, zOffset]}>
          {/* Horizontal Pipe */}
          <mesh rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
            <meshStandardMaterial color="#666" />
          </mesh>

          {/* Bend */}
          <mesh position={[0.3, 0, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#666" />
          </mesh>

          {/* Vertical Pipe */}
          <mesh position={[0.3, -0.5, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1, 10]} />
            <meshStandardMaterial color="#666" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const HvacScene: FC = () => {
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <HVACUnit />
       
      <OrbitControls 
        autoRotate={true}        // Enable auto-rotation
        autoRotateSpeed={1}      // Rotation speed (1 = normal)
        target={[0, 1, 0]}       // Focus on HVAC unit's center
        minDistance={2}       // Minimum zoom distance
        maxDistance={5}         // Maximum zoom distance
        zoomSpeed={0.8}
        enablePan={true}
        enableZoom={true}
      />
    </Canvas>
  );
};

export default HvacScene;