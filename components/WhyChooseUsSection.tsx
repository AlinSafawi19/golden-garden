"use client";

import { useState } from "react";
import Link from "next/link";

const ARROW_TRANSITION = "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)";

export default function WhyChooseUsSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      className="w-full flex flex-col gap-[10px] pt-[60px] px-[20px] pb-[60px] tablet:pt-[72px] tablet:px-[30px] tablet:pb-[72px] desktop:pt-[72px] desktop:px-[30px] desktop:pb-[72px]"
      style={{
        backgroundImage: "url('https://framerusercontent.com/images/0Oj5TzT6kXfljMOcMI6rSzOEDQ.webp?scale-down-to=2048&width=2160&height=723')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="relative w-full max-w-[1296px] mx-auto flex flex-col items-center gap-[24px] pt-[60px] pb-[60px] tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-[30px] tablet:pt-[80px] tablet:pb-[80px] desktop:flex-row desktop:items-start desktop:justify-between desktop:gap-0 desktop:pt-[157px] desktop:pb-[157px]"
      >
        {/* Corner dots */}
        <span style={{ position: "absolute", top: 0, left: 0, width: 20, height: 20, backgroundColor: "var(--color-off-white)", flexShrink: 0 }} />
        <span style={{ position: "absolute", top: 0, right: 0, width: 20, height: 20, backgroundColor: "var(--color-off-white)", flexShrink: 0 }} />
        <span style={{ position: "absolute", bottom: 0, left: 0, width: 20, height: 20, backgroundColor: "var(--color-off-white)", flexShrink: 0 }} />
        <span style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, backgroundColor: "var(--color-off-white)", flexShrink: 0 }} />

        <span className="body-16-regular" style={{ color: "var(--color-off-white)" }}>Why Choose Us</span>

        {/* Stats */}
        <div className="flex flex-col gap-[12px] tablet:flex-row tablet:justify-between desktop:flex-row desktop:max-w-[664px] desktop:gap-[60px]">
          <span className="body-18-semibold">440+ Project Completed</span>
          <span className="body-18-semibold">2M Happy Customers</span>
          <span className="body-18-semibold">10 Years of Experience</span>
        </div>

        {/* Learn More CTA */}
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
      </div>
    </section>
  );
}
