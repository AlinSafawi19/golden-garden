import ProjectsHero from "@/components/ProjectsHero";

export default function ProjectsPage() {
  return (
    <section className="-mt-[52px] w-full overflow-hidden flex flex-col pt-[110px] pb-[60px] px-[20px] tablet:pt-[150px] tablet:pb-[80px] tablet:px-[30px] desktop:pt-[180px] desktop:pb-[100px]">
      <div className="w-full max-w-[1296px] mx-auto flex flex-col gap-[40px] tablet:gap-[80px] desktop:gap-[120px]">
        <ProjectsHero />
      </div>
    </section>
  );
}
