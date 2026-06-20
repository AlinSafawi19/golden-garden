"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const image = imageRef.current;
      if (!section || !image) return;

      const rect = section.getBoundingClientRect();
      // Only animate while the hero is anywhere near the viewport.
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      // Move the image at ~30% of scroll speed. The image is 130% tall,
      // so it has 15% of overflow on each side to travel into.
      const offset = -rect.top * 0.3;
      image.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-52px)] overflow-hidden bg-[var(--color-soft-white)]"
    >
      <img
        ref={imageRef}
        src="https://framerusercontent.com/images/Vs3xjh9zhi5xd5RfyQgYf4M2yLQ.webp?width=2160&height=1290"
        alt=""
        className="absolute -top-[15%] left-0 w-full h-[130%] object-cover will-change-transform"
      />
    </section>
  );
}
