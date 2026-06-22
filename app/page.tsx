import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TickerSection from "@/components/TickerSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import WorkSection from "@/components/WorkSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import { getEntryByField, getFirstEntry } from "@/lib/canopy";

export default async function Home() {
  const [hero, ticker, about, whyChooseUs] = await Promise.all([
    getFirstEntry("welcome-section"),
    getEntryByField("moving-text-strip", "Page", "Home"),
    getEntryByField("about-intro", "Page", "Home"),
    getFirstEntry("why-choose-us"),
  ]);

  return (
    <>
      <HeroSection hero={hero} />
      <AboutSection content={about} />
      <TickerSection ticker={ticker} />
      <ServicesSection />
      <WhyChooseUsSection content={whyChooseUs} />
      <WorkSection />
      <SuccessStoriesSection />
    </>
  );
}
