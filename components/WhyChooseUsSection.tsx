"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";

const SPRING =
  "opacity 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)";
const ARROW_TRANSITION = "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)";

const stats = [
  { value: "440+", label: "Projects Completed" },
  { value: "2M", label: "Happy Customers" },
  { value: "10", label: "Years of Experience" },
];

function CountUp({ value, start, className, style }: { value: string; start: boolean; className?: string; style?: React.CSSProperties }) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const [display, setDisplay] = useState(start ? target : 0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    let startTime: number | null = null;
    const duration = 1600;
    const tick = (t: number) => {
      if (startTime === null) startTime = t;
      const p = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setDisplay(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  return (
    <span className={className} style={style}>
      {display.toFixed(decimals)}{suffix}
    </span>
  );
}

export default function WhyChooseUsSection() {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const learnMoreLink = (
    <Link
      href="/about"
      className="cta-link inline-flex items-center gap-[8px] no-underline"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: "var(--color-off-white)", transition: "color 0.6s cubic-bezier(0.44, 0, 0.56, 1)" }}
    >
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1 }}>[</span>
      <span className="body-16-regular" style={{ color: "var(--color-off-white)" }}>LEARN MORE</span>
      <span aria-hidden="true" style={{ display: "inline-block", position: "relative", width: 20, height: 20, overflow: "hidden", flexShrink: 0 }}>
        <span style={{ position: "absolute", inset: 0, display: "flex", transition: ARROW_TRANSITION, transform: hovered ? "translate(110%, -110%)" : "translate(0, 0)" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 15 0 L 15 10.5 L 13.637 10.5 L 13.637 2.5 L 1.5 15.5 L 0 14.088 L 12.5 1.5 L 3.729 1.5 L 3.729 0 Z" fill="currentColor" transform="translate(2.363 2.5)" />
          </svg>
        </span>
        <span style={{ position: "absolute", inset: 0, display: "flex", transition: ARROW_TRANSITION, transform: hovered ? "translate(0, 0)" : "translate(-110%, 110%)" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 15 0 L 15 10.5 L 13.637 10.5 L 13.637 2.5 L 1.5 15.5 L 0 14.088 L 12.5 1.5 L 3.729 1.5 L 3.729 0 Z" fill="currentColor" transform="translate(2.363 2.5)" />
          </svg>
        </span>
      </span>
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1 }}>]</span>
    </Link>
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden w-full flex flex-col px-[20px] py-[60px] tablet:px-[30px] tablet:py-[80px] desktop:px-[30px] desktop:py-[120px]"
      style={{
        backgroundImage: "url('https://framerusercontent.com/images/0Oj5TzT6kXfljMOcMI6rSzOEDQ.webp?scale-down-to=2048&width=2160&height=723')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Glass overlay — covers the whole image */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      />

      <div className="relative w-full max-w-[1296px] mx-auto flex flex-col gap-[40px] tablet:gap-[56px] desktop:gap-[72px]">
        {/* Header — eyebrow + CTA */}
        <div
          className="flex flex-col items-center gap-[20px] tablet:flex-row tablet:items-center tablet:justify-between"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(24px)",
            transition: SPRING,
          }}
        >
          <div className="flex flex-row items-center gap-[12px]">
            <svg width="20" height="20" viewBox="3 1 26 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0, color: "var(--color-off-white)" }}>
              <g transform="translate(16, 22)" fill="currentColor">
                <ellipse cx="0" cy="-8" rx="3" ry="8" transform="rotate(-27)" />
                <ellipse cx="0" cy="-10" rx="4" ry="10" />
                <ellipse cx="0" cy="-8" rx="3" ry="8" transform="rotate(27)" />
                <line x1="0" y1="1" x2="0" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </svg>
            <span className="body-16-regular" style={{ color: "var(--color-off-white)" }}>Why Choose Us</span>
          </div>
          <div className="hidden tablet:block">{learnMoreLink}</div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-[32px] tablet:flex-row tablet:items-stretch tablet:gap-0">
          {stats.map((s, i) => (
            <Fragment key={s.label}>
              {i > 0 && (
                <div
                  aria-hidden="true"
                  className="relative hidden tablet:flex items-center justify-center tablet:px-[40px] desktop:px-[60px]"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.6s ease",
                    transitionDelay: `${0.15 + i * 0.1}s`,
                  }}
                >
                  {/* vertical gradient line — tablet+ only */}
                  <span
                    className="absolute top-0 bottom-0 w-px"
                    style={{ background: "linear-gradient(to bottom, transparent, var(--color-off-white), transparent)" }}
                  />
                </div>
              )}
              <div
                className={`flex flex-col items-center gap-[8px] text-center tablet:flex-1 ${
                  i === 0
                    ? "tablet:items-start tablet:text-left"
                    : i === stats.length - 1
                    ? "tablet:items-end tablet:text-right"
                    : "tablet:items-center tablet:text-center"
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0px)" : "translateY(24px)",
                  transition: SPRING,
                  transitionDelay: `${0.1 + i * 0.1}s`,
                }}
              >
                <CountUp value={s.value} start={visible} className="heading-2c" style={{ color: "var(--color-off-white)" }} />
                <span className="body-16-regular" style={{ color: "rgba(250,250,250,0.7)" }}>{s.label}</span>
              </div>
            </Fragment>
          ))}
        </div>

        {/* CTA — mobile */}
        <div className="tablet:hidden flex justify-center">{learnMoreLink}</div>
      </div>
    </section>
  );
}
