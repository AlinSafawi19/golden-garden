/**
 * Golden Garden — logo lockup.
 *
 * Uses the site's existing leaf mark (see public/leaf-icon.svg) — a three-leaflet
 * leaf with a short stem — locked to a Libre Caslon Condensed wordmark. Colour
 * follows the same convention as the rest of the UI: coral on light grounds,
 * off-white on dark grounds.
 */

type Tone = "onLight" | "onDark";

const PALETTE: Record<Tone, { leaf: string; word: string }> = {
  onLight: { leaf: "#E8634A", word: "#121212" }, // coral leaf (matches leaf-icon.svg)
  onDark: { leaf: "#FAFAFA", word: "#F6F6F6" }, // off-white leaf (matches leaf-icon-light.svg)
};

export function LeafMark({
  tone = "onLight",
  size = 40,
  color,
  decorative = true,
}: {
  tone?: Tone;
  size?: number;
  color?: string;
  decorative?: boolean;
}) {
  const fill = color ?? PALETTE[tone].leaf;
  return (
    <svg
      width={size}
      height={size}
      viewBox="3 1 26 26"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Golden Garden"}
      style={{ flexShrink: 0, display: "block" }}
    >
      <g transform="translate(16, 22)">
        <ellipse cx="0" cy="-8" rx="3" ry="8" fill={fill} transform="rotate(-27)" />
        <ellipse cx="0" cy="-10" rx="4" ry="10" fill={fill} />
        <ellipse cx="0" cy="-8" rx="3" ry="8" fill={fill} transform="rotate(27)" />
        <line x1="0" y1="1" x2="0" y2="4" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function Logo({
  tone = "onLight",
  symbolSize = 40,
  withWordmark = true,
  className,
}: {
  tone?: Tone;
  symbolSize?: number;
  withWordmark?: boolean;
  className?: string;
}) {
  const { word } = PALETTE[tone];
  const wordSize = Math.round(symbolSize * 0.46);

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: symbolSize * 0.26 }}
    >
      <LeafMark tone={tone} size={symbolSize} decorative={withWordmark} />
      {withWordmark && (
        <span
          style={{
            fontFamily: "var(--font-heading), serif",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            lineHeight: 0.9,
            color: word,
            fontSize: wordSize,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Golden</span>
          <span>Garden</span>
        </span>
      )}
    </span>
  );
}
