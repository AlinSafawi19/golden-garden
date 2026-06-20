"use client";

import { useState, useEffect, useRef } from "react";

const IMAGES = [
  {
    src: "https://framerusercontent.com/images/oVjBVjUjhCbd0310jbOCyS0p7Q.png?width=1722&height=912",
    alt: "Garden 1",
  },
  {
    src: "https://framerusercontent.com/images/BFYVVcLICt1QxIvJeJEMZYBcxVY.png?width=1282&height=856",
    alt: "Garden 2",
  },
  {
    src: "https://framerusercontent.com/images/WuKYrHtSPbfFrXmyfNxlclIJn54.png?width=1068&height=712",
    alt: "Garden 3",
  },
];

const VISUAL_GAP = 24;
const INACTIVE_SCALE = 0.8;
const DRAG_THRESHOLD = 50;
const MAX_W = 861;
const RATIO = 456 / 861;
const SPRING = "1s cubic-bezier(0.65, 0, 0.35, 1)";

const N = IMAGES.length;          // 3
const COPIES = 5;                  // 15 items total — 2 full copies buffer each side
const EXTENDED = Array.from({ length: COPIES }, () => IMAGES).flat();
const START = Math.floor(COPIES / 2) * N + 1; // copy 3, middle image = index 7

// transitionEnd resets: keep current inside [N, 4N)
const RESET_LOW = N;              // 3
const RESET_HIGH = (COPIES - 1) * N; // 12

export default function HeroSlideshow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [current, _setCurrent] = useState(START);
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
      const img = ((curr % N) + N) % N;
      const safe = Math.floor(COPIES / 2) * N + img;
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
  const visualGap = isDesktop ? VISUAL_GAP : 20;
  const itemW = Math.min(MAX_W, containerW * 0.8);
  const itemH = isDesktop ? itemW * RATIO : 365;
  const layoutGap = visualGap - (1 - INACTIVE_SCALE) / 2 * itemW;
  const stride = itemW + layoutGap;
  strideRef.current = stride;

  // Use currentRef in trackX so live drag corrections take effect immediately
  const trackX = containerW / 2 - itemW / 2 - currentRef.current * stride + dragOffset;

  return (
    <div
      ref={outerRef}
      className="w-full overflow-hidden"
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
        {EXTENDED.map((item, i) => (
          <div
            key={i}
            className="shrink-0 overflow-hidden rounded-[16px]"
            style={{
              width: itemW,
              height: itemH,
              marginLeft: i === 0 ? 0 : layoutGap,
              zIndex: i === currentRef.current ? 1 : 0,
              transform: i === currentRef.current ? "scale(1)" : `scale(${INACTIVE_SCALE})`,
              transition: noTransition || dragging ? "none" : `transform ${SPRING}`,
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
