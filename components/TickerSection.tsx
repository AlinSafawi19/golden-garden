"use client";

import { useEffect, useRef, useState } from "react";
import type { CanopyEntry } from "@/lib/canopy";

const SPRING =
  "opacity 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)";

function TickerItem({ text1, text2 }: { text1: string; text2: string }) {
  return (
    <div className="shrink-0 flex flex-row items-center gap-[25px]">
      <span className="heading-1b" style={{ color: "var(--color-off-white)" }}>{text1}</span>
      <span className="heading-1b" style={{ color: "var(--color-off-white)" }}>{text2}</span>
    </div>
  );
}

function TickerRow({ text1, text2 }: { text1: string; text2: string }) {
  return (
    <div className="relative overflow-hidden w-full">
      <div className="ticker-track" style={{ gap: 10, mixBlendMode: "exclusion" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <TickerItem key={i} text1={text1} text2={text2} />
        ))}
      </div>
    </div>
  );
}

export default function TickerSection({ ticker }: { ticker: CanopyEntry | null }) {
  const ref = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [img1Visible, setImg1Visible] = useState(false);
  const [img2Visible, setImg2Visible] = useState(false);
  const [img3Visible, setImg3Visible] = useState(false);

  const text1 = ticker?.["Scrolling Text 1"] ?? "";
  const text2 = ticker?.["Scrolling Text 2"] ?? "";
  const leftImage = ticker?.["Left Image"] ?? null;
  const rightImage = ticker?.["Right Image"] ?? null;
  const centerImage = ticker?.["Center Image"] ?? null;

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

  useEffect(() => {
    const el = img1Ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setImg1Visible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = img2Ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setImg2Visible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = img3Ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setImg3Visible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full bg-white pt-[50px] pb-[50px] tablet:pt-[80px] tablet:pb-[80px] desktop:pt-[99px] desktop:pb-[86px] flex flex-col gap-[10px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        transition: SPRING,
      }}
    >
      {/* Rolling image - must be painted before TickerRow so mix-blend-mode composites against it */}
      {leftImage && (
        <div
          ref={img1Ref}
          className="unroll-mask absolute top-0 left-[20px] tablet:left-[30px] w-[100px] h-[80px] tablet:w-[150px] tablet:h-[119px] desktop:w-[220px] desktop:h-[175px] rounded-[8px] tablet:rounded-[12px] overflow-hidden"
          style={{
            animation: img1Visible ? "unroll 0.8s linear forwards" : "none",
          }}
        >
          <img
            src={leftImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ borderRadius: "inherit" }}
          />
        </div>
      )}

      {rightImage && (
        <div
          ref={img2Ref}
          className="unroll-mask absolute top-0 right-[20px] tablet:right-[30px] desktop:right-[208px] w-[100px] h-[80px] tablet:w-[150px] tablet:h-[119px] desktop:w-[220px] desktop:h-[175px] rounded-[8px] tablet:rounded-[12px] overflow-hidden"
          style={{
            animation: img2Visible ? "unroll 0.8s linear forwards" : "none",
          }}
        >
          <img
            src={rightImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ borderRadius: "inherit" }}
          />
        </div>
      )}

      <TickerRow text1={text1} text2={text2} />

      {/* Olive image - bottom center, above ticker, unaffected by blend */}
      {centerImage && (
        <div
          ref={img3Ref}
          className="unroll-mask absolute bottom-0 left-1/2 -translate-x-1/2 w-[100px] h-[80px] tablet:w-[150px] tablet:h-[119px] desktop:w-[220px] desktop:h-[175px] rounded-[8px] tablet:rounded-[12px] overflow-hidden"
          style={{
            zIndex: 1,
            animation: img3Visible ? "unroll 0.8s linear forwards" : "none",
          }}
        >
          <img
            src={centerImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ borderRadius: "inherit" }}
          />
        </div>
      )}
    </section>
  );
}
