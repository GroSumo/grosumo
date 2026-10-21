export default function Logo({ size = 36, dark = false }: { size?: number; dark?: boolean }) {
  const color = dark ? '#2EA87E' : '#1A7A5E';
  const textColor = dark ? '#FFFFFF' : '#0A0F0D';
  const o = size * 0.8;

  return (
    <span
      role="img"
      aria-label="Grosumo"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.04,
        fontFamily: 'var(--font-sans)',
        fontSize: size * 0.9,
        fontWeight: 300,
        letterSpacing: -0.5,
        lineHeight: 1,
        color: textColor,
      }}
    >
      <span aria-hidden>grosum</span>

      {/* Final O with upward arrow */}
      <svg aria-hidden width={o} height={o} viewBox="-0.4 -0.4 0.8 0.8" fill="none" style={{ marginTop: size * 0.08 }}>
        <circle cx="0" cy="0" r="0.33" stroke={color} strokeWidth="0.065" />
        <line x1="0" y1="0.22" x2="0" y2="-0.22" stroke={color} strokeWidth="0.065" strokeLinecap="round" />
        <polyline points="-0.14,-0.06 0,-0.23 0.14,-0.06" stroke={color} strokeWidth="0.065" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
