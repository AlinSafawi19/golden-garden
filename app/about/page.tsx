import AboutHero from "@/components/AboutHero";
import HeroSlideshow from "@/components/HeroSlideshow";
import AboutSection from "@/components/AboutSection";
import TickerSection from "@/components/TickerSection";
import { getEntryByField } from "@/lib/canopy";

export default async function AboutPage() {
  const ticker = await getEntryByField("moving-text-strip", "Page", "About");

  return (
    <div className="pb-[60px] tablet:pb-[80px] desktop:pb-[100px] bg-[var(--color-white)]">
      <AboutHero />

      {/* Slideshow — full-width, its own section */}
      <section className="w-full overflow-hidden">
        <HeroSlideshow />
      </section>

      <AboutSection />
      <TickerSection ticker={ticker} />
    </div>
  );
}
