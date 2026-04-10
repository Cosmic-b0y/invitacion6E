'use client';

import SendaCoffeLogo from './SendaCoffeLogo';

/**
 * Transparent fixed header — shows the Senda Coffee logo
 * overlaying the 3D canvas without blocking interaction.
 */
export default function SiteHeader() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none',           // lets 3D scene receive mouse events
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 100%)',
      }}
    >
      <SendaCoffeLogo
        width={110}
        color="#F5EDD8"
        beanDark="#3D1C02"
        beanLight="#F5EDD8"
        style={{ opacity: 0.88 }}
      />
    </header>
  );
}
