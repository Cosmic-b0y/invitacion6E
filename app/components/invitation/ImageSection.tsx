'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ImageSection.module.css';

gsap.registerPlugin(ScrollTrigger);

interface ImageSectionProps {
  src: string;
  alt: string;
  overlayText?: string;
}

export default function ImageSection({ src, alt, overlayText }: ImageSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    // Parallax zoom on scroll – scrub tied to scroll progress
    gsap.fromTo(
      image,
      { scale: 1.12, y: 0 },
      {
        scale: 1,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      }
    );

    // Overlay text reveal
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30, letterSpacing: '0.8em' },
        {
          opacity: 1,
          y: 0,
          letterSpacing: '0.4em',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className={styles.imageSection}>
      <div ref={imageRef} className={styles.imageWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0 }}
        />
        {/* Fallback gradient background when image not loaded */}
        {!imgLoaded && <div className={styles.fallbackBg} />}
        <div className={styles.overlay} />
      </div>
      {overlayText && (
        <span ref={textRef} className={styles.overlayText}>
          {overlayText}
        </span>
      )}
    </section>
  );
}
