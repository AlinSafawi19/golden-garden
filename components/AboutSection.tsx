"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SPRING =
  "opacity 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)";
const ARROW_TRANSITION = "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [learnHovered, setLearnHovered] = useState(false);

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
      className="w-full bg-white flex flex-row justify-center items-center gap-[10px] pt-[60px] px-[20px] pb-[60px] tablet:pt-[80px] tablet:px-[30px] tablet:pb-[80px] desktop:pt-[150px] desktop:px-[30px] desktop:pb-[50px]"
    >
      <div
        className="w-full max-w-[1296px] mx-auto flex flex-col gap-[24px] tablet:flex-row tablet:gap-0 tablet:justify-between tablet:items-start"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(30px)",
          transition: SPRING,
        }}
      >
        {/* Tag */}
        <div className="inline-flex flex-row justify-start items-center gap-[16px]">
          <Image
            src="/leaf-icon.svg"
            alt=""
            width={20}
            height={20}
            style={{ flexShrink: 0 }}
          />
          <span className="body-16-regular">About Us</span>
        </div>

        {/* Text wrapper */}
        <div className="flex flex-col gap-[24px] items-start w-full tablet:w-[75%] desktop:max-w-[855px]">
          <h3 style={{ whiteSpace: "pre-wrap" }}>{`                         We design and maintain beautiful outdoor spaces that bring nature closer to your everyday life, effortlessly. From thoughtful landscaping to expert garden care, we help your green spaces grow, thrive, and inspire year-round.`}</h3>

          {/* Learn More CTA */}
          <Link
            href="/about"
            className="cta-link inline-flex items-center gap-[8px] text-[var(--color-dark-gray)] no-underline hover:text-[var(--color-black)]"
            onMouseEnter={() => setLearnHovered(true)}
            onMouseLeave={() => setLearnHovered(false)}
            style={{ transition: "color 0.6s cubic-bezier(0.44, 0, 0.56, 1)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "24px",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              [
            </span>
            <span
              className="body-16-regular"
              style={{ color: "var(--color-dark-gray)" }}
            >
              LEARN MORE
            </span>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                position: "relative",
                width: 20,
                height: 20,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  transition: ARROW_TRANSITION,
                  transform: learnHovered
                    ? "translate(110%, -110%)"
                    : "translate(0, 0)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 15 0 L 15 10.5 L 13.637 10.5 L 13.637 2.5 L 1.5 15.5 L 0 14.088 L 12.5 1.5 L 3.729 1.5 L 3.729 0 Z"
                    fill="currentColor"
                    transform="translate(2.363 2.5)"
                  />
                </svg>
              </span>
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  transition: ARROW_TRANSITION,
                  transform: learnHovered
                    ? "translate(0, 0)"
                    : "translate(-110%, 110%)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 15 0 L 15 10.5 L 13.637 10.5 L 13.637 2.5 L 1.5 15.5 L 0 14.088 L 12.5 1.5 L 3.729 1.5 L 3.729 0 Z"
                    fill="currentColor"
                    transform="translate(2.363 2.5)"
                  />
                </svg>
              </span>
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "24px",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              ]
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
