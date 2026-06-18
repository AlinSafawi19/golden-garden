"use client";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          v.currentTime = v.duration * 0.5;
        }}
      >
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
