import Image from 'next/image';

/** Logo mark (white G-arrow on logo blue, from /public/logo.png) in a rounded tile, next to the wordmark. */
export default function Logo({ size = 36, dark = false }: { size?: number; dark?: boolean }) {
  const tile = Math.round(size * 1.25);

  return (
    <span className="inline-flex items-center" style={{ gap: size * 0.35 }}>
      <span
        className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand"
        style={{ width: tile, height: tile }}
      >
        <Image src="/logo.png" alt="Grosumo logo" width={tile} height={tile} className="size-full object-cover" />
      </span>
      <span
        aria-hidden
        className={`font-bold tracking-tight ${dark ? 'text-white' : 'text-ink'}`}
        style={{ fontSize: size * 0.85, lineHeight: 1 }}
      >
        grosumo
      </span>
    </span>
  );
}
