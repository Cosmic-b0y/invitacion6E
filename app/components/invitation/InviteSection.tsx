'use client';

import styles from './InviteSection.module.css';

export default function InviteSection() {
  return (
    <section className={`${styles.invite} reveal-section`}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>✦ con mucho gusto ✦</span>
        <h2 className={styles.heading}>Estás Invitado</h2>
        <div className={styles.divider} />
        <p className={styles.body}>
          Te invitamos a vivir una experiencia única bajo el cielo abierto.
          <br /><br />
          <em>Senda Coffee</em> llega al Jardín Cocinarte para compartir contigo
          el arte del café de especialidad, un ambiente cálido y momentos
          que se quedan grabados en la memoria.
        </p>
        <div className={styles.tagRow}>
          <span className={styles.tag}>cafetería simulada</span>
          <span className={styles.tagDot}>·</span>
          <span className={styles.tag}>al aire libre</span>
          <span className={styles.tagDot}>·</span>
          <span className={styles.tag}>experiencia especial</span>
        </div>
      </div>
    </section>
  );
}
