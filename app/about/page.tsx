import AboutHero from "@/components/AboutHero";
import AboutSection from "@/components/AboutSection";
import TickerSection from "@/components/TickerSection";

export default function AboutPage() {
  return (
    <div className="pb-[60px] tablet:pb-[80px] desktop:pb-[100px]">
      <AboutHero />
      <AboutSection />
      <TickerSection />
    </div>
  );
}
