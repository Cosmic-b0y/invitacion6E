'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './HeroSection';
import InviteSection from './InviteSection';
import ImageSection from './ImageSection';
import DateSection from './DateSection';
import LocationSection from './LocationSection';
import RSVPSection from './RSVPSection';
import CustomCursor from './CustomCursor';
import ScrollProgress from './ScrollProgress';
import styles from './invitation.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Invitation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll setup
    document.documentElement.style.scrollBehavior = 'smooth';

    // Fade + slide vertical for all sections
    const sections = gsap.utils.toArray<HTMLElement>('.reveal-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.invitation}>
      <CustomCursor />
      <ScrollProgress />
      <HeroSection />
      <InviteSection />
      <ImageSection
        src="/images/garden-ambient.png"
        alt="Jardín Cocinarte"
        overlayText="un espacio al aire libre"
      />
      <DateSection />
      <LocationSection />
      <ImageSection
        src="/images/coffee-menu.png"
        alt="Experiencia Senda Coffee"
        overlayText="detalles que enamoran"
      />
      <RSVPSection />
    </div>
  );
}
