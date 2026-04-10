// SVG logo component based on the Senda Coffee brand
// Recreated to match brand style: "Senda" bold serif + "COFFE" arched + coffee beans

export default function SendaLogo({
  color = '#F5EDD8',
  width = 320,
  className = '',
}: {
  color?: string;
  width?: number;
  className?: string;
}) {
  const height = Math.round(width * 0.56);

  return (
    <svg
      viewBox="0 0 320 180"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Senda Coffee"
    >
      {/* SENDA - large serif display text */}
      <text
        x="10"
        y="120"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="110"
        fontWeight="700"
        fill={color}
        letterSpacing="-4"
        fontStyle="normal"
      >
        Senda
      </text>

      {/* COFFE - curved arc text in upper right */}
      <path
        id="coffeeArc"
        d="M 210 20 A 80 80 0 0 1 310 70"
        fill="none"
      />
      <text
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="14"
        fontWeight="400"
        fill={color}
        letterSpacing="3"
      >
        <textPath href="#coffeeArc" startOffset="5%">
          COFFE
        </textPath>
      </text>

      {/* Coffee beans group — centered below "Senda" */}
      {/* Main large bean (horizontal) */}
      <g transform="translate(88, 138) rotate(-15)">
        <ellipse cx="0" cy="0" rx="26" ry="12" fill={color} />
        <path
          d="M -22 0 Q 0 -5 22 0 Q 0 5 -22 0 Z"
          fill={color === '#F5EDD8' ? '#0e1a0e' : '#F5EDD8'}
          opacity="0.3"
        />
      </g>

      {/* Second bean (upper right) */}
      <g transform="translate(132, 128) rotate(25)">
        <ellipse cx="0" cy="0" rx="20" ry="9" fill={color} />
        <path
          d="M -17 0 Q 0 -4 17 0 Q 0 4 -17 0 Z"
          fill={color === '#F5EDD8' ? '#0e1a0e' : '#F5EDD8'}
          opacity="0.3"
        />
      </g>

      {/* Third bean (lower right, smaller) */}
      <g transform="translate(148, 152) rotate(40)">
        <ellipse cx="0" cy="0" rx="17" ry="7.5" fill={color} />
        <path
          d="M -14 0 Q 0 -3 14 0 Q 0 3 -14 0 Z"
          fill={color === '#F5EDD8' ? '#0e1a0e' : '#F5EDD8'}
          opacity="0.3"
        />
      </g>

      {/* Small bean accent */}
      <g transform="translate(70, 150) rotate(-30)">
        <ellipse cx="0" cy="0" rx="13" ry="6" fill={color} opacity="0.7" />
      </g>
    </svg>
  );
}
