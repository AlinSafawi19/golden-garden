"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SPRING =
  "opacity 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)";

const testimonials = [
  {
    quote:
      "Golden Garden completely transformed our backyard into a lush retreat. The attention to detail and care they brought to every plant and pathway was extraordinary.",
    name: "Sarah Mitchell",
    role: "Homeowner, London",
  },
  {
    quote:
      "From the initial design consultation to the final planting, the team was professional, creative, and deeply knowledgeable. Our garden is now our favourite room in the house.",
    name: "James & Claire Thornton",
    role: "Homeowners, Surrey",
  },
  {
    quote:
      "We hired Golden Garden for our commercial courtyard and the result exceeded every expectation. Clients constantly comment on how welcoming the space feels.",
    name: "David Osei",
    role: "Director, Osei & Partners",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
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
    <section
      ref={ref}
      className="w-full flex flex-col gap-[10px] pt-[60px] px-[20px] pb-[60px] tablet:pt-[80px] tablet:px-[30px] tablet:pb-[80px] desktop:pt-[150px] desktop:px-[30px] desktop:pb-[150px]"
      style={{ backgroundColor: "var(--color-soft-white)" }}
    >
      {/* Header */}
      <div
        className="w-full max-w-[1296px] mx-auto flex flex-col gap-[24px] desktop:flex-row desktop:justify-between desktop:items-end"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(30px)",
          transition: SPRING,
        }}
      >
        <div className="flex flex-row items-center gap-[16px]">
          <Image src="/leaf-icon.svg" alt="" width={20} height={20} style={{ flexShrink: 0 }} />
          <span className="body-16-regular">Testimonials</span>
        </div>
        <h2 style={{ color: "var(--color-near-black)" }}>What Our Clients Say</h2>
      </div>

      {/* Cards */}
      <div
        className="w-full max-w-[1296px] mx-auto grid grid-cols-1 tablet:grid-cols-3 gap-[10px]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(30px)",
          transition: SPRING,
        }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex flex-col justify-between gap-[40px] p-[32px]"
            style={{
              backgroundColor: "var(--color-white)",
              borderRadius: 12,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "20px",
                lineHeight: "1.5em",
                color: "var(--color-dark-gray)",
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex flex-row items-center gap-[12px]">
              <Image src="/leaf-icon.svg" alt="" width={20} height={20} style={{ flexShrink: 0 }} />
              <div className="flex flex-col gap-[2px]">
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "var(--color-near-black)",
                    lineHeight: 1.2,
                  }}
                >
                  {t.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#676767",
                    lineHeight: 1.2,
                  }}
                >
                  {t.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
