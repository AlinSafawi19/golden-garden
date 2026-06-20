import ServicesHero from "@/components/ServicesHero";
import ServicesList from "@/components/ServicesList";

export default function ServicesPage() {
  return (
    <div className="-mt-[52px] bg-[var(--color-white)]">
      {/* Hero band — full-width soft white */}
      <section className="w-full overflow-hidden pt-[110px] mb-[40px] pb-[40px] px-[20px] tablet:pt-[150px] tablet:mb-[80px] tablet:pb-0 tablet:px-[30px] desktop:pt-[180px] desktop:mb-[120px] desktop:pb-[80px] bg-[var(--color-soft-white)]">
        <div className="w-full max-w-[1296px] mx-auto">
          <ServicesHero />
        </div>
      </section>

      {/* Content */}
      <section className="w-full overflow-hidden pb-[60px] px-[20px] tablet:pb-[80px] tablet:px-[30px] desktop:pb-[100px]">
        <div className="w-full max-w-[1296px] mx-auto flex flex-col gap-[40px] tablet:gap-[80px] desktop:gap-[120px]">
          <ServicesList />
        </div>
      </section>
    </div>
  );
}
