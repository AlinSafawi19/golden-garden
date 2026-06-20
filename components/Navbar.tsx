"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import RollingText from "@/components/RollingText";

type NavItem = {
  title: string;
  href: string;
};

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Projects", href: "/projects" },
  { title: "Success Stories", href: "/success-stories" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [mobileCta, setMobileCta] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScrollY.current && current > 80);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="w-full bg-white sticky top-0 z-50 relative"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      {/* Content — space-between, center-aligned, overflow clip */}
      <div className="w-full max-w-[1296px] mx-auto flex flex-row justify-between items-center overflow-hidden py-[16px] px-[20px]">

        {/* Logo Wrap */}
        <div className="flex flex-row items-center w-full justify-between tablet:w-auto tablet:justify-start tablet:gap-[10px]">
          <Link href="/" className="no-underline hover:no-underline outline-none focus:outline-none" aria-label="Go to home">
            <img src="/logo-horizontal-dark-teal-text.svg" alt="Golden Garden" width={156} height={36} />
          </Link>

          {/* Hamburger — phone only */}
          <button
            className="block tablet:hidden w-6 h-6 flex flex-col justify-center gap-[4px]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className="block w-[22px] h-[2px] bg-[var(--color-black)] origin-center"
              style={{
                transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                transform: mobileOpen ? "translateY(6px) rotate(45deg)" : "translateY(0px) rotate(0deg)",
              }}
            />
            <span
              className="block w-[22px] h-[2px] bg-[var(--color-black)]"
              style={{
                transition: "opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-[22px] h-[2px] bg-[var(--color-black)] origin-center"
              style={{
                transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                transform: mobileOpen ? "translateY(-6px) rotate(-45deg)" : "translateY(0px) rotate(0deg)",
              }}
            />
          </button>
        </div>

        {/* Item List — tablet and desktop */}
        <nav className="hidden tablet:flex flex-row gap-[44px] items-center">
          {navItems.map((item) => (
            <div key={item.title} className="relative group">
              <Link href={item.href} className="menu-item">
                <RollingText>{item.title}</RollingText>
              </Link>
            </div>
          ))}
        </nav>

        {/* Hero Button — tablet and desktop */}
        <Link
          href="/contact"
          className="cta-link hidden tablet:inline-flex items-center gap-[8px] text-[var(--color-dark-gray)] px-[16px] py-[8px] no-underline hover:text-[var(--color-black)]"
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            transition: "color 0.6s cubic-bezier(0.44, 0, 0.56, 1)",
          }}
        >
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1 }}>[</span>
          <span className="body-16-regular" style={{ color: "var(--color-dark-gray)" }}>Get a Quote</span>
          <span aria-hidden="true" style={{ display: "inline-block", position: "relative", width: 20, height: 20, overflow: "hidden", flexShrink: 0 }}>
            <span style={{ position: "absolute", inset: 0, display: "flex", transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)", transform: ctaHovered ? "translate(110%, -110%)" : "translate(0, 0)" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 15 0 L 15 10.5 L 13.637 10.5 L 13.637 2.5 L 1.5 15.5 L 0 14.088 L 12.5 1.5 L 3.729 1.5 L 3.729 0 Z" fill="currentColor" transform="translate(2.363 2.5)" />
              </svg>
            </span>
            <span style={{ position: "absolute", inset: 0, display: "flex", transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)", transform: ctaHovered ? "translate(0, 0)" : "translate(-110%, 110%)" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 15 0 L 15 10.5 L 13.637 10.5 L 13.637 2.5 L 1.5 15.5 L 0 14.088 L 12.5 1.5 L 3.729 1.5 L 3.729 0 Z" fill="currentColor" transform="translate(2.363 2.5)" />
              </svg>
            </span>
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1 }}>]</span>
        </Link>
      </div>

      {/* Mobile Dropdown — spring-approximated with max-height */}
      <div
        className="absolute top-full left-0 right-0 z-50 overflow-hidden bg-[var(--color-off-white)]"
        style={{
          maxHeight: mobileOpen ? "400px" : "0px",
          opacity: mobileOpen ? 1 : 0,
          transition:
            "max-height 0.8s cubic-bezier(0.37, 0, 0.63, 1), opacity 0.8s cubic-bezier(0.37, 0, 0.63, 1)",
        }}
      >
        <nav className="flex flex-col p-[20px] gap-[20px]">
          <div className="flex flex-col gap-[6px]">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="menu-item"
                onClick={() => setMobileOpen(false)}
              >
                <RollingText>{item.title}</RollingText>
              </Link>
            ))}
          </div>
          <div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-[8px] text-[var(--color-dark-gray)] no-underline hover:text-[var(--color-black)]"
            onClick={() => setMobileOpen(false)}
            onMouseEnter={() => setMobileCta(true)}
            onMouseLeave={() => setMobileCta(false)}
            style={{ transition: "color 0.6s cubic-bezier(0.44, 0, 0.56, 1)" }}
          >
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1 }}>[</span>
            <span className="body-16-regular" style={{ color: "var(--color-dark-gray)" }}>Get a Quote</span>
            <span aria-hidden="true" style={{ display: "inline-block", position: "relative", width: 20, height: 20, overflow: "hidden", flexShrink: 0 }}>
              <span style={{ position: "absolute", inset: 0, display: "flex", transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)", transform: mobileCta ? "translate(110%, -110%)" : "translate(0, 0)" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 15 0 L 15 10.5 L 13.637 10.5 L 13.637 2.5 L 1.5 15.5 L 0 14.088 L 12.5 1.5 L 3.729 1.5 L 3.729 0 Z" fill="currentColor" transform="translate(2.363 2.5)" />
                </svg>
              </span>
              <span style={{ position: "absolute", inset: 0, display: "flex", transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)", transform: mobileCta ? "translate(0, 0)" : "translate(-110%, 110%)" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 15 0 L 15 10.5 L 13.637 10.5 L 13.637 2.5 L 1.5 15.5 L 0 14.088 L 12.5 1.5 L 3.729 1.5 L 3.729 0 Z" fill="currentColor" transform="translate(2.363 2.5)" />
                </svg>
              </span>
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1 }}>]</span>
          </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
