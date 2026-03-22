import Image from "next/image";
import projects from "@/data/projects.json";

type Project = {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string | null;
  placeholderIcon: string | null;
  link: { label: string; href: string };
  tags: string[];
};

export default function SelectedWorks() {
  return (
    <section className="py-24 bg-surface-container-low" id="works">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">
            Selected Works
          </h2>
          <p className="text-on-surface-variant text-lg">
            Engineering solutions for complex problems.
          </p>
        </div>

        <div className="space-y-24">
          {(projects as Project[]).map((project, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={project.id}
                className={`flex flex-col ${
                  isReversed ? "md:flex-row-reverse" : "md:flex-row"
                } gap-12 items-center group`}
              >
                {/* Visual */}
                <div className="w-full md:w-3/5 aspect-video bg-surface-container overflow-hidden rounded-xl relative">
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-surface-container-highest">
                      <span className="material-symbols-outlined text-6xl text-outline-variant">
                        {project.placeholderIcon}
                      </span>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div
                  className={`w-full md:w-2/5 space-y-6 ${
                    isReversed ? "md:text-right" : ""
                  }`}
                >
                  <span className="text-4xl font-black text-outline-variant opacity-30">
                    {project.number}
                  </span>
                  <h3 className="text-3xl font-bold">{project.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div
                    className={`flex flex-wrap gap-2 pt-1 ${
                      isReversed ? "md:justify-end" : ""
                    }`}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-surface-container text-on-surface-variant px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div
                    className={`flex gap-4 pt-2 ${
                      isReversed ? "md:justify-end" : ""
                    }`}
                  >
                    <a
                      href={project.link.href}
                      className="group/link flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest"
                    >
                      {project.link.label}
                      <span className="material-symbols-outlined text-primary group-hover/link:translate-x-1 transition-transform">
                        north_east
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
