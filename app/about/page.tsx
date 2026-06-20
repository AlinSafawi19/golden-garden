import AboutHero from "@/components/AboutHero";
import HeroSlideshow from "@/components/HeroSlideshow";
import AboutSection from "@/components/AboutSection";
import TickerSection from "@/components/TickerSection";

export default function AboutPage() {
  return (
    <div className="pb-[60px] tablet:pb-[80px] desktop:pb-[100px] bg-[var(--color-white)]">
      <AboutHero />

      {/* Slideshow — full-width, its own section */}
      <section className="w-full overflow-hidden">
        <HeroSlideshow />
      </section>

      <AboutSection />
      <TickerSection />
    </div>
  );
}
