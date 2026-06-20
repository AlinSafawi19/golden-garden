import Link from "next/link";

export default function ContactHero() {
  return (
    <section className="-mt-[52px] w-full flex flex-col gap-[40px] pt-[110px] pb-0 overflow-hidden tablet:gap-[80px] tablet:pt-[150px] desktop:gap-[120px] desktop:pt-[180px]">
      {/* Padded content */}
      <div className="px-[20px] tablet:px-[30px] desktop:px-[30px]">
        <div className="w-full max-w-[1296px] mx-auto flex flex-col gap-[40px] tablet:gap-[80px] desktop:gap-[120px]">
          <div className="flex flex-col gap-[10px]">

            {/* Title wrapper */}
            <div className="flex flex-col gap-[10px]">
              <h1 className="heading-1c max-w-[950px]">Contact For Work</h1>
            </div>

            {/* Text wrapper */}
            <div className="flex gap-[10px] justify-end">
              <div className="max-w-[526px] flex flex-col gap-[10px]">
                <p className="body-20-regular-3" style={{ color: "#464646" }}>
                  Get in touch with us to bring your landscaping ideas to life
                  with expert care and creativity. Let&apos;s work together to
                  create outdoor spaces that are beautiful, functional, and
                  uniquely yours.
                </p>

                {/* Breadcrumb */}
                <div className="flex flex-row gap-[5px]">
                  <Link href="/" className="link-2">Home</Link>
                  <span className="body-16-regular" style={{ color: "var(--color-coral)" }}>/</span>
                  <span className="body-16-regular" style={{ color: "var(--color-black)" }}>Contact</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
