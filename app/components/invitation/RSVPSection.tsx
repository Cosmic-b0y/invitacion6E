'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SendaLogo from './SendaLogo';
import styles from './RSVPSection.module.css';

gsap.registerPlugin(ScrollTrigger);

// TODO: Replace with the actual WhatsApp number
const WHATSAPP_NUMBER = '50200000000';
const WHATSAPP_MESSAGE = encodeURIComponent(
  '¡Hola! Me encantaría confirmar mi asistencia al evento de Senda Coffee en el Jardín Cocinarte. 🌿☕'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function RSVPSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' }
    )
    .fromTo(
      `.${styles.closing}`,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      `.${styles.subtext}`,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    )
    .fromTo(
      buttonRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' },
      '-=0.2'
    );

    // Button hover effect
    const btn = buttonRef.current;
    if (btn) {
      const onEnter = () =>
        gsap.to(btn, { scale: 1.04, duration: 0.3, ease: 'power2.out' });
      const onLeave = () =>
        gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
      btn.addEventListener('mouseenter', onEnter);
      btn.addEventListener('mouseleave', onLeave);
      return () => {
        btn.removeEventListener('mouseenter', onEnter);
        btn.removeEventListener('mouseleave', onLeave);
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.rsvpSection}>
      {/* Background vignette gradient */}
      <div className={styles.bg} />

      <div className={styles.inner}>
        {/* Logo again */}
        <div ref={logoRef} className={styles.logoWrap}>
          <SendaLogo color="#F5EDD8" width={200} className={styles.logo} />
        </div>

        <h2 className={styles.closing}>Esperamos verte pronto</h2>

        <p className={styles.subtext}>
          Confirma tu asistencia y prepárate para<br />
          una tarde llena de café, buena energía y momentos especiales.
        </p>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerDot}>✦</span>
          <span className={styles.dividerLine} />
        </div>

        <a
          ref={buttonRef}
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.rsvpButton}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={styles.whatsappIcon}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Confirmar asistencia
        </a>

        <p className={styles.footer}>
          Senda Coffee · Jardín Cocinarte · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
