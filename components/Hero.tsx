"use client";

import { useState } from "react";
import me from "@/data/me.json";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const ref = useScrollReveal<HTMLElement>();

  const videoId = me.assets.videoPresentationUrl.split("v=")[1];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-center px-6 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-20 right-0 w-1/2 h-full opacity-[0.06] pointer-events-none select-none overflow-hidden">
        <span
          className="material-symbols-outlined text-[40rem] animate-float"
          style={{ fontVariationSettings: '"wght" 100' }}
        >
          architecture
        </span>
      </div>

      <div className="z-10 max-w-4xl w-full">
        {/* Role + location badge */}
        <div className="reveal flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            {me.personal.role}
          </span>
          <span className="flex items-center gap-1.5 text-on-surface-variant text-xs tracking-widest font-medium">
            <span className="material-symbols-outlined text-sm">
              location_on
            </span>
            {me.personal.location}
          </span>
        </div>

        {/* Headline */}
        <h1 className="reveal d1 text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-[-0.04em] leading-[0.9] text-on-surface mb-8">
          ARCHITECTING <br />
          <span className="text-primary italic">SCALABLE</span> <br />
          WEB SYSTEMS <br />
          WITH PRECISION
        </h1>

        {/* Mantra */}
        <p className="reveal d2 text-xl md:text-2xl font-light text-on-surface-variant max-w-2xl leading-relaxed mb-10 border-l-4 border-secondary pl-6">
          {me.personal.mantra}
        </p>

        {/* CTAs */}
        <div className="reveal d3 flex flex-wrap gap-3 md:gap-4 mb-12">
          <a
            href="#works"
            className="aurora-gradient text-on-primary px-7 py-4 rounded-md font-bold tracking-widest uppercase text-xs flex items-center gap-2 hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            View Projects
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </a>

          <a
            href={me.assets.cvUrl}
            download
            className="flex items-center gap-2 border border-outline hover:border-primary text-on-surface hover:text-primary px-6 py-4 font-bold tracking-widest uppercase text-xs transition-all duration-300 rounded-md hover:bg-primary/5"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Download CV
          </a>

          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-3 text-on-surface-variant hover:text-primary px-3 py-4 font-bold tracking-widest uppercase text-xs transition-colors duration-300 group"
          >
            <span className="w-9 h-9 rounded-full border-2 border-current flex items-center justify-center animate-pulse-ring group-hover:bg-primary group-hover:border-primary group-hover:text-on-primary transition-all duration-300">
              <span className="material-symbols-outlined text-sm ml-0.5">
                play_arrow
              </span>
            </span>
            Watch Intro
          </button>

          <a
            href="#contact"
            className="border-b-2 border-secondary-fixed-dim text-on-surface px-4 py-4 font-bold tracking-widest uppercase text-xs hover:text-secondary transition-colors"
          >
            Get in touch
          </a>
        </div>

        {/* Social strip */}
        <div className="reveal d4 flex flex-wrap items-center gap-6">
          <span className="text-[10px] font-black tracking-[0.25em] uppercase text-on-surface-variant/50">
            Find me:
          </span>
          <a
            href={me.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-on-surface-variant hover:text-on-surface transition-all duration-300 group"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-y-0.5 transition-transform">
              code
            </span>
            GitHub
          </a>
          <a
            href={me.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-all duration-300 group"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-y-0.5 transition-transform">
              work
            </span>
            LinkedIn
          </a>
          <a
            href={`mailto:${me.contact.email}`}
            className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-on-surface-variant hover:text-secondary transition-all duration-300 group"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-y-0.5 transition-transform">
              alternate_email
            </span>
            {me.contact.email}
          </a>
        </div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl flex flex-col gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl relative">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={`${me.personal.name} - Video Presentation`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors z-10"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <p className="text-center text-white/50 text-xs italic px-2">
              ⚠️ Disclaimer: este video tiene ~3 años y fue grabado para un
              propósito completamente diferente... sí, es un poco gracioso.
              Nuevo video en camino 🙃
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
