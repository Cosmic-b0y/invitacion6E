'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './DateSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function DateSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      `.${styles.label}`,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo(
      dateRef.current,
      { opacity: 0, y: 60, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(
      `.${styles.divider}`,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
      '-=0.5'
    )
    .fromTo(
      timeRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.4'
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.dateSection} reveal-section`}>
      <div className={styles.inner}>
        <span className={styles.label}>cuando nos encontramos</span>

        <div ref={dateRef} className={styles.dateBlock}>
          <span className={styles.dayName}>Sábado</span>
          <span className={styles.dayNumber}>— Próximamente —</span>
          <span className={styles.month}>Jardín Cocinarte</span>
        </div>

        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerIcon}>✦</span>
          <div className={styles.dividerLine} />
        </div>

        <div ref={timeRef} className={styles.timeBlock}>
          <span className={styles.timeLabel}>hora</span>
          <span className={styles.time}>Por confirmar</span>
        </div>
      </div>
    </section>
  );
}
