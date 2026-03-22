"use client";

import me from "@/data/me.json";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ContactCTA() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 px-6 max-w-7xl mx-auto text-center"
    >
      <div className="reveal inline-block mb-8">
        <span className="material-symbols-outlined text-6xl text-primary animate-pulse">
          alternate_email
        </span>
      </div>

      <h2 className="reveal d1 text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
        READY TO BUILD SOMETHING{" "}
        <span className="italic text-secondary">SUBSTANTIAL</span>?
      </h2>

      <p className="reveal d2 text-xl text-on-surface-variant mb-6 max-w-2xl mx-auto">
        Currently open for architectural consultations and engineering
        leadership roles.
      </p>

      <p className="reveal d2 text-sm text-on-surface-variant/70 mb-12 max-w-xl mx-auto">
        {me.story.future}
      </p>

      <div className="reveal d3 flex flex-wrap justify-center gap-4">
        <a
          href={me.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-on-surface text-surface px-10 py-5 rounded-md font-black tracking-[0.2em] uppercase hover:bg-primary transition-colors duration-300 text-sm hover:scale-105 hover:shadow-xl"
        >
          Connect on LinkedIn
          <span className="material-symbols-outlined">send</span>
        </a>
        <a
          href={`mailto:${me.contact.email}`}
          className="inline-flex items-center gap-3 border-2 border-outline hover:border-primary text-on-surface hover:text-primary px-8 py-5 rounded-md font-black tracking-[0.2em] uppercase transition-all duration-300 text-sm hover:bg-primary/5"
        >
          <span className="material-symbols-outlined">alternate_email</span>
          {me.contact.email}
        </a>
      </div>
    </section>
  );
}
