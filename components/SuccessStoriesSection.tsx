"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SPRING_REVEAL =
  "opacity 0.4s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)";
const ARROW_TRANSITION = "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)";

const STARS_SRC = "data:image/svg+xml,<svg display='block' role='presentation' viewBox='0 0 20 4' xmlns='http://www.w3.org/2000/svg'><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.116 1.669 2.086 1.775 2.102 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.111 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(0.26 0.695)'/><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.116 1.669 2.086 1.775 2.102 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.111 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(4.479 0.695)'/><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.116 1.669 2.086 1.775 2.102 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.111 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(8.698 0.695)'/><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.116 1.669 2.086 1.775 2.102 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.111 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(12.917 0.695)'/><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.115 1.669 2.085 1.775 2.103 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.11 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(17.135 0.695)'/></svg>";

const Stars = () => (
  <img src={STARS_SRC} alt="5 stars" width={128} height={26} style={{ display: "block" }} />
);

const successStories = [
  {
    quote: "Our backyard has completely transformed into a peaceful retreat. The attention to detail and care they put into every corner truly exceeded our expectations.",
    name: "Savannah Nguyen",
    location: "Houston, TX",
    image: "https://framerusercontent.com/images/ClFmQB14W7crwd6VdHlYJBcbE.png?scale-down-to=1024&width=904&height=1200",
  },
  {
    quote: "From design to maintenance, everything was handled professionally. Our garden looks stunning all year round, and we couldn't be happier with the results.",
    name: "Ethan Brooks",
    location: "Denver, CO",
    image: "https://framerusercontent.com/images/rQ92osCGkMe2Ovjsyh4pAgYnzsM.png?width=332&height=332",
  },
  {
    quote: "They understood exactly what we wanted and brought our vision to life beautifully. The space feels fresh, vibrant, and perfectly designed for our lifestyle.",
    name: "Isabella Chen",
    location: "San Jose, CA",
    image: "https://framerusercontent.com/images/6LVLDyL2L9I0uyNZafNkMhK1k.png?width=332&height=332",
  },
];

// --- Slideshow mechanics (mirrors HeroSlideshow) ---
const VISUAL_GAP = 24;
const INACTIVE_SCALE = 0.8;
const DRAG_THRESHOLD = 50;
const MAX_W = 636;
const SPRING = "1s cubic-bezier(0.65, 0, 0.35, 1)";

const N = successStories.length;   // 3
const COPIES = 5;                  // 15 items total — 2 full copies buffer each side
const EXTENDED = Array.from({ length: COPIES }, () => successStories).flat();
const START = Math.floor(COPIES / 2) * N + 1; // copy 3, middle item = index 7

// transitionEnd resets: keep current inside [N, 4N)
const RESET_LOW = N;               // 3
const RESET_HIGH = (COPIES - 1) * N; // 12

export default function SuccessStoriesSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  // Slideshow state
  const outerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [, _setCurrent] = useState(START);
  const [paused, setPaused] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const currentRef = useRef(START);
  const dragStartX = useRef(0);
  const strideRef = useRef(1); // updated each render — safe to read in handlers

  const setCurrent = (v: number) => {
    currentRef.current = v;
    _setCurrent(v);
  };

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

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => setContainerW(entry.contentRect.width));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setCurrent(currentRef.current + 1), 3000);
    return () => clearInterval(timer);
  }, [paused]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "transform") return;
    const curr = currentRef.current;
    if (curr >= RESET_HIGH) {
      setNoTransition(true);
      setCurrent(curr - (COPIES - 2) * N); // jump back 3 copies
    } else if (curr < RESET_LOW) {
      setNoTransition(true);
      setCurrent(curr + (COPIES - 2) * N); // jump forward 3 copies
    }
  };

  useEffect(() => {
    if (!noTransition) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setNoTransition(false))
    );
    return () => cancelAnimationFrame(id);
  }, [noTransition]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);

    // If a mid-transition autoplay reset left current near an edge, snap back to center copy
    const curr = currentRef.current;
    if (curr < RESET_LOW || curr >= RESET_HIGH) {
      const item = ((curr % N) + N) % N;
      const safe = Math.floor(COPIES / 2) * N + item;
      currentRef.current = safe;
      _setCurrent(safe);
    }

    dragStartX.current = e.clientX;
    setDragging(true);
    setPaused(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const stride = strideRef.current;
    const raw = e.clientX - dragStartX.current;

    // Live-correct if the drag would expose the edge of the extended array
    const effectivePos = currentRef.current - raw / stride;
    const MIN_IDX = 1;
    const MAX_IDX = EXTENDED.length - 2; // 13

    if (effectivePos < MIN_IDX) {
      const shift = Math.ceil((MIN_IDX - effectivePos) / N) * N;
      currentRef.current += shift;
      _setCurrent(currentRef.current);
      dragStartX.current -= shift * stride; // keep visual position unchanged
    } else if (effectivePos > MAX_IDX) {
      const shift = Math.ceil((effectivePos - MAX_IDX) / N) * N;
      currentRef.current -= shift;
      _setCurrent(currentRef.current);
      dragStartX.current += shift * stride;
    }

    setDragOffset(e.clientX - dragStartX.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const delta = e.clientX - dragStartX.current;
    setDragging(false);
    setDragOffset(0);
    setPaused(false);
    if (delta < -DRAG_THRESHOLD) setCurrent(currentRef.current + 1);
    else if (delta > DRAG_THRESHOLD) setCurrent(currentRef.current - 1);
  };

  // Derived layout values — also written to refs so handlers can read them
  const isDesktop = containerW >= 1200;
  const isMobile = containerW > 0 && containerW < 810;
  const visualGap = isDesktop ? VISUAL_GAP : 20;
  const itemW = Math.min(MAX_W, containerW * (isMobile ? 0.85 : 0.8));
  const layoutGap = visualGap - (1 - INACTIVE_SCALE) / 2 * itemW;
  const stride = itemW + layoutGap;
  strideRef.current = stride;

  // Use currentRef in trackX so live drag corrections take effect immediately
  const trackX = containerW / 2 - itemW / 2 - currentRef.current * stride + dragOffset;

  const card = (t: (typeof successStories)[number]) =>
    isMobile ? (
      <div
        className="flex flex-col gap-[20px] p-[20px]"
        style={{ width: "100%", backgroundColor: "var(--color-white)", borderRadius: 12 }}
      >
        <img src={t.image} alt={t.name} className="object-cover" style={{ borderRadius: 12, width: 166, height: 166 }} draggable={false} />
        <div className="flex flex-col gap-[16px]">
          <Stars />
          <p className="heading-4b" style={{ color: "var(--color-black)" }}>{t.quote}</p>
          <div className="flex flex-col gap-[4px]">
            <span className="heading-4b" style={{ color: "var(--color-black)" }}>{t.name}</span>
            <span className="body-16-regular" style={{ color: "#464646" }}>{t.location}</span>
          </div>
        </div>
      </div>
    ) : (
      <div
        className="flex flex-row gap-[20px] items-start"
        style={{ width: "100%", backgroundColor: "var(--color-white)", borderRadius: 12, padding: "28px 30px" }}
      >
        <div className="flex-shrink-0">
          <img src={t.image} alt={t.name} className="object-cover" style={{ width: 166, height: 166, maxWidth: 166, borderRadius: 12 }} draggable={false} />
        </div>
        <div className="flex flex-col gap-[16px]">
          <Stars />
          <p className="heading-4b" style={{ color: "var(--color-black)" }}>{t.quote}</p>
          <div className="flex flex-col gap-[4px]">
            <span className="heading-4b" style={{ color: "var(--color-black)" }}>{t.name}</span>
            <span className="body-16-regular" style={{ color: "#464646" }}>{t.location}</span>
          </div>
        </div>
      </div>
    );

  const headerTop = (
    <div
      className="w-full flex flex-col gap-[24px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        transition: SPRING_REVEAL,
      }}
    >
      <div className="flex flex-row justify-start items-center gap-[16px]">
        <Image src="/leaf-icon.svg" alt="" width={20} height={20} style={{ flexShrink: 0 }} />
        <span className="body-16-regular">Success Stories</span>
      </div>
    </div>
  );

  const moreStoriesLink = (
    <Link
      href="/success-stories"
      className="cta-link inline-flex items-center gap-[8px] no-underline"
      onMouseEnter={() => setCtaHovered(true)}
      onMouseLeave={() => setCtaHovered(false)}
      style={{ color: "var(--color-dark-gray)", transition: "color 0.6s cubic-bezier(0.44, 0, 0.56, 1)" }}
    >
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "24px", letterSpacing: "-0.01em", lineHeight: 1 }}>[</span>
      <span className="body-16-regular" style={{ color: "var(--color-dark-gray)" }}>MORE STORIES</span>
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

  const headerMain = (
    <div
      className="w-full flex flex-col gap-[24px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        transition: SPRING_REVEAL,
      }}
    >
      <div style={{ width: "100%", height: 1, background: "linear-gradient(to right, var(--color-light-gray), transparent)" }} />
      <h2 className="heading-1b tablet:max-w-[826px]" style={{ color: "var(--color-near-black)" }}>Happy Client Stories.</h2>
      <div className="hidden tablet:block">{moreStoriesLink}</div>
    </div>
  );

  return (
    <section ref={ref} className="w-full" style={{ backgroundColor: "var(--color-soft-white)" }}>
      <div className="max-w-[1296px] mx-auto w-full px-[20px] tablet:px-[30px] pt-[60px] tablet:pt-[80px] desktop:pt-[120px]">
        {headerTop}
      </div>

      <div className="max-w-[1296px] mx-auto w-full px-[20px] tablet:px-[30px] pt-[24px] flex flex-col gap-[24px] desktop:gap-[40px]">
        {headerMain}
      </div>

      {/* Slideshow — same mechanics as the About Us hero slideshow, constrained to the section width */}
      <div
        ref={outerRef}
        className="max-w-[1296px] mx-auto w-full px-[20px] tablet:px-[30px] overflow-hidden pt-[40px] pb-[60px] tablet:pb-[80px] desktop:pb-[120px]"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onMouseEnter={() => !dragging && setPaused(true)}
        onMouseLeave={() => !dragging && setPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="flex items-center"
          style={{
            transform: `translateX(${trackX}px)`,
            transition: noTransition || dragging ? "none" : `transform ${SPRING}`,
            userSelect: "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {EXTENDED.map((item, i) => {
            const active = i === currentRef.current;
            return (
              <div
                key={i}
                className="shrink-0"
                style={{
                  width: itemW,
                  marginLeft: i === 0 ? 0 : layoutGap,
                  zIndex: active ? 1 : 0,
                  transform: active ? "scale(1)" : `scale(${INACTIVE_SCALE})`,
                  transition: noTransition || dragging ? "none" : `transform ${SPRING}`,
                }}
              >
                {card(item)}
              </div>
            );
          })}
        </div>
      </div>

      <div className="tablet:hidden flex justify-center pb-[60px]">{moreStoriesLink}</div>
    </section>
  );
}
