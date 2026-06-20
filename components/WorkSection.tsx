"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ARROW_TRANSITION = "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)";
const IMG_HOVER = "transform 0.7s cubic-bezier(0.34, 1.1, 0.64, 1)";

const cards = [
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
];

type CenterOffsets = {
  topLeft: [number, number];
  topRight: [number, number];
  bottomLeft: [number, number];
  bottomRight: [number, number];
};

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [centerOffsets, setCenterOffsets] = useState<CenterOffsets | null>(null);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1200px)");
    setIsDesktop(mqDesktop.matches);
    const desktopHandler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mqDesktop.addEventListener("change", desktopHandler);

    const mqTablet = window.matchMedia("(min-width: 810px)");
    setIsMobile(!mqTablet.matches);
    const tabletHandler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mqTablet.addEventListener("change", tabletHandler);

    return () => {
      mqDesktop.removeEventListener("change", desktopHandler);
      mqTablet.removeEventListener("change", tabletHandler);
    };
  }, []);

  // Compute exact offsets so all 4 cards converge to the same center point at p=0
  useEffect(() => {
    if (!isDesktop) return;
    const compute = () => {
      const section = sectionRef.current;
      if (!section) return;
      const cw = Math.min(section.clientWidth, 1296);
      const vh = window.innerHeight;
      const cardW = 417;
      const cardH = cardContentRef.current?.clientHeight ?? 292;
      const cx = cw / 2;
      const cy = vh / 2;

      // offset = distance each card's center must move to reach container center
      const tlX = cx - (30 + cardW / 2);
      const tlY = cy - (vh * 0.05 + cardH / 2);
      setCenterOffsets({
        topLeft:     [tlX,   tlY],
        topRight:    [-tlX,  tlY],
        bottomLeft:  [tlX,  -tlY],
        bottomRight: [-tlX, -tlY],
      });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [isDesktop]);

  // Scroll progress: 0 when section top hits viewport top, 1 after scrolling through spacer
  useEffect(() => {
    if (!isDesktop) return;
    const section = sectionRef.current;
    if (!section) return;
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / window.innerHeight));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  // Smoothstep easing for natural feel
  const p = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);

  const cardTransform = (key: keyof CenterOffsets, fallback: [number, number]) => {
    if (!isDesktop) return "translate(0,0)";
    const [ox, oy] = centerOffsets?.[key] ?? fallback;
    return `translate(${ox * (1 - p)}px, ${oy * (1 - p)}px)`;
  };

  const ctaLink = (
    <Link
      href="/projects"
      className="cta-link inline-flex items-center gap-[8px] no-underline"
      onMouseEnter={() => setCtaHovered(true)}
      onMouseLeave={() => setCtaHovered(false)}
      style={{ color: "var(--color-off-white)", transition: "color 0.6s cubic-bezier(0.44, 0, 0.56, 1)" }}
    >
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1, color: "var(--color-mint-green)" }}>[</span>
      <span className="body-16-regular" style={{ color: "var(--color-off-white)" }}>VIEW PROJECTS</span>
      <span aria-hidden="true" style={{ display: "inline-block", position: "relative", width: 20, height: 20, overflow: "hidden", flexShrink: 0 }}>
        <span style={{ position: "absolute", inset: 0, display: "flex", transition: ARROW_TRANSITION, transform: ctaHovered ? "translate(110%, -110%)" : "translate(0, 0)" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 15 0 L 15 10.5 L 13.637 10.5 L 13.637 2.5 L 1.5 15.5 L 0 14.088 L 12.5 1.5 L 3.729 1.5 L 3.729 0 Z" fill="currentColor" transform="translate(2.363 2.5)" />
          </svg>
        </span>
        <span style={{ position: "absolute", inset: 0, display: "flex", transition: ARROW_TRANSITION, transform: ctaHovered ? "translate(0, 0)" : "translate(-110%, 110%)" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 15 0 L 15 10.5 L 13.637 10.5 L 13.637 2.5 L 1.5 15.5 L 0 14.088 L 12.5 1.5 L 3.729 1.5 L 3.729 0 Z" fill="currentColor" transform="translate(2.363 2.5)" />
          </svg>
        </span>
      </span>
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1, color: "var(--color-mint-green)" }}>]</span>
    </Link>
  );

  return (
    <section
      id="work-scroll"
      ref={sectionRef}
      className="w-full"
      style={{ backgroundColor: "var(--color-dark-teal)" }}
    >
      {/* Mobile layout */}
      <div className="block tablet:hidden px-[20px] py-[60px]">
        <div className="flex flex-col gap-[10px] items-center mb-[40px]">
          <h2 className="heading-1b" style={{ color: "#ffffff" }}>[OUR WORK]</h2>
          {ctaLink}
        </div>
        <div className="flex flex-col gap-[32px]">
          {cards.map((card, i) => (
            <div
              key={card.alt}
              className="flex flex-col gap-[16px]"
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
              <h3 className="heading-2b" style={{ color: "#ffffff", textAlign: "center" }}>{card.label}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet+ layout */}
      {!isMobile && <div>
        <div
          className="relative desktop:sticky max-w-[1296px] mx-auto desktop:top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden"
        >
          {/* Center text — scales in as cards spread out */}
          <div
            className="flex flex-col gap-[10px] items-center"
            style={{
              transform: isDesktop ? `scale(${p})` : "scale(1)",
            }}
          >
            <h2 className="heading-1b" style={{ color: "#ffffff" }}>[OUR WORK]</h2>
            {ctaLink}
          </div>

          {/* Garden Retreat — top left */}
          <div
            className="absolute"
            style={{
              top: "5%",
              left: "30px",
              width: isDesktop ? 417 : 300,
              transform: cardTransform("topLeft", [410, 260]),
              willChange: "transform",
            }}
          >
            <div ref={cardContentRef} className="flex flex-col gap-[16px]" style={{ backgroundColor: "var(--color-dark-teal)", borderRadius: 12, cursor: "pointer" }} onMouseEnter={() => setHoveredCard(0)} onMouseLeave={() => setHoveredCard(null)}>
              <div style={{ height: isDesktop ? 220 : 160, borderRadius: 12, overflow: "hidden" }}>
                <img src={cards[0].src} alt={cards[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: IMG_HOVER, transform: hoveredCard === 0 ? "scale(1.1)" : "scale(1)" }} />
              </div>
              <h3 className="heading-2b" style={{ color: "#ffffff", textAlign: "center", paddingBottom: 16 }}>{cards[0].label}</h3>
            </div>
          </div>

          {/* Floral Escape — top right */}
          <div
            className="absolute"
            style={{
              top: "5%",
              right: "30px",
              width: isDesktop ? 417 : 300,
              transform: cardTransform("topRight", [-410, 260]),
              willChange: "transform",
            }}
          >
            <div className="flex flex-col gap-[16px]" style={{ backgroundColor: "var(--color-dark-teal)", borderRadius: 12, cursor: "pointer" }} onMouseEnter={() => setHoveredCard(1)} onMouseLeave={() => setHoveredCard(null)}>
              <div style={{ height: isDesktop ? 220 : 160, borderRadius: 12, overflow: "hidden" }}>
                <img src={cards[1].src} alt={cards[1].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: IMG_HOVER, transform: hoveredCard === 1 ? "scale(1.1)" : "scale(1)" }} />
              </div>
              <h3 className="heading-2b" style={{ color: "#ffffff", textAlign: "center", paddingBottom: 16 }}>{cards[1].label}</h3>
            </div>
          </div>

          {/* Vegetable Garden — bottom left */}
          <div
            className="absolute"
            style={{
              bottom: "5%",
              left: "30px",
              width: isDesktop ? 417 : 300,
              transform: cardTransform("bottomLeft", [410, -260]),
              willChange: "transform",
            }}
          >
            <div className="flex flex-col gap-[16px]" style={{ backgroundColor: "var(--color-dark-teal)", borderRadius: 12, cursor: "pointer" }} onMouseEnter={() => setHoveredCard(2)} onMouseLeave={() => setHoveredCard(null)}>
              <div style={{ height: isDesktop ? 220 : 160, borderRadius: 12, overflow: "hidden" }}>
                <img src={cards[2].src} alt={cards[2].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: IMG_HOVER, transform: hoveredCard === 2 ? "scale(1.1)" : "scale(1)" }} />
              </div>
              <h3 className="heading-2b" style={{ color: "#ffffff", textAlign: "center", paddingBottom: 16 }}>{cards[2].label}</h3>
            </div>
          </div>

          {/* Boom Heaven — bottom right */}
          <div
            className="absolute"
            style={{
              bottom: "5%",
              right: "30px",
              width: isDesktop ? 417 : 300,
              transform: cardTransform("bottomRight", [-410, -260]),
              willChange: "transform",
            }}
          >
            <div className="flex flex-col gap-[16px]" style={{ backgroundColor: "var(--color-dark-teal)", borderRadius: 12, cursor: "pointer" }} onMouseEnter={() => setHoveredCard(3)} onMouseLeave={() => setHoveredCard(null)}>
              <div style={{ height: isDesktop ? 220 : 160, borderRadius: 12, overflow: "hidden" }}>
                <img src={cards[3].src} alt={cards[3].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: IMG_HOVER, transform: hoveredCard === 3 ? "scale(1.1)" : "scale(1)" }} />
              </div>
              <h3 className="heading-2b" style={{ color: "#ffffff", textAlign: "center", paddingBottom: 16 }}>{cards[3].label}</h3>
            </div>
          </div>
        </div>

        <div
          id="work-scroll-content"
          className="w-full max-w-[1296px] mx-auto hidden desktop:block"
          style={{ height: "100vh", transform: "translateY(0px)", pointerEvents: "none" }}
        />
      </div>}
    </section>
  );
}
