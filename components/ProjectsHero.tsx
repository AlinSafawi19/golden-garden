import Link from "next/link";

export default function ProjectsHero() {
  return (
    <div className="flex flex-col gap-[10px]">

      {/* Title wrapper */}
      <div className="flex flex-col gap-[10px]">
        <h1 className="heading-1c max-w-[900px]">Our Projects</h1>
      </div>

      {/* Text wrapper */}
      <div className="flex gap-[10px] justify-end">
        <div className="max-w-[526px] flex flex-col gap-[10px]">
          <p className="body-20-regular-3" style={{ color: "#464646" }}>
            Explore our latest blogs for expert tips, creative ideas, and
            practical insights on landscaping and gardening. Stay inspired
            with seasonal advice and trends to keep your outdoor space
            thriving.
          </p>

          {/* Breadcrumb */}
          <div className="flex flex-row gap-[5px]">
            <Link href="/" className="link-2">Home</Link>
            <span className="body-16-regular" style={{ color: "var(--color-coral)" }}>/</span>
            <span className="body-16-regular" style={{ color: "var(--color-black)" }}>Projects</span>
          </div>
        </div>
      </div>

    </div>
  );
}
