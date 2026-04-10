import { Html, Text, useCursor, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { useGuestStore, useThemeStore } from "@stores";
import SendaCoffeLogo from "../common/SendaCoffeLogo";

const WHATSAPP_NUMBER = '9612753555';

/** Builds the WhatsApp link dynamically from guest store */
const useWhatsAppLink = () => {
  const guestName      = useGuestStore((s) => s.guestName);
  const selectedBebida = useGuestStore((s) => s.selectedBebida);
  const selectedSnack  = useGuestStore((s) => s.selectedSnack);
  const selectedPostre = useGuestStore((s) => s.selectedPostre);
  const canConfirm     = useGuestStore((s) => s.canConfirm);

  const ready = canConfirm();

  const msg = encodeURIComponent(
    `Hola! Soy ${guestName ?? ''} 😊\n` +
    `Confirmo mi asistencia al evento Senda Coffee 🌿☕\n\n` +
    `Mi orden:\n` +
    `☕ Bebida: ${selectedBebida ?? '(pendiente)'}\n` +
    `🥗 Snack: ${selectedSnack ?? '(pendiente)'}\n` +
    `🍰 Postre: ${selectedPostre ?? '(pendiente)'}\n\n` +
    `¡Nos vemos pronto!`
  );

  return { url: `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, ready };
};

const FooterCTA = () => {
  const textRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { url, ready } = useWhatsAppLink();
  const themeType = useThemeStore((s) => s.theme.type);
  const isDark = themeType === 'dark';

  // Active = white (dark bg) | inactive = dimmed version of theme color
  const activeColor  = isDark ? 'white' : 'black';
  const dimmedColor  = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  const color = ready ? activeColor : dimmedColor;

  const onPointerOver = () => { if (ready) setHovered(true); };
  const onPointerOut  = () => setHovered(false);
  const onClick       = () => { if (ready) window.open(url, '_blank'); };

  const onPointerMove = (e: MouseEvent) => {
    if (isMobile || !ready) return;
    const div = document.getElementById('footer-cta-hint');
    if (div) gsap.to(div, { top: `${e.clientY + 14}px`, left: `${e.clientX}px`, duration: 0.6 });
  };

  // Tooltip hint
  useEffect(() => {
    if (!document.getElementById('footer-cta-hint')) {
      const div = document.createElement('div');
      div.id = 'footer-cta-hint';
      div.style.position = 'fixed';
      div.style.zIndex = '2';
      div.style.bottom = '0';
      div.style.opacity = '0';
      div.style.left = '50%';
      div.style.fontSize = '0.8rem';
      div.style.pointerEvents = 'none';
      div.style.color = 'white';
      document.body.appendChild(div);
    }
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const div = document.getElementById('footer-cta-hint');
    if (div) {
      div.textContent = ready ? 'WHATSAPP' : 'Selecciona tu menú primero';
      gsap.to(div, { opacity: hovered ? 0.5 : 0, duration: 0.3 });
    }
    gsap.to(textRef.current, { letterSpacing: hovered && ready ? 0.3 : 0, duration: 0.3 });
    return () => {
      gsap.killTweensOf(div);
      gsap.killTweensOf(textRef.current);
    };
  }, [hovered, ready]);

  useCursor(hovered && ready);


  if (isMobile) {
    return (
      <Text
        font="./Vercetti-Regular.woff"
        fontSize={0.18}
        color={color}
        onClick={onClick}>
        CONFIRMAR ASISTENCIA
      </Text>
    );
  }

  return (
    <Text
      ref={textRef}
      font="./Vercetti-Regular.woff"
      fontSize={0.2}
      color={color}
      onPointerOver={onPointerOver}
      onPointerMove={onPointerMove}
      onPointerOut={onPointerOut}
      onClick={onClick}>
      CONFIRMAR ASISTENCIA
    </Text>
  );
};

const Footer = () => {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();

  useFrame(() => {
    const d = data.range(0.8, 0.2);
    if (groupRef.current) groupRef.current.visible = d > 0;
  });

  return (
    <group position={[0, -44, 18]} rotation={[-Math.PI / 2, 0, 0]} ref={groupRef}>
      {/* Logo above CTA */}
      <Html
        center
        position={[0, 0, isMobile ? 2.5 : 2.2]}
        style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <SendaCoffeLogo
          width={isMobile ? 90 : 130}
          color="#F5EDD8"
          beanDark="#3D1C02"
          beanLight="#F5EDD8"
          style={{ opacity: 0.85, display: 'block' }}
        />
      </Html>

      {/* CTA — disabled/dimmed until all 3 selections made */}
      <group position={[isMobile ? -1.2 : -1.5, 0, 0]}>
        <FooterCTA />
      </group>
    </group>
  );
};

export default Footer;