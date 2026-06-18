type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 180 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Golden Garden"
      role="img"
    >
      {/* Botanical mark: three-leaf sprig */}
      <g transform="translate(20, 38)">
        {/* Left leaf */}
        <ellipse
          cx="0" cy="-14" rx="5.5" ry="14"
          fill="var(--color-dark-teal)"
          transform="rotate(-27)"
        />
        {/* Center leaf (tallest) */}
        <ellipse
          cx="0" cy="-18" rx="7" ry="18"
          fill="var(--color-dark-teal)"
        />
        {/* Right leaf */}
        <ellipse
          cx="0" cy="-14" rx="5.5" ry="14"
          fill="var(--color-dark-teal)"
          transform="rotate(27)"
        />
        {/* Mint midrib on center leaf */}
        <line
          x1="0" y1="-2" x2="0" y2="-34"
          stroke="var(--color-mint-green)"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        {/* Stem */}
        <line
          x1="0" y1="0.5" x2="0" y2="4"
          stroke="var(--color-dark-teal)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* Mint accent divider */}
      <line
        x1="44" y1="9" x2="44" y2="36"
        stroke="var(--color-mint-green)"
        strokeWidth="0.75"
      />

      {/* Wordmark — font resolves from document CSS, inheriting the loaded Libre Caslon Condensed */}
      <text
        x="55"
        y="24"
        style={{
          fontFamily: "var(--font-heading), serif",
          fontSize: "12px",
          fontWeight: 500,
          fill: "var(--color-dark-teal)",
          letterSpacing: "4px",
        }}
      >
        GOLDEN
      </text>
      <text
        x="55"
        y="38"
        style={{
          fontFamily: "var(--font-heading), serif",
          fontSize: "12px",
          fontWeight: 500,
          fill: "var(--color-dark-teal)",
          letterSpacing: "4px",
        }}
      >
        GARDEN
      </text>
    </svg>
  );
}
