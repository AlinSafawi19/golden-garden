"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Spring · time 0.4s · bounce 0.2
const SPRING =
  "opacity 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)";
const ARROW_TRANSITION = "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)";

const ArrowSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 15 0 L 15 10.5 L 13.637 10.5 L 13.637 2.5 L 1.5 15.5 L 0 14.088 L 12.5 1.5 L 3.729 1.5 L 3.729 0 Z" fill="currentColor" transform="translate(2.363 2.5)" />
  </svg>
);

// "Get a Quote" — same CTA as the header button
function QuoteButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/contact"
      className="cta-link inline-flex items-center gap-[8px] w-fit text-[var(--color-dark-gray)] px-[16px] py-[8px] no-underline hover:text-[var(--color-black)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transition: "color 0.6s cubic-bezier(0.44, 0, 0.56, 1)" }}
    >
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1 }}>[</span>
      <span className="body-16-regular" style={{ color: "var(--color-dark-gray)" }}>Get a Quote</span>
      <span aria-hidden="true" style={{ display: "inline-block", position: "relative", width: 20, height: 20, overflow: "hidden", flexShrink: 0 }}>
        <span style={{ position: "absolute", inset: 0, display: "flex", transition: ARROW_TRANSITION, transform: hovered ? "translate(110%, -110%)" : "translate(0, 0)" }}>
          <ArrowSvg />
        </span>
        <span style={{ position: "absolute", inset: 0, display: "flex", transition: ARROW_TRANSITION, transform: hovered ? "translate(0, 0)" : "translate(-110%, 110%)" }}>
          <ArrowSvg />
        </span>
      </span>
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1 }}>]</span>
    </Link>
  );
}

const services = [
  {
    num: "01",
    title: "Landscape Design",
    text: "Thoughtfully crafted landscape designs that seamlessly blend natural beauty, functionality, and sustainability, creating outdoor spaces that are not only visually stunning but also practical, inviting, and perfectly tailored to enhance your lifestyle and surroundings.",
    img: "https://framerusercontent.com/images/R3dljQu5V2P5u2FFC7YgPrcFJc.png?width=1284&height=756",
  },
  {
    num: "02",
    title: "Irrigation System",
    text: "Efficient irrigation systems designed to deliver the right amount of water at the right time, ensuring healthy plant growth while conserving resources and keeping your landscape lush, vibrant, and easy to maintain year-round.",
    img: "https://framerusercontent.com/images/mOcqWmyycUKcyGf0Xs6EAPhNrbM.png?width=1242&height=732",
  },
  {
    num: "03",
    title: "Seasonal Services",
    text: "Comprehensive seasonal services tailored to keep your landscape healthy and beautiful year-round, from spring planting and summer care to autumn cleanup preparation, ensuring your outdoor space thrives in every season.",
    img: "https://framerusercontent.com/images/O9s8NdLsZAPkQfmFYKVCb6qzIgg.png?width=1170&height=688",
  },
];

export default function ServicesList() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    // List container — gap 24/10/44 (mobile/tablet/desktop), padding 0 0 24/32/64 0
    <div
      ref={ref}
      className="w-full flex flex-col gap-[24px] tablet:gap-[25px] desktop:gap-[50px] pb-[24px] tablet:pb-[32px] desktop:pb-[64px]"
    >
      {services.map((s, i) => (
        // Service item — stacked on mobile, side-by-side on tablet/desktop
        <div
          key={s.num}
          className="w-full flex flex-col gap-[24px] tablet:flex-row tablet:gap-[64px] pb-[24px] tablet:pb-[32px] desktop:pb-[64px] border-b border-[rgba(0,0,0,0.15)]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(30px)",
            transition: SPRING,
            transitionDelay: visible ? `${i * 0.08}s` : "0s",
          }}
        >
          {/* Number wrapper — max-w 40, padding-top 10 (0 on mobile) */}
          <div className="w-full max-w-[40px] flex flex-col gap-[64px] pt-0 tablet:pt-[10px] shrink-0">
            <span className="body-20-regular" style={{ color: "var(--color-near-black)" }}>
              {s.num}
            </span>
          </div>

          {/* Content wrapper — gap 24/35 (mobile/desktop+tablet) */}
          <div className="flex flex-col gap-[24px] tablet:gap-[35px]">
            <h2 className="heading-1b">{s.title}</h2>

            {/* Media wrapper — stacked on mobile, side-by-side on tablet/desktop, gap 24/30/64 */}
            <div className="flex flex-col gap-[24px] tablet:flex-row tablet:gap-[30px] desktop:gap-[64px]">
              <div
                className="w-full tablet:flex-1 tablet:basis-0 h-[233px] tablet:h-[223px] desktop:h-[378px] overflow-hidden"
                style={{ borderRadius: 12 }}
              >
                <img src={s.img} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Right of the image — text + Get a Quote, gap 24/30/35 */}
              <div className="flex flex-col gap-[24px] tablet:gap-[30px] desktop:gap-[35px] tablet:flex-1 tablet:basis-0">
                <p className="body-16-regular" style={{ color: "#464646" }}>{s.text}</p>
                <QuoteButton />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
