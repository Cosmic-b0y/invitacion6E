/**
 * Senda Coffee Logo — SVG component
 * Recreates: bold serif "SENDA" + small-caps "COFFE" + coffee bean
 */
export default function SendaCoffeLogo({
  width = 160,
  color = '#F5EDD8',
  beanDark = '#3D1C02',
  beanLight = '#F5EDD8',
  className = '',
  style = {},
}: {
  width?: number;
  color?: string;
  beanDark?: string;
  beanLight?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  // viewBox is 400 × 200 — wide enough for full "SENDA" at fontSize 110
  const h = Math.round(width * 0.5);

  return (
    <svg
      viewBox="0 0 400 200"
      width={width}
      height={h}
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Senda Coffee"
    >
      {/* ── Coffee bean — top right ──────────────────── */}
      <g transform="translate(358, 28) rotate(-15)">
        {/* back (light) half */}
        <ellipse cx="0" cy="2"  rx="22" ry="14" fill={beanLight} opacity="0.9" />
        {/* front (dark) half */}
        <ellipse cx="4" cy="-2" rx="20" ry="13" fill={beanDark} />
        {/* crease */}
        <path d="M -16 0 Q 2 -7 18 0" stroke={beanLight} strokeWidth="1.5" fill="none" opacity="0.55" />
      </g>

      {/* ── SENDA — large bold serif ─────────────────── */}
      <text
        x="6"
        y="138"
        fontFamily="Georgia, 'Times New Roman', 'Playfair Display', serif"
        fontSize="110"
        fontWeight="700"
        fill={color}
        letterSpacing="-1"
      >
        SENDA
      </text>

      {/* ── COFFE — small caps centred under SENDA ───── */}
      <text
        x="90"
        y="175"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="24"
        fontWeight="400"
        fill={color}
        letterSpacing="10"
      >
        COFFE
      </text>
    </svg>
  );
}
