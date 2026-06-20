import Link from "next/link";

export default function ProjectDetailsHero({ name }: { name: string }) {
  return (
    <div className="flex flex-col gap-[10px]">

      {/* Title wrapper */}
      <div className="flex flex-col gap-[10px]">
        <h1 className="heading-1c max-w-[900px]">{name}</h1>
      </div>

      {/* Text wrapper */}
      <div className="flex gap-[10px] justify-end">
        <div className="max-w-[526px] flex flex-col gap-[10px]">
          <p className="body-20-regular-3" style={{ color: "#464646" }}>
            A complete transformation of an outdoor space into a living garden
            retreat. From the first concept sketches to the final planting, this
            project blends thoughtful design, quality craftsmanship, and
            sustainable practices to create an environment that feels both
            curated and effortlessly natural.
          </p>

          {/* Breadcrumb */}
          <div className="flex flex-row gap-[5px]">
            <Link href="/" className="link-2">Home</Link>
            <span className="body-16-regular" style={{ color: "var(--color-coral)" }}>/</span>
            <Link href="/projects" className="link-2">Projects</Link>
            <span className="body-16-regular" style={{ color: "var(--color-coral)" }}>/</span>
            <span className="body-16-regular" style={{ color: "var(--color-black)" }}>{name}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
