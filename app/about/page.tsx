import AboutHero from "@/components/AboutHero";
import HeroSlideshow from "@/components/HeroSlideshow";
import AboutSection from "@/components/AboutSection";
import TickerSection from "@/components/TickerSection";
import { getEntryByField } from "@/lib/canopy";

export default async function AboutPage() {
  const [ticker, about] = await Promise.all([
    getEntryByField("moving-text-strip", "Page", "About"),
    getEntryByField("about-intro", "Page", "About"),
  ]);

  return (
    <div className="pb-[60px] tablet:pb-[80px] desktop:pb-[100px] bg-[var(--color-white)]">
      <AboutHero />

      {/* Slideshow — full-width, its own section */}
      <section className="w-full overflow-hidden">
        <HeroSlideshow />
      </section>

      <AboutSection content={about} />
      <TickerSection ticker={ticker} />
    </div>
  );
}
