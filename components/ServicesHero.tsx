import Link from "next/link";

export default function ServicesHero() {
  return (
    <div className="flex flex-col gap-[10px]">

      {/* Title wrapper */}
      <div className="flex flex-col gap-[10px]">
        <h1 className="heading-1c max-w-[620px]">Our Services</h1>
      </div>

      {/* Text wrapper */}
      <div className="flex gap-[10px] justify-end">
        <div className="max-w-[526px] flex flex-col gap-[10px]">
          <p className="body-20-regular-3" style={{ color: "#464646" }}>
            Discover our range of professional services designed to enhance
            and maintain your outdoor spaces with care and precision. We
            deliver solutions that keep your space beautiful, functional,
            and thriving.
          </p>

          {/* Breadcrumb */}
          <div className="flex flex-row gap-[5px]">
            <Link href="/" className="link-2">Home</Link>
            <span className="body-16-regular" style={{ color: "var(--color-coral)" }}>/</span>
            <span className="body-16-regular" style={{ color: "var(--color-black)" }}>Services</span>
          </div>
        </div>
      </div>

    </div>
  );
}
