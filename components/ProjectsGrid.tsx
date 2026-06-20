"use client";

import { useState } from "react";
import Link from "next/link";

const IMG_HOVER = "transform 0.7s cubic-bezier(0.34, 1.1, 0.64, 1)";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const projects = [
  {
    src: "https://framerusercontent.com/images/HTojjv0KgmKSLldV2quyEE9fk94.png?width=834&height=468",
    alt: "Garden Retreat",
    label: "Garden Retreat",
  },
  {
    src: "https://framerusercontent.com/images/zIkuQ00R6XIdwYbulMq2273r8KE.png?width=632&height=548",
    alt: "Floral Escape",
    label: "Floral Escape",
  },
  {
    src: "https://framerusercontent.com/images/fG1ZD4lkbjilbwcpgCVu0sfdL0.png?width=832&height=468",
    alt: "Vegetable Garden",
    label: "Vegetable Garden",
  },
  {
    src: "https://framerusercontent.com/images/jrFLcjdKkGbSxSbWCWT2CyqFl4o.png?width=834&height=468",
    alt: "Boom Heaven",
    label: "Boom Heaven",
  },
  {
    src: "https://framerusercontent.com/images/HTojjv0KgmKSLldV2quyEE9fk94.png?width=834&height=468",
    alt: "Urban Oasis",
    label: "Urban Oasis",
  },
  {
    src: "https://framerusercontent.com/images/fG1ZD4lkbjilbwcpgCVu0sfdL0.png?width=832&height=468",
    alt: "Courtyard Bloom",
    label: "Courtyard Bloom",
  },
];

export default function ProjectsGrid() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-3 gap-[24px] tablet:gap-x-[24px] tablet:gap-y-[40px] desktop:gap-x-[24px] desktop:gap-y-[48px]">
      {projects.map((card, i) => (
        <Link
          key={card.alt}
          href={`/projects/${slugify(card.label)}`}
          className="flex flex-col gap-[16px] no-underline"
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setHoveredCard(i)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "16/9" }}>
            <img
              src={card.src}
              alt={card.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: IMG_HOVER, transform: hoveredCard === i ? "scale(1.1)" : "scale(1)" }}
            />
          </div>
          <h3 className="heading-3" style={{ textAlign: "center" }}>{card.label}</h3>
        </Link>
      ))}
    </div>
  );
}
