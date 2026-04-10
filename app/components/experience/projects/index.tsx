'use client';

import { Text, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { usePortalStore } from "@stores";
import { Wanderer } from "../../models/Wanderer";
import ProjectsCarousel from "./ProjectsCarousel";
import { TouchPanControls } from "./TouchPanControls";

const INSTRUCTION_LINE1 = 'Elige 1 bebida · 1 snack · 1 postre';
const INSTRUCTION_LINE2 = 'Luego confirma tu asistencia al final';

const Projects = () => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === "projects");
  const data = useScroll();

  useEffect(() => {
    data.el.style.overflow = isActive ? 'hidden' : 'auto';
    if (isActive) {
      if (isMobile) {
        gsap.to(camera.position, { z: 11.5, y: -39, x: 1, duration: 1 });
      } else {
        gsap.to(camera.position, { y: -39, x: 2, duration: 1 });
      }
    }
  }, [isActive]);

  useFrame((state, delta) => {
    if (isActive) {
      if (!isMobile) {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -(state.pointer.x * Math.PI) / 4, 0.03);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 11.5 - state.pointer.y, 7, delta);
      }
    }
  });

  const fontProps = {
    font: "./Vercetti-Regular.woff",
    color: "white",
    anchorX: "center" as const,
    anchorY: "middle" as const,
  };

  return (
    <group>
      <Wanderer
        rotation={new THREE.Euler(0, Math.PI / 6, 0)}
        scale={new THREE.Vector3(1.5, 1.5, 1.5)}
        position={new THREE.Vector3(0, -1, -1)}
      />

      {/* Instruction card — visible when inside portal */}
      {isActive && (
        <group position={[isMobile ? 0 : -1, isMobile ? -3 : 5, isMobile ? 0 : -2]}>
          {/* Background pill */}
          <mesh>
            <planeGeometry args={[isMobile ? 5 : 7, isMobile ? 0.9 : 0.8, 1]} />
            <meshBasicMaterial color="#000" transparent opacity={0.45} />
          </mesh>
          <Text {...fontProps} fontSize={isMobile ? 0.28 : 0.22} position={[0, 0.18, 0.01]}>
            {INSTRUCTION_LINE1}
          </Text>
          <Text {...fontProps} fontSize={isMobile ? 0.22 : 0.17} position={[0, -0.18, 0.01]}
            color="rgba(255,255,255,0.65)">
            {INSTRUCTION_LINE2}
          </Text>
        </group>
      )}

      <ProjectsCarousel />
      {isActive && isMobile && <TouchPanControls />}
    </group>
  );
};

export default Projects;
