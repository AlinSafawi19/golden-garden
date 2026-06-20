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

const accordionItems = [
  {
    number: "01",
    title: "Concept & Vision",
    body: "Bloom Heaven was envisioned as a vibrant and serene outdoor space where natural beauty meets thoughtful design. The goal was to create a garden that feels alive with color, texture, and seasonal blooms while offering a peaceful retreat from everyday life. By blending floral arrangements with open green areas, the project brings together relaxation and visual harmony in a truly inviting environment.",
  },
  {
    number: "02",
    title: "Design & Execution",
    body: "The design phase focused on balancing structure and softness, pairing clean architectural lines with layered planting schemes. Every element — from pathways to focal beds — was carefully placed to guide movement and frame views. Execution emphasized quality materials and sustainable practices, ensuring the garden would mature gracefully over the seasons.",
  },
  {
    number: "03",
    title: "Result & Experience",
    body: "The finished garden delivers an immersive sensory experience, where color, fragrance, and form change throughout the year. Visitors are met with intimate seating nooks, sweeping floral displays, and quiet corners for reflection. The result is a living space that feels both curated and effortlessly natural — a lasting retreat that rewards every return visit.",
  },
];

export default function ProjectDetailsContent() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const [openItem, setOpenItem] = useState(0);

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
      <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "16/9" }}>
        <img
          src="https://framerusercontent.com/images/HTojjv0KgmKSLldV2quyEE9fk94.png?width=834&height=468"
          alt="Project feature"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Accordion */}
      <div>
        {accordionItems.map((item, i) => {
          const isOpen = openItem === i;
          return (
            <div
              key={item.number}
              onClick={() => setOpenItem(isOpen ? -1 : i)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              style={{ borderBottom: "1px solid #D4D4D4", cursor: "pointer" }}
            >
              <div
                className="flex w-full items-center justify-between gap-[20px] text-left"
                style={{
                  padding: "52px 32px",
                  opacity: isOpen ? 1 : 0.4,
                  transition: "opacity 0.4s cubic-bezier(0.44, 0, 0.56, 1)",
                }}
              >
                <span className="flex items-baseline gap-[10px]">
                  <span className="heading-4b" style={{ color: "var(--color-near-black)" }}>
                    {item.number}
                  </span>
                  <span className="heading-4b" style={{ color: "var(--color-near-black)" }}>
                    {item.title}
                  </span>
                </span>
                <img
                  aria-hidden
                  src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 16 17%22><path d=%22M 7.059 0.5 L 7.059 7.559 L 0 7.559 L 0 8.971 L 7.059 8.971 L 7.059 16.029 L 8.471 16.029 L 8.471 8.971 L 15.529 8.971 L 15.529 7.559 L 8.471 7.559 L 8.471 0.5 Z%22 fill=%22rgb(18, 18, 18)%22></path></svg>'
                  alt=""
                  style={{
                    flexShrink: 0,
                    width: 16,
                    height: 17,
                    transform: `rotate(${isOpen ? 45 : 0}deg)`,
                    transition: "transform 0.4s cubic-bezier(0.44, 0, 0.56, 1)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.4s cubic-bezier(0.44, 0, 0.56, 1)",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <p className="body-16-regular-2 px-[32px] pb-[52px] tablet:pr-[80px]" style={{ color: "#464646", opacity: 0.7 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
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
