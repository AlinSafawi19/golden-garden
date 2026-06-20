const projectMeta = [
  { label: "Client", value: "Gondi Brand .inc" },
  { label: "Location", value: "Location Chicago, IL" },
  { label: "Time Duration", value: "8 months" },
  { label: "Square Meters", value: "120,00m²" },
  { label: "Category", value: "Garden Renovation" },
];

export default function ProjectDetailsContent() {
  return (
    <div className="flex flex-col gap-[40px] tablet:gap-[60px] desktop:gap-[68px]">

      {/* Meta row */}
      <div className="flex flex-col gap-[15px] tablet:flex-row tablet:flex-wrap tablet:items-start tablet:justify-center tablet:gap-[20px]">
        {projectMeta.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-[6px] text-left tablet:text-center">
            <span className="body-16-regular" style={{ color: "#464646" }}>
              {label}
            </span>
            <span className="body-20-regular" style={{ color: "var(--color-near-black)" }}>
              {value}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
