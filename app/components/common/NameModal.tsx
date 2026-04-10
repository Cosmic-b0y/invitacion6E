'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGuestStore } from '@stores';
import SendaCoffeLogo from './SendaCoffeLogo';

export default function NameModal() {
  const showNameModal = useGuestStore((s) => s.showNameModal);
  const setGuestName  = useGuestStore((s) => s.setGuestName);

  const [input, setInput]   = useState('');
  const [error, setError]   = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  // Animate in when shown
  useEffect(() => {
    if (!showNameModal || !overlayRef.current || !cardRef.current) return;

    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo(cardRef.current,
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', delay: 0.1 }
    );

    // Auto-focus input after animation
    setTimeout(() => inputRef.current?.focus(), 700);
  }, [showNameModal]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setError('Por favor ingresa tu nombre para continuar.');
      gsap.fromTo(cardRef.current,
        { x: -6 }, { x: 6, duration: 0.08, repeat: 5, yoyo: true, clearProps: 'x' }
      );
      return;
    }

    // Animate out then store
    gsap.to(cardRef.current,    { y: -20, opacity: 0, scale: 0.97, duration: 0.35, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.45, delay: 0.2, ease: 'power2.in',
      onComplete: () => setGuestName(trimmed),
    });
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
    if (error) setError('');
  };

  if (!showNameModal) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <div
        ref={cardRef}
        style={{
          background: 'linear-gradient(145deg, #1a1008 0%, #0d0b06 100%)',
          border: '1px solid rgba(201,169,110,0.3)',
          borderRadius: '4px',
          padding: '2.5rem 2rem',
          width: 'min(90vw, 380px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Logo */}
        <SendaCoffeLogo width={120} color="#F5EDD8" beanDark="#5c3010" beanLight="#F5EDD8" />

        {/* Heading */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.5rem',
            fontWeight: 300,
            color: '#F5EDD8',
            margin: '0 0 0.4rem',
            fontStyle: 'italic',
          }}>
            Bienvenido/a
          </p>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '0.82rem',
            color: 'rgba(245,237,216,0.55)',
            letterSpacing: '0.12em',
            margin: 0,
          }}>
            ¿CUÁL ES TU NOMBRE?
          </p>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(''); }}
          onKeyDown={handleKey}
          placeholder="Tu nombre"
          maxLength={40}
          style={{
            width: '100%',
            background: 'rgba(245,237,216,0.07)',
            border: `1px solid ${error ? 'rgba(220,80,60,0.7)' : 'rgba(201,169,110,0.35)'}`,
            borderRadius: '2px',
            padding: '0.75rem 1rem',
            color: '#F5EDD8',
            fontFamily: 'Georgia, serif',
            fontSize: '1.1rem',
            outline: 'none',
            textAlign: 'center',
            letterSpacing: '0.05em',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => e.target.style.borderColor = 'rgba(201,169,110,0.7)'}
          onBlur={(e)  => e.target.style.borderColor = error
            ? 'rgba(220,80,60,0.7)' : 'rgba(201,169,110,0.35)'}
        />

        {/* Error */}
        {error && (
          <p style={{
            margin: '-0.8rem 0 0',
            color: 'rgba(220,100,80,0.9)',
            fontSize: '0.78rem',
            fontFamily: 'Georgia, serif',
          }}>
            {error}
          </p>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '0.85rem 1.5rem',
            background: 'linear-gradient(135deg, #2a4a20 0%, #1a3010 100%)',
            border: '1px solid rgba(201,169,110,0.4)',
            borderRadius: '2px',
            color: '#F5EDD8',
            fontFamily: 'Georgia, serif',
            fontSize: '0.85rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'background 0.3s, border-color 0.3s',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.background = 'linear-gradient(135deg, #3a6030 0%, #254520 100%)';
            (e.target as HTMLButtonElement).style.borderColor = 'rgba(201,169,110,0.75)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.background = 'linear-gradient(135deg, #2a4a20 0%, #1a3010 100%)';
            (e.target as HTMLButtonElement).style.borderColor = 'rgba(201,169,110,0.4)';
          }}
        >
          Ingresar ✦
        </button>

        {/* Decorative note */}
        <p style={{
          margin: 0,
          fontFamily: 'Georgia, serif',
          fontSize: '0.7rem',
          color: 'rgba(245,237,216,0.25)',
          letterSpacing: '0.1em',
          textAlign: 'center',
        }}>
          Senda Coffee · Jardín Cocinarte
        </p>
      </div>
    </div>
  );
}
