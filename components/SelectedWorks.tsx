"use client";

import Image from "next/image";
import Link from "next/link";
import projects from "@/data/projects.json";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Project = {
  id: number;
  slug: string;
  number: string;
  title: string;
  client: string;
  description: string;
  coverImage: string | null;
  placeholderIcon: string | null;
  gallery: string[];
  appUrl: string | null;
  repoUrl: string | null;
  markdownFile: string | null;
  tags: string[];
};

export default function SelectedWorks() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-surface-container-low" id="works">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="reveal mb-20 text-center md:text-left">
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
                className={`reveal flex flex-col ${
                  isReversed ? "md:flex-row-reverse" : "md:flex-row"
                } gap-12 items-center group`}
              >
                {/* Visual — links to project page */}
                <Link
                  href={`/projects/${project.slug}`}
                  className={`reveal ${isReversed ? "reveal-right" : "reveal-left"} d1 w-full md:w-3/5 aspect-video bg-surface-container overflow-hidden rounded-xl relative hover:shadow-2xl transition-shadow duration-500 block`}
                >
                  {project.coverImage ? (
                    <>
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-on-surface/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                        <span className="flex items-center gap-2 text-surface font-black text-sm uppercase tracking-widest translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                          View Project
                          <span className="material-symbols-outlined text-lg">
                            north_east
                          </span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-surface-container-highest group-hover:bg-surface-container transition-colors duration-500">
                      <span className="material-symbols-outlined text-6xl text-outline-variant group-hover:text-secondary group-hover:scale-110 transition-all duration-500">
                        {project.placeholderIcon}
                      </span>
                      {/* Hover overlay for placeholder */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-end p-6">
                        <span className="flex items-center gap-1 text-on-surface-variant font-bold text-xs uppercase tracking-widest">
                          View Project
                          <span className="material-symbols-outlined text-base">
                            north_east
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                </Link>

                {/* Text */}
                <div
                  className={`reveal ${isReversed ? "reveal-left" : "reveal-right"} d2 w-full md:w-2/5 space-y-5 ${
                    isReversed ? "md:text-right" : ""
                  }`}
                >
                  {/* Number + client */}
                  <div
                    className={`flex items-baseline gap-3 ${isReversed ? "md:justify-end" : ""}`}
                  >
                    <span className="text-3xl font-black text-outline-variant opacity-30 leading-none">
                      {project.number}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                      {project.client}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
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
                        className="bg-surface-container hover:bg-surface-container-high text-on-surface-variant px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors duration-200 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div
                    className={`flex items-center flex-wrap gap-4 pt-2 ${
                      isReversed ? "md:justify-end" : ""
                    }`}
                  >
                    {/* Primary: project page */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/link flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest hover:text-primary transition-colors duration-300"
                    >
                      Case Study
                      <span className="material-symbols-outlined text-primary group-hover/link:translate-x-1 transition-transform duration-300">
                        north_east
                      </span>
                    </Link>

                    {/* Secondary: live app */}
                    {project.appUrl && (
                      <a
                        href={project.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-1 font-bold uppercase text-[10px] tracking-widest text-on-surface-variant hover:text-secondary transition-colors duration-300"
                      >
                        <span className="material-symbols-outlined text-sm">
                          open_in_new
                        </span>
                        Live
                      </a>
                    )}

                    {/* Secondary: repo */}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-1 font-bold uppercase text-[10px] tracking-widest text-on-surface-variant hover:text-secondary transition-colors duration-300"
                      >
                        <span className="material-symbols-outlined text-sm">
                          code
                        </span>
                        Repo
                      </a>
                    )}
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
