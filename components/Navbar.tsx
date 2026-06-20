"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const PRIMARY_COUNT = 3;

export default function Navbar() {
  const pathname = usePathname();
  const overlayBg =
    pathname === "/"
      ? "var(--color-off-white)"
      : "var(--color-white)";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [mobileCta, setMobileCta] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreLocked, setMoreLocked] = useState(false);
  const [moreHovered, setMoreHovered] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMore = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (moreButtonRef.current && headerRef.current) {
      const btnRect = moreButtonRef.current.getBoundingClientRect();
      const headerRect = headerRef.current.getBoundingClientRect();
      setDropdownPos({ top: headerRect.bottom, left: btnRect.left });
    }
    setMoreOpen(true);
  };
  const closeMore = () => {
    if (moreLocked) return;
    closeTimer.current = setTimeout(() => setMoreOpen(false), 80);
  };

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScrollY.current && current > 80);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
        setMoreLocked(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [moreOpen]);

  return (
    <header
      ref={headerRef}
      className="w-full bg-white sticky top-0 z-50 relative"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      {/* Content — space-between, center-aligned, overflow clip */}
      <div className="w-full max-w-[1296px] mx-auto flex flex-row justify-between items-center py-[8px] px-[20px]">

        {/* Logo Wrap */}
        <div className="flex flex-row items-center w-full justify-between tablet:w-auto tablet:justify-start tablet:gap-[10px]">
          <Link href="/" className="no-underline hover:no-underline outline-none focus:outline-none" aria-label="Go to home">
            <img src="" alt="Golden Garden" width={156} height={36} />
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
          {navItems.slice(0, PRIMARY_COUNT).map((item) => (
            <div key={item.title} className="relative group">
              <Link href={item.href} className="menu-item">
                <RollingText>{item.title}</RollingText>
              </Link>
            </div>
          ))}

          {/* More button + dropdown */}
          <div
            className="relative"
            onMouseEnter={openMore}
            onMouseLeave={closeMore}
          >
            <button
              ref={moreButtonRef}
              className="menu-item flex items-center gap-[6px]"
              onClick={() => { const next = !moreLocked; setMoreLocked(next); setMoreOpen(next); }}
              onMouseEnter={() => setMoreHovered(true)}
              onMouseLeave={() => setMoreHovered(false)}
              aria-expanded={moreOpen}
            >
              <RollingText>Projects</RollingText>
              <svg
                viewBox="0 0 24 24"
                width={20}
                height={20}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transition: "transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)", transform: (moreOpen || moreHovered) ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
              >
                <path d="M 0 0 L 6 6 L 12 0" fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" transform="translate(6 9)" />
              </svg>
            </button>

            {/* Dropdown */}
            <div
              className="fixed z-50 overflow-hidden"
              style={{
                backgroundColor: overlayBg,
                top: dropdownPos.top,
                left: dropdownPos.left,
                minWidth: 200,
                maxHeight: moreOpen ? "400px" : "0px",
                opacity: moreOpen ? 1 : 0,
                pointerEvents: moreOpen ? "auto" : "none",
                transition: "max-height 0.8s cubic-bezier(0.37, 0, 0.63, 1), opacity 0.8s cubic-bezier(0.37, 0, 0.63, 1)",
              }}
              onMouseEnter={openMore}
              onMouseLeave={closeMore}
            >
              <nav className="flex flex-col p-[20px] gap-[6px]">
                {navItems.slice(PRIMARY_COUNT).map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="menu-item"
                    onClick={() => { setMoreOpen(false); setMoreLocked(false); }}
                  >
                    <RollingText>{item.title}</RollingText>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
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
          <span className="body-16-regular" style={{ color: "var(--color-dark-gray)" }}>Plan My Garden</span>
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
        className="absolute top-full left-0 right-0 z-50 overflow-hidden"
        style={{
          backgroundColor: overlayBg,
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
            <span className="body-16-regular" style={{ color: "var(--color-dark-gray)" }}>Plan My Garden</span>
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
