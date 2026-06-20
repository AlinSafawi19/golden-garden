"use client";

import { useEffect, useRef } from "react";

const IMAGE_SRC =
  "https://framerusercontent.com/images/fPRMcShg7nR6bTgMJ0vP2N29lE.webp?width=1944&height=1091";

/* Three reveal circles clustered around the center as an overlapping trefoil,
so they read as three distinct dots that bloom outward and merge. origin is
a % of the box; delay (fraction of the timeline) is a slight organic offset.*/
const CIRCLES = [
  { cx: 25, cy: 46, delay: 0 },
  { cx: 50, cy: 54, delay: 0.06 },
  { cx: 75, cy: 46, delay: 0.12 },
];

/* Fraction of the box diagonal each circle grows to — large enough that the
three together cover every corner, since they all start near the center.*/
const SPREAD = 0.45;

const DURATION = 1600; // ms for a single circle to fully expand

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function ContactImage() {
  const imgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef<number | null>(null);
  // Each circle's current progress (0 = collapsed dot, 1 = fully grown).
  const currentRef = useRef<number[]>(CIRCLES.map(() => 0));
  const fromRef = useRef<number[]>(CIRCLES.map(() => 0));
  const targetRef = useRef(0);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const paint = (progresses: number[]) => {
      const { width, height } = img.getBoundingClientRect();
      /* Per-circle max radius: a fraction of the diagonal so each one only
      covers part of the box and the three must combine to fully reveal it.*/
      const maxR = Math.hypot(width, height) * SPREAD;
      const layers = CIRCLES.map((c, i) => {
        const r = progresses[i] * maxR;
        const x = (c.cx / 100) * width;
        const y = (c.cy / 100) * height;
        // Slight soft edge: solid until a bit before r, then a gentle fade.
        const inner = Math.max(0, r - 14);
        return `radial-gradient(circle at ${x}px ${y}px, #000 ${inner}px, transparent ${r}px)`;
      });
      const mask = layers.join(", ");
      img.style.setProperty("-webkit-mask-image", mask);
      img.style.setProperty("mask-image", mask);
    };

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const to = targetRef.current;
      let done = true;
      const progresses = CIRCLES.map((c, i) => {
        const local = (elapsed - c.delay * DURATION) / DURATION;
        const t = easeOut(Math.min(1, Math.max(0, local)));
        if (local < 1) done = false;
        // Interpolate from where this circle was toward the target (0 or 1),
        // so both reveal and hide animate from the current state.
        const value = fromRef.current[i] + (to - fromRef.current[i]) * t;
        currentRef.current[i] = value;
        return value;
      });
      paint(progresses);
      if (!done) rafRef.current = requestAnimationFrame(tick);
    };

    // Animate every circle toward `target` (1 = reveal, 0 = hide).
    const animateTo = (target: number) => {
      cancelAnimationFrame(rafRef.current);
      fromRef.current = currentRef.current.slice();
      targetRef.current = target;
      startRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    };

    paint(currentRef.current); // hidden until it scrolls into view

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reveal when entering the viewport, collapse back when leaving —
        // both directions animate the circles.
        animateTo(entry.isIntersecting ? 1 : 0);
      },
      { threshold: 0.1 }
    );
    observer.observe(img);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-[10px] rounded-[12px] overflow-hidden">
      {/* Turbulence filter: distorts the circular mask edges into organic,
          imperfect blob shapes instead of perfect circles. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="contact-reveal-wobble">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={28}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      {/* Filter lives on this wrapper, not the img: CSS applies a filter
          BEFORE the mask, so to distort the circular mask edges the filter
          must run on the already-masked image (its child). Slight upscale so
          the displaced outer edge stays clipped by the overflow-hidden wrapper
          rather than showing a wavy transparent rim. */}
      <div
        className="w-full"
        style={{
          filter: "url(#contact-reveal-wobble)",
          transform: "scale(1.06)",
        }}
      >
        <img
          ref={imgRef}
          src={IMAGE_SRC}
          alt=""
          className="w-full object-cover h-[196px] tablet:h-[421px] desktop:h-[640px]"
          draggable={false}
          style={{ WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }}
        />
      </div>
    </div>
  );
}
