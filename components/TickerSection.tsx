"use client";

import { useEffect, useRef, useState } from "react";

const SPRING =
  "opacity 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)";

const IMG_URL = "https://framerusercontent.com/images/76SESx55PZQTsvHiVatoZyaZR8.png?width=440&height=350";
const ROSE_URL = "https://framerusercontent.com/images/Qn9EmOAfD61P9Jf4OPH5jIymKH8.png?width=440&height=350";
const OLIVE_URL = "https://framerusercontent.com/images/ySuHeBzPgTDgdr6rEOQ9dNAXm7o.png?width=440&height=350";

function TickerItem() {
  return (
    <div className="shrink-0 flex flex-row items-center gap-[25px]">
      <span className="heading-1b" style={{ color: "var(--color-off-white)" }}>LANDSCAPE–CREATION</span>
      <span className="heading-1b" style={{ color: "var(--color-off-white)" }}>LANDSCAPE–CREATION</span>
    </div>
  );
}

function TickerRow() {
  return (
    <div className="relative overflow-hidden w-full">
      <div className="ticker-track" style={{ gap: 10, mixBlendMode: "exclusion" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <TickerItem key={i} />
        ))}
      </div>
    </div>
  );
}

export default function TickerSection() {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const roseRef = useRef<HTMLDivElement>(null);
  const oliveRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const [roseVisible, setRoseVisible] = useState(false);
  const [oliveVisible, setOliveVisible] = useState(false);

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
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setImgVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = roseRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRoseVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = oliveRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setOliveVisible(true); observer.disconnect(); } },
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
      <div
        ref={imgRef}
        className="unroll-mask absolute top-0 left-[20px] tablet:left-[30px] w-[100px] h-[80px] tablet:w-[150px] tablet:h-[119px] desktop:w-[220px] desktop:h-[175px] rounded-[8px] tablet:rounded-[12px] overflow-hidden"
        style={{
          animation: imgVisible ? "unroll 0.8s linear forwards" : "none",
        }}
      >
        <img
          src={IMG_URL}
          alt=""
          className="w-full h-full object-cover"
          style={{ borderRadius: "inherit" }}
        />
      </div>

      {/* Rose image - top right, same blend effect as flower */}
      <div
        ref={roseRef}
        className="unroll-mask absolute top-0 right-[20px] tablet:right-[30px] desktop:right-[208px] w-[100px] h-[80px] tablet:w-[150px] tablet:h-[119px] desktop:w-[220px] desktop:h-[175px] rounded-[8px] tablet:rounded-[12px] overflow-hidden"
        style={{
          animation: roseVisible ? "unroll 0.8s linear forwards" : "none",
        }}
      >
        <img
          src={ROSE_URL}
          alt=""
          className="w-full h-full object-cover"
          style={{ borderRadius: "inherit" }}
        />
      </div>

      <TickerRow />

      {/* Olive image - bottom center, above ticker, unaffected by blend */}
      <div
        ref={oliveRef}
        className="unroll-mask absolute bottom-0 left-1/2 -translate-x-1/2 w-[100px] h-[80px] tablet:w-[150px] tablet:h-[119px] desktop:w-[220px] desktop:h-[175px] rounded-[8px] tablet:rounded-[12px] overflow-hidden"
        style={{
          zIndex: 1,
          animation: oliveVisible ? "unroll 0.8s linear forwards" : "none",
        }}
      >
        <img
          src={OLIVE_URL}
          alt=""
          className="w-full h-full object-cover"
          style={{ borderRadius: "inherit" }}
        />
      </div>
    </section>
  );
}
