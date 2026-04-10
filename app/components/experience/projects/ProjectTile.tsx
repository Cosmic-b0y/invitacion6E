import { Edges, Text, TextProps } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { useGuestStore, usePortalStore } from "@stores";
import { MenuCategory } from "@stores/guestStore";
import { Project } from "@types";

interface ProjectTileProps {
  project: Project;
  index: number;
  position: [number, number, number];
  rotation: [number, number, number];
  activeId: number | null;
  onClick: () => void;
}

const ProjectTile = ({ project, index, position, rotation, activeId, onClick }: ProjectTileProps) => {
  const projectRef       = useRef<THREE.Group>(null);
  const hoverAnimRef     = useRef<gsap.core.Timeline | null>(null);
  const [hovered, setHovered] = useState(false);
  const isProjectSectionActive = usePortalStore((state) => state.activePortalId === "projects");

  // Guest store — menu selection
  const selectItem       = useGuestStore((s) => s.selectItem);
  const selectedBebida   = useGuestStore((s) => s.selectedBebida);
  const selectedSnack    = useGuestStore((s) => s.selectedSnack);
  const selectedPostre   = useGuestStore((s) => s.selectedPostre);

  const category = project.category as MenuCategory | undefined;
  const isSelected = useMemo(() => {
    if (!category) return false;
    if (category === 'bebida') return selectedBebida === project.title;
    if (category === 'snack')  return selectedSnack  === project.title;
    if (category === 'postre') return selectedPostre === project.title;
    return false;
  }, [category, selectedBebida, selectedSnack, selectedPostre, project.title]);

  const titleProps = useMemo(() => ({
    font: "./soria-font.ttf",
    color: isSelected ? '#2a6030' : 'black',
  }), [isSelected]);

  const subtitleProps: Partial<TextProps> = useMemo(() => ({
    font: "./Vercetti-Regular.woff",
    color: "black",
    anchorX: "left",
    anchorY: "top",
  }), []);

  useEffect(() => {
    if (!projectRef.current) return;
    hoverAnimRef.current?.kill();

    const [mesh, title, dateGroup, textBox, button] = projectRef.current.children;

    hoverAnimRef.current = gsap.timeline();
    hoverAnimRef.current
      .to(projectRef.current.position, { z: hovered ? 1 : 0, duration: 0.2 }, 0)
      .to(projectRef.current.position, { y: hovered ? 0.4 : 0 }, 0)
      .to(projectRef.current.scale, {
        x: hovered ? 1.3 : 1,
        y: hovered ? 1.3 : 1,
        z: hovered ? 1.3 : 1,
      }, 0)
      .to(title.position, { y: hovered ? 0.7 : -0.8 }, 0)
      .to(textBox.position, { y: hovered ? 0.7 : 0 }, 0)
      .to(textBox, { fillOpacity: hovered ? 1 : 0, duration: 0.4 }, 0)
      .to(dateGroup.position, { y: hovered ? 2.6 : 1.4 }, 0)
      .to(mesh.scale, { y: hovered ? 2 : 1 }, 0)
      .to((mesh as THREE.Mesh).material, { opacity: hovered ? 0.95 : 0.3 }, 0)
      .to(mesh.position, { y: hovered ? 1 : 0 }, 0)
      .to(button.scale, { y: hovered ? 1 : 0, x: hovered ? 1 : 0 }, 0)
      .to(button.position, { z: hovered ? 0.3 : -1 }, 0);
  }, [hovered]);

  useEffect(() => {
    if (isMobile) setHovered(activeId === index);
  }, [isMobile, activeId]);

  useEffect(() => {
    if (projectRef.current) {
      gsap.to(projectRef.current.position, {
        y: isProjectSectionActive ? 0 : -10,
        duration: 1,
        delay: isProjectSectionActive ? index * 0.1 : 0,
      });
    }
  }, [isProjectSectionActive]);

  const handleSelectClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!category) return;

    const button = e.eventObject;
    gsap.to(button.position, { z: 0, duration: 0.1 })
      .then(() => gsap.to(button.position, { z: 0.3, duration: 0.3 }));

    selectItem(category, project.title);
  };

  // Button label & color
  const buttonLabel = isSelected ? 'ELEGIDO ✓' : 'ELEGIR';
  const buttonColor = isSelected ? '#2a6030' : '#222';

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => !isMobile && isProjectSectionActive && setHovered(true)}
      onPointerOut={() => !isMobile && isProjectSectionActive && setHovered(false)}>
      <group ref={projectRef}>
        <mesh>
          <planeGeometry args={[4.2, 2, 1]} />
          <meshBasicMaterial
            color={isSelected ? '#d4edda' : '#FFF'}
            transparent
            opacity={0.3}
          />
          <Edges color={isSelected ? '#2a6030' : 'black'} lineWidth={isSelected ? 2.5 : 1.5} />
        </mesh>
        <Text
          {...titleProps}
          position={[-1.9, -0.8, 0.101]}
          anchorX="left"
          anchorY="bottom"
          maxWidth={4}
          fontSize={0.8}>
          {project.title}
        </Text>
        <group position={[-1.25, 1.4, 0.01]}>
          <mesh>
            <planeGeometry args={[1.7, 0.4, 1]} />
            <meshBasicMaterial color="#777" opacity={0} wireframe />
            <Edges color="black" lineWidth={1} />
          </mesh>
          <Text
            {...subtitleProps}
            position={[-0.7, 0.2, 0]}
            fontSize={0.3}>
            {project.date.toUpperCase()}
          </Text>
        </group>
        <Text
          {...subtitleProps}
          maxWidth={3.8}
          position={[-1.9, 2.3, 0.1]}
          fontSize={0.2}>
          {project.subtext}
        </Text>

        {/* ELEGIR / ELEGIDO button (always present for menu items) */}
        <group
          position={[1.3, -0.6, -1]}
          scale={[0, 0, 1]}
          onClick={handleSelectClick}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}>
          <mesh>
            <boxGeometry args={[1.4, 0.4, 0.2]} />
            <meshBasicMaterial color={buttonColor} />
            <Edges color="white" lineWidth={1} />
          </mesh>
          <Text
            {...subtitleProps}
            color="white"
            position={[-0.55, 0.15, 0.2]}
            fontSize={0.22}>
            {buttonLabel}
          </Text>
        </group>
      </group>
    </group>
  );
};

export default ProjectTile;