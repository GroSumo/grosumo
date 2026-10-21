export default function Logo({ size = 36, dark = false }: { size?: number; dark?: boolean }) {
  const color = dark ? '#2EA87E' : '#1A7A5E';
  const textColor = dark ? '#FFFFFF' : '#0A0F0D';
  const scale = size / 36;
  const gW = 32 * scale;

  return (
    <svg
      width={size * 5.2}
      height={size * 1.4}
      viewBox={`0 0 ${size * 5.2} ${size * 1.4}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Grosumo"
    >
      {/* G = circular arrow mark */}
      <g transform={`translate(${size * 0.55}, ${size * 0.62})`}>
        <path
          d={`M 0 ${-gW * 0.58} A ${gW * 0.58} ${gW * 0.58} 0 1 1 ${gW * 0.5} ${gW * 0.29}`}
          stroke={color} strokeWidth={size * 0.14} strokeLinecap="round"
        />
        <polygon
          points={`${gW * 0.5},${gW * 0.29} ${gW * 0.25},${gW * 0.11} ${gW * 0.58},${0}`}
          fill={color}
        />
        <circle cx="0" cy={gW * 0.78} r={gW * 0.16} stroke={color} strokeWidth={size * 0.075} />
        <line x1="0" y1={gW * 0.92} x2="0" y2={gW * 0.63} stroke={color} strokeWidth={size * 0.065} strokeLinecap="round" />
        <polyline
          points={`${-gW * 0.1},${gW * 0.75} 0,${gW * 0.62} ${gW * 0.1},${gW * 0.75}`}
          stroke={color} strokeWidth={size * 0.065} strokeLinecap="round" strokeLinejoin="round"
        />
      </g>

      {/* rosum text */}
      <text
        x={size * 1.35}
        y={size * 0.85}
        style={{ fontFamily: 'var(--font-sans)' }}
        fontSize={size * 0.9}
        fontWeight="300"
        fill={textColor}
        letterSpacing={-0.5}
      >
        rosum
      </text>

      {/* Final O with upward arrow */}
      <circle
        cx={size * 4.42}
        cy={size * 0.5}
        r={size * 0.33}
        stroke={color}
        strokeWidth={size * 0.065}
      />
      <line
        x1={size * 4.42} y1={size * 0.72}
        x2={size * 4.42} y2={size * 0.28}
        stroke={color} strokeWidth={size * 0.065} strokeLinecap="round"
      />
      <polyline
        points={`${size * 4.28},${size * 0.44} ${size * 4.42},${size * 0.27} ${size * 4.56},${size * 0.44}`}
        stroke={color} strokeWidth={size * 0.065} strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}
