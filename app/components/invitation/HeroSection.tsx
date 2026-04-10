'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SendaLogo from './SendaLogo';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Logo fades in from above
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: 'power3.out' }
    );

    // Letters animate in one by one
    const letters = titleRef.current?.querySelectorAll('.letter') || [];
    tl.fromTo(
      letters,
      { opacity: 0, y: 30, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'back.out(1.4)',
      },
      '-=0.8'
    );

    // Decorative line
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'power2.inOut' },
      '-=0.4'
    );

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.5'
    );

    // Scroll hint
    tl.fromTo(
      scrollHintRef.current,
      { opacity: 0 },
      { opacity: 0.6, duration: 1 },
      '+=0.5'
    );

    // Floating animation for scroll hint
    gsap.to(scrollHintRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'sine.inOut',
      delay: 3,
    });
  }, []);

  const words = ['SENDA', 'COFFEE'];

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* Ambient particles */}
      <div className={styles.particles}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            opacity: 0.2 + Math.random() * 0.3,
          }} />
        ))}
      </div>

      {/* Gradient orb background */}
      <div className={styles.orbTop} />
      <div className={styles.orbBottom} />

      <div className={styles.content}>
        {/* Logo */}
        <div ref={logoRef} className={styles.logoWrap}>
          <SendaLogo color="#F5EDD8" width={320} className={styles.logo} />
        </div>

        {/* Animated title */}
        <h1 ref={titleRef} className={styles.title}>
          {words.map((word, wi) => (
            <span key={wi} className={styles.word}>
              {word.split('').map((char, ci) => (
                <span key={ci} className={`letter ${styles.letter}`}>
                  {char}
                </span>
              ))}
              {wi === 0 && <span className={styles.wordBreak}>&nbsp;</span>}
            </span>
          ))}
        </h1>

        {/* Decorative line */}
        <div ref={lineRef} className={styles.line}>
          <span className={styles.lineDot} />
          <span className={styles.lineDivider} />
          <span className={styles.lineDot} />
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} className={styles.subtitle}>
          una invitación especial
        </p>
      </div>

      {/* Scroll hint */}
      <div ref={scrollHintRef} className={styles.scrollHint}>
        <span className={styles.scrollText}>scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
