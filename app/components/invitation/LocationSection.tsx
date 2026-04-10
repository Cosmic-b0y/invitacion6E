'use client';

import styles from './LocationSection.module.css';

export default function LocationSection() {
  return (
    <section className={`${styles.locationSection} reveal-section`}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>✦ nos vemos aquí ✦</span>

        <h2 className={styles.venueName}>Jardín<br />Cocinarte</h2>

        <div className={styles.divider} />

        <div className={styles.addressBlock}>
          <div className={styles.addressIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
          </div>
          <p className={styles.address}>
            Jardín Cocinarte<br />
            <span className={styles.addressSub}>dirección por confirmar</span>
          </p>
        </div>

        <div className={styles.atmosphere}>
          <div className={styles.atmosphereItem}>
            <span className={styles.atmosphereIcon}>☁</span>
            <span className={styles.atmosphereLabel}>Al aire libre</span>
          </div>
          <div className={styles.atmosphereItem}>
            <span className={styles.atmosphereIcon}>☕</span>
            <span className={styles.atmosphereLabel}>Café de especialidad</span>
          </div>
          <div className={styles.atmosphereItem}>
            <span className={styles.atmosphereIcon}>🌿</span>
            <span className={styles.atmosphereLabel}>Ambiente verde</span>
          </div>
        </div>
      </div>
    </section>
  );
}
