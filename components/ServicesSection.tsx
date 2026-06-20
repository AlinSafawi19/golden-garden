"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SPRING =
  "opacity 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)";
const ARROW_TRANSITION = "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)";

const services = [
  {
    num: "01",
    title: "Landscape Design",
    desc: "Starting a garden can feel overwhelming, but with the right approach, anyone can grow.",
    img: "https://framerusercontent.com/images/R3dljQu5V2P5u2FFC7YgPrcFJc.png?width=1284&height=756",
  },
  {
    num: "02",
    title: "Irrigation System",
    desc: "Efficient irrigation systems designed to deliver the right amount of water at the right time.",
    img: "https://framerusercontent.com/images/mOcqWmyycUKcyGf0Xs6EAPhNrbM.png?width=1242&height=732",
  },
  {
    num: "03",
    title: "Seasonal Services",
    desc: "Comprehensive seasonal services tailored to keep your landscape healthy and beautiful.",
    img: "https://framerusercontent.com/images/O9s8NdLsZAPkQfmFYKVCb6qzIgg.png?width=1170&height=688",
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);

  const [visible, setVisible] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const viewServicesLink = (
    <Link
      href="/services"
      className="cta-link inline-flex items-center gap-[8px] text-[var(--color-dark-gray)] no-underline hover:text-[var(--color-black)]"
      onMouseEnter={() => setCtaHovered(true)}
      onMouseLeave={() => setCtaHovered(false)}
      style={{ transition: "color 0.6s cubic-bezier(0.44, 0, 0.56, 1)" }}
    >
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1 }}>[</span>
      <span className="body-16-regular" style={{ color: "var(--color-dark-gray)" }}>MORE SERVICES</span>
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
  );

  return (
    <section
      ref={ref}
      className="w-full bg-white flex flex-col gap-[40px] tablet:gap-[60px] desktop:gap-[70px] pt-[60px] px-[20px] pb-[60px] tablet:pt-[80px] tablet:px-[30px] tablet:pb-[80px] desktop:pt-[150px] desktop:px-[30px] desktop:pb-[50px]"
    >
      {/* Header */}
      <div
        className="w-full max-w-[1296px] mx-auto flex flex-col gap-[24px] desktop:flex-row desktop:justify-between desktop:items-start"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(30px)",
          transition: SPRING,
        }}
      >
        {/* Left — tag + line */}
        <div className="w-full desktop:w-auto desktop:flex-shrink-0 flex flex-col gap-[24px]">
          <div className="flex flex-row justify-start items-center gap-[16px]">
            <Image src="/leaf-icon.svg" alt="" width={20} height={20} style={{ flexShrink: 0 }} />
            <span className="body-16-regular">Services</span>
          </div>
        </div>

        {/* Right — title + CTA (CTA moves below the cards on mobile) */}
        <div className="flex flex-col gap-[24px] desktop:max-w-[631px]">
          <h2 className="heading-1b" style={{ color: "var(--color-near-black)" }}>OUR SERVICES</h2>
          <div className="hidden tablet:block">{viewServicesLink}</div>
        </div>
      </div>

      {/* ── All breakpoints: stacked card + image rows ── */}
      <div className="w-full flex flex-col gap-[30px] tablet:gap-[40px] desktop:gap-[44px]">
        {services.map((s, i) => (
          <div key={i} className={`w-full max-w-[1296px] mx-auto flex flex-col gap-[30px] tablet:flex-row tablet:justify-between tablet:gap-[40px]${i === 1 ? " tablet:flex-row-reverse" : ""}`}>
            <div
              className="bg-white flex flex-col justify-between items-start gap-[24px] tablet:gap-0 w-full h-auto tablet:w-[450px] tablet:h-[290px] tablet:shrink-0"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0px)" : "translateY(30px)", transition: SPRING }}
            >
              <span className="heading-2c" style={{ color: "var(--color-near-black)" }}>{s.num}</span>
              <div className="flex flex-col gap-[24px]">
                <div className="flex flex-row items-center gap-[15px] tablet:gap-[20px]">
                  <Image src="/leaf-icon.svg" alt="" width={20} height={22} style={{ flexShrink: 0 }} />
                  <span className="heading-2b" style={{ color: "var(--color-near-black)" }}>{s.title}</span>
                </div>
                <p className="body-16-regular" style={{ color: "#464646" }}>{s.desc}</p>
              </div>
            </div>
            <div className="w-full tablet:flex-1 tablet:max-w-[642px] h-[180px] tablet:h-[320px] overflow-hidden shrink-0 tablet:shrink" style={{ borderRadius: 20 }}>
              <img src={s.img} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      <div className="tablet:hidden flex justify-center">{viewServicesLink}</div>
    </section>
  );
}
