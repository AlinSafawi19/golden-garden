"use client";

import { useState } from "react";

const IMG_HOVER = "transform 0.7s cubic-bezier(0.34, 1.1, 0.64, 1)";

const projectMeta = [
  { label: "Client", value: "Gondi Brand .inc" },
  { label: "Location", value: "Location Chicago, IL" },
  { label: "Time Duration", value: "8 months" },
  { label: "Square Meters", value: "120,00m²" },
  { label: "Category", value: "Garden Renovation" },
];

const galleryImages = [
  "https://framerusercontent.com/images/oGkX2RkjS2giO3LYKGgdUgmc.png?width=630&height=548",
  "https://framerusercontent.com/images/zIkuQ00R6XIdwYbulMq2273r8KE.png?width=632&height=548",
  "https://framerusercontent.com/images/VcMofmCcyuafhNq0p7iK0RtVTbs.png?width=630&height=546",
  "https://framerusercontent.com/images/QG4yJCnyB7EbPwfi6Hib3zrVFg4.png?width=632&height=548",
];

export default function ProjectDetailsContent() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [openSrc, setOpenSrc] = useState<string | null>(null);

  const imgStyle = (key: string) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    display: "block",
    transition: IMG_HOVER,
    transform: hovered === key ? "scale(1.1)" : "scale(1)",
  });

  return (
    <div className="flex flex-col gap-[40px] tablet:gap-[60px] desktop:gap-[68px]">

      {/* Meta row */}
      <div className="flex flex-col gap-[15px] tablet:flex-row tablet:flex-wrap tablet:items-start tablet:justify-center tablet:gap-[20px]">
        {projectMeta.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-[6px] text-left tablet:text-center">
            <span className="body-16-regular" style={{ color: "#464646" }}>
              {label}
            </span>
            <span className="body-20-regular" style={{ color: "var(--color-near-black)" }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Feature image */}
      <div
        style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "16/9", cursor: "zoom-in" }}
        onMouseEnter={() => setHovered("feature")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => setOpenSrc("https://framerusercontent.com/images/HTojjv0KgmKSLldV2quyEE9fk94.png?width=834&height=468")}
      >
        <img
          src="https://framerusercontent.com/images/HTojjv0KgmKSLldV2quyEE9fk94.png?width=834&height=468"
          alt="Project feature"
          style={imgStyle("feature")}
        />
      </div>

      {/* Gallery — left/right on desktop, stacked (right on top) on mobile */}
      <div className="flex flex-col tablet:flex-row gap-[20px]">
        {/* Left side — single card with hover scaling */}
        <div
          className="flex-1"
          style={{ borderRadius: 12, overflow: "hidden", cursor: "zoom-in" }}
          onMouseEnter={() => setHovered("left")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setOpenSrc("https://framerusercontent.com/images/caq0E4VM1chAql8eJuTN6Bz99vk.png?width=1232&height=1134")}
        >
          <img
            src="https://framerusercontent.com/images/caq0E4VM1chAql8eJuTN6Bz99vk.png?width=1232&height=1134"
            alt="Project gallery"
            style={imgStyle("left")}
          />
        </div>

        {/* Right side — 2x2 grid */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-[20px] self-stretch">
          {galleryImages.map((src, i) => (
            <div
              key={src + i}
              className="min-h-0"
              style={{ borderRadius: 12, overflow: "hidden", cursor: "zoom-in" }}
              onMouseEnter={() => setHovered(`grid-${i}`)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setOpenSrc(src)}
            >
              <img
                src={src}
                alt={`Project gallery ${i + 1}`}
                style={imgStyle(`grid-${i}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {openSrc && (
        <div
          onClick={() => setOpenSrc(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
            cursor: "zoom-out",
          }}
        >
          <img
            src={openSrc}
            alt="Project preview"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: 12,
              display: "block",
              cursor: "zoom-out",
            }}
          />
        </div>
      )}

    </div>
  );
}
