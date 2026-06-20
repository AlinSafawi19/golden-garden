"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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
      const card = cardRef.current;
      const word = wordmarkTextRef.current;
      if (!section || !word) return;
      const sectionRect = section.getBoundingClientRect();
      const wordRect = word.getBoundingClientRect();
      // Intro starts at the wordmark's left edge; card ends at its right edge.
      if (intro) intro.style.paddingLeft = `${wordRect.left - sectionRect.left}px`;
      if (card) card.style.paddingRight = `${sectionRect.right - wordRect.right}px`;
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
    const reveal = () => {
      introRef.current?.classList.add("intro-ready");
      if (cardRef.current) {
        cardRef.current.style.opacity = "1";
        cardRef.current.style.transform = "translateX(0)";
      }
    };

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

      {/* Top overlay — intro on mobile stacks above the card; split on tablet+ */}
      <div className="absolute inset-x-0 top-0">

      {/* Top-left intro line — per-character "On Appear" enter effect */}
      <div
        ref={introRef}
        className="px-[20px] pt-[40px] tablet:px-[30px] tablet:pt-[60px]"
      >
        <h1
          className="max-w-none tablet:max-w-[330px] desktop:max-w-[600px]"
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

      {/* Stat card — under the intro on mobile, top-right on tablet+ */}
      <div
        ref={cardRef}
        className="px-[20px] pt-[24px] tablet:absolute tablet:top-0 tablet:right-0 tablet:pl-0 tablet:pr-[30px] tablet:pt-[60px]"
        style={{
          opacity: 0,
          transform: "translateX(40px)",
          // Spring (stiffness 400 / damping 60 / mass 1) is overdamped → ease-out, 0.2s delay.
          transition:
            "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
        }}
      >
        <div className="flex w-full items-stretch gap-[16px] rounded-[12px] bg-white/20 p-[16px] backdrop-blur-[47px] tablet:w-[clamp(340px,34vw,440px)] tablet:gap-[23px] tablet:p-[21px]">
          {/* Video */}
          <video
            src="https://framerusercontent.com/assets/ekmdQ1zyWDTrVTODmt0YYQ0Zrqs.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-[clamp(100px,11vw,148px)] flex-shrink-0 self-stretch rounded-[12px] object-cover"
          />

          {/* Text column — blurb on top, stat row at the bottom */}
          <div className="flex flex-1 flex-col justify-between gap-[16px] tablet:gap-[23px]">
            <p
              className="body-18-regular"
              style={{ color: "var(--color-white)" }}
            >
              90k+ gardens have been saved and made from all over the world.
            </p>

            <div className="flex items-end justify-between">
              <span
                style={{
                  fontFamily: "var(--font-heading), serif",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 3.4vw, 44px)",
                  lineHeight: 1,
                  color: "var(--color-white)",
                }}
              >
                90K+
              </span>
              <span
                className="body-18-medium pb-[4px]"
                style={{ color: "var(--color-white)" }}
              >
                Gardens
              </span>
            </div>
          </div>
        </div>
      </div>

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
