import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TickerSection from "@/components/TickerSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import WorkSection from "@/components/WorkSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import { getDefaultEntry } from "@/lib/canopy";

export default async function Home() {
  const hero = await getDefaultEntry("welcome-section");

  return (
    <>
      <HeroSection hero={hero} />
      <AboutSection />
      <TickerSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <WorkSection />
      <SuccessStoriesSection />
    </>
  );
}
