import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="-mt-[52px] w-full overflow-hidden pt-[110px] mb-[40px] pb-[40px] px-[20px] tablet:pt-[150px] tablet:mb-[80px] tablet:pb-0 tablet:px-[30px] desktop:pt-[180px] desktop:mb-[120px] desktop:pb-[80px] bg-[var(--color-soft-white)]">
      <div className="w-full max-w-[1296px] mx-auto">
        <div className="flex flex-col gap-[10px]">

          {/* Title wrapper */}
          <div className="flex flex-col gap-[10px]">
            <h1 className="heading-1c max-w-[620px]">About Us</h1>
          </div>

          {/* Text wrapper */}
          <div className="flex gap-[10px] justify-end">
            <div className="max-w-[526px] flex flex-col gap-[10px]">
              <p className="body-20-regular-3" style={{ color: "#464646" }}>
                Explore the details behind each project, showcasing our design
                approach, craftsmanship, and thoughtful execution. See how every
                element comes together to create a beautiful and functional
                outdoor space.
              </p>

              {/* Breadcrumb */}
              <div className="flex flex-row gap-[5px]">
                <Link href="/" className="link-2">Home</Link>
                <span className="body-16-regular" style={{ color: "var(--color-coral)" }}>/</span>
                <span className="body-16-regular" style={{ color: "var(--color-black)" }}>About Us</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
