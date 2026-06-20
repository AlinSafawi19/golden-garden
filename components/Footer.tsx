"use client";

import Link from "next/link";
import { useState } from "react";
import RollingText from "@/components/RollingText";

const ARROW_TRANSITION = "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)";

type NavLink = { title: string; href: string; target?: string };

const navColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Main Pages",
    links: [
      { title: "Home", href: "/" },
      { title: "Services", href: "/services" },
      { title: "Projects", href: "/projects" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Success Stories", href: "/success-stories" },
      { title: "Blog", href: "/blog" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Instagram", href: "https://www.instagram.com/golden_garden.by.hassanbaajour/?hl=en", target: "_blank" },
      { title: "TikTok", href: "https://www.tiktok.com/@golden_garden.by.hassan", target: "_blank" },
    ],
  },
];

const contactColumns = [
  { title: "Location", data: "Baysarieh, South Lebanon", href: "https://www.google.com/maps/place/Lebanon/@33.4139686,35.7210673,9z/data=!4m6!3m5!1s0x151f17028422aaad:0xcc7d34096c00f970!8m2!3d33.854721!4d35.862285!16zL20vMDRocXo?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D", target: "_blank" },
  { title: "Email Us", data: "hello@goldengarden.com", href: "mailto:hello@goldengarden.com" },
  { title: "Call Us Now", data: "+961 71 635 664", href: "tel:+96171635664" },
];

const bracketStyle = {
  fontFamily: "var(--font-sans)",
  fontWeight: 500,
  fontSize: "24px",
  letterSpacing: "-0.01em",
  lineHeight: 1,
  color: "var(--color-mint-green)",
};

const contactDataStyle = {
  fontFamily: "var(--font-heading)",
  fontWeight: 400,
  fontSize: "24px",
  lineHeight: "1.4em",
  letterSpacing: "-0.03em",
  color: "var(--color-white)",
};

function NavCol({ col }: { col: { title: string; links: NavLink[] } }) {
  return (
    <div className="flex flex-col gap-[12px]">
      <span className="inline-flex items-center gap-[8px]" style={{ color: "var(--color-white)" }}>
        <span style={bracketStyle}>[</span>
        <span className="body-16-regular" style={{ color: "var(--color-white)", textTransform: "uppercase" }}>{col.title}</span>
        <span style={bracketStyle}>]</span>
      </span>
      {col.links.map((link) => (
        <Link key={link.title} href={link.href} className="menu-item" style={{ color: "var(--color-white)" }} target={link.target} rel={link.target === "_blank" ? "noopener noreferrer" : undefined}>
          <RollingText>{link.title}</RollingText>
        </Link>
      ))}
    </div>
  );
}

function ContactCol({ col }: { col: (typeof contactColumns)[number] }) {
  return (
    <div className="flex flex-col gap-[12px]">
      <span className="body-16-regular" style={{ color: "var(--color-white)", textTransform: "uppercase" }}>{col.title}</span>
      <Link href={col.href} className="menu-item" style={{ ...contactDataStyle }} target={col.target} rel={col.target === "_blank" ? "noopener noreferrer" : undefined}>
        <RollingText lineHeight="1.4em">{col.data}</RollingText>
      </Link>
    </div>
  );
}

export default function Footer() {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <footer className="w-full" style={{ backgroundColor: "var(--color-dark-teal)" }}>
      <div className="w-full max-w-[1296px] mx-auto pt-[56px] px-[20px] pb-[16px] tablet:px-[30px]">

        {/* Logo + Grids */}
        <div className="flex flex-col gap-[40px] tablet:gap-[60px] desktop:gap-[87px]">

          {/* Logo */}
          <img src="/logo-horizontal-white-text.svg" alt="Golden Garden" className="w-[180px] tablet:w-[220px]" />

          {/* Mobile: nav 2-col grid, then contact 1-col — separate stacks */}
          <div className="flex flex-col gap-[41px] tablet:hidden">
            <div className="grid grid-cols-2 gap-x-[10px] gap-y-[24px]">
              {navColumns.map((col) => <NavCol key={col.title} col={col} />)}
            </div>
            <div className="flex flex-col gap-[20px]">
              {contactColumns.map((col) => <ContactCol key={col.title} col={col} />)}
            </div>
          </div>

          {/* Tablet+: 3 columns spread across full width, each has nav + contact stacked */}
          <div className="hidden tablet:flex tablet:flex-row tablet:justify-between">
            {navColumns.map((nav, i) => (
              <div key={nav.title} className="flex flex-col gap-[60px] desktop:gap-[72px]">
                <div className="flex-1">
                  <NavCol col={nav} />
                </div>
                <ContactCol col={contactColumns[i]} />
              </div>
            ))}
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-[30px] tablet:mt-[40px] flex flex-col gap-[16px] items-center tablet:flex-row tablet:justify-between tablet:items-center">
          <p className="body-20-regular-2">© 2026 Copyright - Golden Garden</p>
          <p className="body-20-regular-2">All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
