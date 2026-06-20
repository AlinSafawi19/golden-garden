"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SPRING =
  "opacity 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)";
const CARD_HOVER = "transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)";
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


export default function SuccessStoriesSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);

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

  useEffect(() => {
    if (!visible) return;
    const duration = 1800;
    const target = 2000;
    const start = performance.now();
    let raf: number;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  return (
    <section
      ref={ref}
      className="w-full flex flex-col pt-[60px] px-[20px] pb-[60px] tablet:pt-[80px] tablet:px-[30px] tablet:pb-[80px] desktop:pt-[150px] desktop:px-[30px] desktop:pb-[150px]"
      style={{ backgroundColor: "var(--color-soft-white)" }}
    >
      {/* Header */}
      <div
        className="w-full max-w-[1296px] mx-auto flex flex-col gap-[24px]"
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

      {/* Cards */}
      <div
        className="w-full max-w-[1296px] mx-auto mt-[40px] tablet:mt-[60px] desktop:mt-[72px]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(30px)",
          transition: SPRING,
        }}
      >
        {/* Mobile + Tablet: stacked */}
        <div className="flex flex-col gap-[24px] tablet:hidden">
          {/* Big card — vertical on mobile, horizontal on tablet+ */}
          <div className="flex flex-col tablet:flex-row gap-[20px] items-start" style={{ backgroundColor: "var(--color-white)", borderRadius: 12, padding: "66px 30px", cursor: "pointer", transition: CARD_HOVER, transform: hoveredStory === 0 ? "scale(1.02)" : "scale(1)" }} onMouseEnter={() => setHoveredStory(0)} onMouseLeave={() => setHoveredStory(null)}>
            <div className="flex-shrink-0">
              <img src={successStories[0].image} alt={successStories[0].name} className="object-cover tablet:max-w-[166px]" style={{ width: 166, height: 166, borderRadius: 12 }} />
            </div>
            <div className="flex flex-col gap-[25px]">
              <Stars />
              <p className="heading-4b" style={{ color: "var(--color-black)" }}>{successStories[0].quote}</p>
              <div className="flex flex-col gap-[4px]">
                <span className="heading-4b" style={{ color: "var(--color-black)" }}>{successStories[0].name}</span>
                <span className="body-16-regular" style={{ color: "#464646" }}>{successStories[0].location}</span>
              </div>
            </div>
          </div>

          {/* Small cards — vertical (same as desktop) */}
          {[successStories[1], successStories[2]].map((t, i) => (
            <div key={i} className="flex flex-col gap-[20px] p-[20px]" style={{ backgroundColor: "var(--color-white)", borderRadius: 12, cursor: "pointer", transition: CARD_HOVER, transform: hoveredStory === i + 1 ? "scale(1.02)" : "scale(1)" }} onMouseEnter={() => setHoveredStory(i + 1)} onMouseLeave={() => setHoveredStory(null)}>
              <img src={t.image} alt={t.name} className="object-cover" style={{ borderRadius: 12, width: 166, height: 166 }} />
              <div className="flex flex-col gap-[20px]">
                <Stars />
                <p className="heading-4b" style={{ color: "var(--color-black)" }}>{t.quote}</p>
                <div className="flex flex-col gap-[4px]">
                  <span className="heading-4b" style={{ color: "var(--color-black)" }}>{t.name}</span>
                  <span className="body-16-regular" style={{ color: "#464646" }}>{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet: 3 small cards in a row */}
        <div className="hidden tablet:flex desktop:hidden gap-[24px]">
          {successStories.map((t, i) => (
            <div key={i} className="flex flex-col gap-[20px] p-[20px]" style={{ flex: 1, backgroundColor: "var(--color-white)", borderRadius: 12, cursor: "pointer", transition: CARD_HOVER, transform: hoveredStory === i ? "scale(1.02)" : "scale(1)" }} onMouseEnter={() => setHoveredStory(i)} onMouseLeave={() => setHoveredStory(null)}>
              <img src={t.image} alt={t.name} className="object-cover" style={{ borderRadius: 12, width: 166, height: 166 }} />
              <div className="flex flex-col gap-[20px]">
                <Stars />
                <p className="heading-4b" style={{ color: "var(--color-black)" }}>{t.quote}</p>
                <div className="flex flex-col gap-[4px]">
                  <span className="heading-4b" style={{ color: "var(--color-black)" }}>{t.name}</span>
                  <span className="body-16-regular" style={{ color: "#464646" }}>{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: left col (big card + stat card) + right col (two small cards) */}
        <div className="hidden desktop:flex gap-x-[24px] gap-y-[24px]">
          {/* Left column */}
          <div className="flex flex-col gap-[24px]" style={{ flex: "636 0 0px" }}>
            {/* Big card */}
            <div className="flex flex-row gap-[20px] items-start" style={{ backgroundColor: "var(--color-white)", borderRadius: 12, padding: "66px 30px", cursor: "pointer", transition: CARD_HOVER, transform: hoveredStory === 0 ? "scale(1.02)" : "scale(1)" }} onMouseEnter={() => setHoveredStory(0)} onMouseLeave={() => setHoveredStory(null)}>
              <div className="flex-shrink-0">
                <img src={successStories[0].image} alt={successStories[0].name} className="object-cover" style={{ width: 166, height: 166, maxWidth: 166, borderRadius: 12 }} />
              </div>
              <div className="flex flex-col gap-[25px]">
                <Stars />
                <p className="heading-4b" style={{ color: "var(--color-black)" }}>{successStories[0].quote}</p>
                <div className="flex flex-col gap-[4px]">
                  <span className="heading-4b" style={{ color: "var(--color-black)" }}>{successStories[0].name}</span>
                  <span className="body-16-regular" style={{ color: "#464646" }}>{successStories[0].location}</span>
                </div>
              </div>
            </div>
            {/* Stat card */}
            <div className="flex flex-col gap-[6px] p-[30px]" style={{ flex: 1, backgroundColor: "var(--color-white)", borderRadius: 12 }}>
              <Stars />
              <div className="flex flex-col gap-[6px]">
                <span className="heading-2b" style={{ color: "var(--color-near-black)" }}>
                  {count >= 2000 ? "2M+" : `${(count / 1000).toFixed(1)}M+`}
                </span>
                <span className="body-16-regular" style={{ color: "#464646" }}>Happy Customers</span>
              </div>
            </div>
          </div>

          {/* Right column — two small cards side by side */}
          <div className="flex flex-row gap-[24px]" style={{ flex: "700 0 0px", alignSelf: "stretch" }}>
            {[successStories[1], successStories[2]].map((t, i) => (
              <div key={i} className="flex flex-col gap-[20px] p-[20px]" style={{ flex: 1, alignSelf: "stretch", backgroundColor: "var(--color-white)", borderRadius: 12, cursor: "pointer", transition: CARD_HOVER, transform: hoveredStory === i + 1 ? "scale(1.02)" : "scale(1)" }} onMouseEnter={() => setHoveredStory(i + 1)} onMouseLeave={() => setHoveredStory(null)}>
                <div>
                  <img src={t.image} alt={t.name} className="object-cover" style={{ borderRadius: 12, width: 166, height: 166 }} />
                </div>
                <div className="flex flex-col gap-[20px]">
                  <Stars />
                  <p className="heading-4b" style={{ color: "var(--color-black)" }}>{t.quote}</p>
                  <div className="flex flex-col gap-[4px]">
                    <span className="heading-4b" style={{ color: "var(--color-black)" }}>{t.name}</span>
                    <span className="body-16-regular" style={{ color: "#464646" }}>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
