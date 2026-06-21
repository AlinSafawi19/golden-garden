import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TickerSection from "@/components/TickerSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import WorkSection from "@/components/WorkSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import { getDefaultEntry, getEntryByField } from "@/lib/canopy";

export default async function Home() {
  const [hero, ticker] = await Promise.all([
    getDefaultEntry("welcome-section"),
    getEntryByField("moving-text-strip", "Page", "Home"),
  ]);

  return (
    <>
      <HeroSection hero={hero} />
      <AboutSection />
      <TickerSection ticker={ticker} />
      <ServicesSection />
      <WhyChooseUsSection />
      <WorkSection />
      <SuccessStoriesSection />
    </>
  );
}
