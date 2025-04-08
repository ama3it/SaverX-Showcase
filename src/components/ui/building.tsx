import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";

const FLOOR_HEIGHT = 2;
const BUILDING_WIDTH = 15;
const BUILDING_DEPTH = 10;
const FLOORS = 11;
const BASEMENT_COLOR = "#4B382A"; // Deep Earth Brown
const WALL_COLOR = "#7D7D7D"; // Warm Gray
const WINDOW_COLOR = "#C3E0F0"; // Deeper Glass Blue
const ROOF_COLOR = "#333333"; // Charcoal Gray
// const EDGE_COLOR = "#B87333"; // Bronze
const CHILLER_COLOR = "#B0B0B0"; // Brushed Silver
const FAN_COLOR = "#606060"; // Dark Gray
const DOOR_COLOR = "#5D3A1A"; // Rich Mahogany
const WINDOW_COLUMNS = 5;

interface FloorProps {
  position: [number, number, number];
  color: string;
}

function Floor({ position, color }: FloorProps) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[BUILDING_WIDTH, FLOOR_HEIGHT, BUILDING_DEPTH]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Windows({ position }: { position: [number, number, number] }) {
  return (
    <>
      {Array.from({ length: WINDOW_COLUMNS }).map((_, i) => {
        const xOffset = (i - (WINDOW_COLUMNS - 1) / 2) * (BUILDING_WIDTH / WINDOW_COLUMNS);
        const zOffset = (i - (WINDOW_COLUMNS - 1) / 2) * (BUILDING_DEPTH / WINDOW_COLUMNS);
        return (
          <>
            <mesh key={`front-${i}`} position={[xOffset, position[1], position[2] + BUILDING_DEPTH / 2 + 0.01]}>
              <boxGeometry args={[BUILDING_WIDTH / (WINDOW_COLUMNS + 1), FLOOR_HEIGHT / 2, 0.05]} />
              <meshStandardMaterial color={WINDOW_COLOR} transparent opacity={0.7} />
            </mesh>
            <mesh key={`back-${i}`} position={[xOffset, position[1], position[2] - BUILDING_DEPTH / 2 - 0.01]}>
              <boxGeometry args={[BUILDING_WIDTH / (WINDOW_COLUMNS + 1), FLOOR_HEIGHT / 2, 0.05]} />
              <meshStandardMaterial color={WINDOW_COLOR} transparent opacity={0.7} />
            </mesh>
            <mesh key={`left-${i}`} position={[position[0] - BUILDING_WIDTH / 2 - 0.01, position[1], zOffset]}>
              <boxGeometry args={[0.05, FLOOR_HEIGHT / 2, BUILDING_DEPTH / (WINDOW_COLUMNS + 1)]} />
              <meshStandardMaterial color={WINDOW_COLOR} transparent opacity={0.7} />
            </mesh>
            <mesh key={`right-${i}`} position={[position[0] + BUILDING_WIDTH / 2 + 0.01, position[1], zOffset]}>
              <boxGeometry args={[0.05, FLOOR_HEIGHT / 2, BUILDING_DEPTH / (WINDOW_COLUMNS + 1)]} />
              <meshStandardMaterial color={WINDOW_COLOR} transparent opacity={0.7} />
            </mesh>
          </>
        );
      })}
    </>
  );
}

function Roof({ position }: { position: [number, number, number] }) {
  return (
    <>
      <mesh position={position} castShadow>
        <boxGeometry args={[BUILDING_WIDTH, FLOOR_HEIGHT / 2, BUILDING_DEPTH]} />
        <meshStandardMaterial color={ROOF_COLOR} />
      </mesh>
      <Chillers position={position} />
    </>
  );
}

function Chillers({ position }: { position: [number, number, number] }) {
  return (
    <>
      {[...Array(2)].map((_, i) => (
        <group key={`chiller-${i}`} position={[position[0] - (i * 5) + 2.5, position[1] + 1, position[2] - 2.5]}>
          <mesh>
            <boxGeometry args={[3, 1, 2]} />
            <meshStandardMaterial color={CHILLER_COLOR} />
          </mesh>
          <mesh position={[0, 0, 1]}>
            <circleGeometry args={[0.5, 32]} />
            <meshStandardMaterial color={FAN_COLOR} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function FrontDoor() {
  return (
    <mesh position={[0, -FLOOR_HEIGHT / 2, BUILDING_DEPTH / 2 + 0.01]}>
      <boxGeometry args={[2, 3, 0.05]} />
      <meshStandardMaterial color={DOOR_COLOR} />
    </mesh>
  );
}

function Building() {
  const buildingRef = useRef<Group>(null);

  useFrame(() => {
    if (buildingRef.current) {
      buildingRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={buildingRef}>
      <Floor position={[0, -FLOOR_HEIGHT, 0]} color={BASEMENT_COLOR} />
      {Array.from({ length: FLOORS }).map((_, i) => (
        <group key={i}>
          <Floor position={[0, i * FLOOR_HEIGHT, 0]} color={WALL_COLOR} />
          <Windows position={[0, i * FLOOR_HEIGHT, 0]} />
        </group>
      ))}
      <Roof position={[0, FLOORS * FLOOR_HEIGHT, 0]} />
      <FrontDoor />
    </group>
  );
}

export default function BuildingScene() {
  return (
    
    <Canvas camera={{ position: [25, 25, 50], fov: 50 }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
      <Building />
      <OrbitControls  target={[0, FLOORS * FLOOR_HEIGHT / 2, 0]}  minDistance={20} maxDistance={50} />
    </Canvas>
  );
}
