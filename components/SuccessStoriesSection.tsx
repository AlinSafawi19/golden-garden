"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SPRING =
  "opacity 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)";
const ARROW_TRANSITION = "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)";

const STARS_SRC = "data:image/svg+xml,<svg display='block' role='presentation' viewBox='0 0 20 4' xmlns='http://www.w3.org/2000/svg'><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.116 1.669 2.086 1.775 2.102 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.111 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(0.26 0.695)'/><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.116 1.669 2.086 1.775 2.102 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.111 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(4.479 0.695)'/><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.116 1.669 2.086 1.775 2.102 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.111 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(8.698 0.695)'/><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.116 1.669 2.086 1.775 2.102 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.111 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(12.917 0.695)'/><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.115 1.669 2.085 1.775 2.103 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.11 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(17.135 0.695)'/></svg>";

const Stars = () => (
  <img src={STARS_SRC} alt="5 stars" width={128} height={26} style={{ display: "block" }} />
);

const successStories = [
  {
    quote: "Our backyard has completely transformed into a peaceful retreat. The attention to detail and care they put into every corner truly exceeded our expectations.",
    name: "Savannah Nguyen",
    location: "Houston, TX",
    image: "https://framerusercontent.com/images/ClFmQB14W7crwd6VdHlYJBcbE.png?scale-down-to=1024&width=904&height=1200",
  },
  {
    quote: "From design to maintenance, everything was handled professionally. Our garden looks stunning all year round, and we couldn't be happier with the results.",
    name: "Ethan Brooks",
    location: "Denver, CO",
    image: "https://framerusercontent.com/images/rQ92osCGkMe2Ovjsyh4pAgYnzsM.png?width=332&height=332",
  },
  {
    quote: "They understood exactly what we wanted and brought our vision to life beautifully. The space feels fresh, vibrant, and perfectly designed for our lifestyle.",
    name: "Isabella Chen",
    location: "San Jose, CA",
    image: "https://framerusercontent.com/images/6LVLDyL2L9I0uyNZafNkMhK1k.png?width=332&height=332",
  },
];

const CARD_GAP = 24;

export default function SuccessStoriesSection() {
  const ref = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [cardWidth, setCardWidth] = useState(636);
  const [overflow, setOverflow] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Measure card width and the horizontal overflow distance within the content container
  useEffect(() => {
    const measure = () => {
      const sticky = stickyRef.current;
      const clip = clipRef.current;
      if (!sticky || !clip) return;
      const vw = sticky.clientWidth;
      const mobile = vw < 810;
      const cw = vw >= 1200 ? 636 : vw >= 810 ? 560 : Math.min(300, vw - 80);
      const cardsWidth =
        successStories.length * cw + (successStories.length - 1) * CARD_GAP;
      setIsMobile(mobile);
      setCardWidth(cw);
      setOverflow(Math.max(0, cardsWidth - clip.clientWidth));
      setContentHeight(sticky.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // While the section is pinned, drive the horizontal translate from how far
  // we've scrolled into the over-tall track (rect.top goes 0 -> -overflow).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleScroll = () => {
      if (overflow <= 0) {
        setTranslate(0);
        return;
      }
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / overflow));
      setTranslate(-progress * overflow);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [overflow]);

  const headerTop = (
    <div
      className="w-full flex flex-col gap-[24px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        transition: SPRING,
      }}
    >
      <div className="flex flex-row justify-start items-center gap-[16px]">
        <Image src="/leaf-icon.svg" alt="" width={20} height={20} style={{ flexShrink: 0 }} />
        <span className="body-16-regular">Success Stories</span>
      </div>
    </div>
  );

  // Divider + title + CTA — this is where the sticky pin begins
  const headerMain = (
    <div
      className="w-full flex flex-col gap-[24px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        transition: SPRING,
      }}
    >
      <div style={{ width: "100%", height: 1, backgroundColor: "var(--color-light-gray)" }} />
      <h2 className="heading-1b tablet:max-w-[826px]" style={{ color: "var(--color-near-black)" }}>Happy Client Stories.</h2>
      <Link
        href="/success-stories"
        className="cta-link inline-flex items-center gap-[8px] no-underline"
        onMouseEnter={() => setCtaHovered(true)}
        onMouseLeave={() => setCtaHovered(false)}
        style={{ color: "var(--color-dark-gray)", transition: "color 0.6s cubic-bezier(0.44, 0, 0.56, 1)" }}
      >
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1 }}>[</span>
        <span className="body-16-regular" style={{ color: "var(--color-dark-gray)" }}>MORE STORIES</span>
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
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1 }}>]</span>
      </Link>
    </div>
  );

  // Big card — image left, content right (tablet + desktop)
  const bigCard = (t: (typeof successStories)[number], key: number) => (
    <div
      key={key}
      className="flex flex-row gap-[20px] items-start shrink-0"
      style={{ width: cardWidth, backgroundColor: "var(--color-white)", borderRadius: 12, padding: "28px 30px" }}
    >
      <div className="flex-shrink-0">
        <img src={t.image} alt={t.name} className="object-cover" style={{ width: 166, height: 166, maxWidth: 166, borderRadius: 12 }} />
      </div>
      <div className="flex flex-col gap-[16px]">
        <Stars />
        <p className="heading-4b" style={{ color: "var(--color-black)" }}>{t.quote}</p>
        <div className="flex flex-col gap-[4px]">
          <span className="heading-4b" style={{ color: "var(--color-black)" }}>{t.name}</span>
          <span className="body-16-regular" style={{ color: "#464646" }}>{t.location}</span>
        </div>
      </div>
    </div>
  );

  // Small card — image on top, content below (mobile)
  const smallCard = (t: (typeof successStories)[number], key: number) => (
    <div
      key={key}
      className="flex flex-col gap-[20px] p-[20px] shrink-0"
      style={{ width: cardWidth, backgroundColor: "var(--color-white)", borderRadius: 12 }}
    >
      <img src={t.image} alt={t.name} className="object-cover" style={{ borderRadius: 12, width: 166, height: 166 }} />
      <div className="flex flex-col gap-[16px]">
        <Stars />
        <p className="heading-4b" style={{ color: "var(--color-black)" }}>{t.quote}</p>
        <div className="flex flex-col gap-[4px]">
          <span className="heading-4b" style={{ color: "var(--color-black)" }}>{t.name}</span>
          <span className="body-16-regular" style={{ color: "#464646" }}>{t.location}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={ref} className="w-full" style={{ backgroundColor: "var(--color-soft-white)" }}>
      {/* Tag + divider scroll away normally — the pin starts at the title below */}
      <div className="max-w-[1296px] mx-auto w-full px-[20px] tablet:px-[30px] pt-[60px] tablet:pt-[80px] desktop:pt-[120px]">
        {headerTop}
      </div>

      {/* Over-tall track: its extra height equals the horizontal overflow, so the
          pinned content (title + cards) stays put while the cards scroll across */}
      <div ref={sectionRef} style={overflow > 0 ? { height: `${contentHeight + overflow}px` } : undefined}>
        <div
          ref={stickyRef}
          style={overflow > 0 ? { position: "sticky", top: 0 } : undefined}
        >
          <div className="max-w-[1296px] mx-auto w-full px-[20px] tablet:px-[30px] pt-[24px] pb-[60px] tablet:pb-[80px] desktop:pb-[120px] flex flex-col gap-[24px] desktop:gap-[40px]">
            {headerMain}

            <div ref={clipRef} className="overflow-hidden">
              <div
                className="flex items-stretch"
                style={{
                  gap: CARD_GAP,
                  transform: `translateX(${translate}px)`,
                  willChange: "transform",
                }}
              >
                {successStories.map((t, i) => (isMobile ? smallCard(t, i) : bigCard(t, i)))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
