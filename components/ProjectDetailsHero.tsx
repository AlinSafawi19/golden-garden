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
            Explore the details behind each project, showcasing our design
            approach, craftsmanship, and thoughtful execution. See how every
            element comes together to create a beautiful and functional
            outdoor space.
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
