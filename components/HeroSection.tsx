"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const wordmarkTextRef = useRef<HTMLSpanElement>(null);

  // "On Appear", per-character enter effect (see Framer panel):
  // opacity 0 + 40px Y offset + 5px blur, eased over 0.8s with a 0.03s stagger.
  const introText = "Where Green Dreams Take Root & Gardens Thrive.";
  const words = introText.split(" ");
  let charCount = 0;

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const image = imageRef.current;
      const heading = headingRef.current;
      if (!section || !image) return;

      const rect = section.getBoundingClientRect();
      // Only animate while the hero is anywhere near the viewport.
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      // Move the image at ~30% of scroll speed. The image is 130% tall,
      // so it has 15% of overflow on each side to travel into.
      const offset = -rect.top * 0.3;
      image.style.transform = `translate3d(0, ${offset}px, 0)`;

      // The headline rides the same parallax as the photo — no fade.
      if (heading) {
        heading.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };

    // Line up the intro line's left edge with the centered wordmark's left edge.
    const align = () => {
      const section = sectionRef.current;
      const intro = introRef.current;
      const word = wordmarkTextRef.current;
      if (!section || !intro || !word) return;
      const left =
        word.getBoundingClientRect().left - section.getBoundingClientRect().left;
      intro.style.paddingLeft = `${left}px`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      onScroll();
      align();
    };

    // Align while invisible, then reveal so the enter animation plays in place.
    const reveal = () => introRef.current?.classList.add("intro-ready");

    update();
    align();
    if (document.fonts?.ready) {
      // Re-align once the heading font swaps in (metrics change the wordmark width).
      document.fonts.ready.then(() => {
        align();
        reveal();
      });
    } else {
      reveal();
    }
    // Safety net: reveal even if the fonts promise never settles.
    const revealTimer = window.setTimeout(reveal, 1200);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(revealTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
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

      {/* Bottom scrim — keeps the headline legible over any part of the photo */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

      {/* Top-left intro line — per-character "On Appear" enter effect */}
      <div
        ref={introRef}
        className="absolute top-0 left-0 px-[20px] pt-[40px] tablet:px-[30px] tablet:pt-[60px]"
      >
        <h1
          className="max-w-none tablet:max-w-[600px]"
          style={{ color: "var(--color-white)" }}
        >
          {words.map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.split("").map((ch, ci) => (
                <span
                  key={ci}
                  className="char-enter inline-block"
                  style={{ animationDelay: `${charCount++ * 0.03}s` }}
                >
                  {ch}
                </span>
              ))}
              {wi < words.length - 1 && (
                <span
                  className="char-enter inline-block"
                  style={{ animationDelay: `${charCount++ * 0.03}s` }}
                >
                  &nbsp;
                </span>
              )}
            </span>
          ))}
        </h1>
      </div>

      {/* Foreground parallax layer — full-bleed wordmark, centered, edge to edge */}
      <div className="absolute inset-x-0 bottom-0 px-[20px] pb-[20px] tablet:px-[30px] tablet:pb-[30px]">
        <div
          ref={headingRef}
          className="heading-editorial whitespace-nowrap text-center select-none will-change-transform"
          style={{
            color: "var(--color-white)",
            fontSize: "14.2vw",
            lineHeight: 0.7,
          }}
        >
          <span ref={wordmarkTextRef}>Golden Garden</span>
        </div>
      </div>
    </section>
  );
}
