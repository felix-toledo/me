import Link from "next/link";
import me from "@/data/me.json";

export default function Footer() {
  return (
    <footer className="bg-[#1c1b1b] w-full text-[#fcf9f8]">
      {/* Story strip */}
      <div className="border-b border-[#fcf9f8]/10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#fcf9f8]/30 mb-10">
            The Journey
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-6 rounded-full border border-primary/40 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xs">
                    history
                  </span>
                </span>
                <p className="text-[10px] font-black tracking-[0.25em] uppercase text-primary">
                  Past
                </p>
              </div>
              <p className="text-[#fcf9f8]/55 text-sm leading-relaxed group-hover:text-[#fcf9f8]/80 transition-colors duration-300">
                {me.story.past}
              </p>
            </div>
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-6 rounded-full border border-[#97ccfe]/40 flex items-center justify-center text-[#97ccfe]">
                  <span className="material-symbols-outlined text-xs">
                    person
                  </span>
                </span>
                <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[#97ccfe]">
                  Present
                </p>
              </div>
              <p className="text-[#fcf9f8]/55 text-sm leading-relaxed group-hover:text-[#fcf9f8]/80 transition-colors duration-300">
                {me.story.present}
              </p>
            </div>
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-6 rounded-full border border-yellow-400/40 flex items-center justify-center text-yellow-400">
                  <span className="material-symbols-outlined text-xs">
                    rocket_launch
                  </span>
                </span>
                <p className="text-[10px] font-black tracking-[0.25em] uppercase text-yellow-400">
                  Future
                </p>
              </div>
              <p className="text-[#fcf9f8]/55 text-sm leading-relaxed group-hover:text-[#fcf9f8]/80 transition-colors duration-300">
                {me.story.future}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="px-6 pt-14 pb-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
          {/* Brand block */}
          <div className="max-w-sm space-y-5">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="material-symbols-outlined text-primary transition-transform duration-300 group-hover:rotate-12">
                terminal
              </span>
              <span className="font-black text-sm tracking-widest uppercase group-hover:text-primary transition-colors duration-300">
                FELIXTOLEDO.TECH
              </span>
            </Link>
            <p className="text-[#fcf9f8]/35 text-sm leading-relaxed italic">
              &ldquo;{me.personal.mantra}&rdquo;
            </p>
            <div className="flex items-center gap-2 text-[#fcf9f8]/30 text-[10px] tracking-widest uppercase">
              <span className="material-symbols-outlined text-xs">
                location_on
              </span>
              {me.personal.location}
            </div>
            <a
              href={me.assets.cvUrl}
              download
              className="inline-flex items-center gap-2 border border-[#fcf9f8]/20 hover:border-primary hover:text-primary text-[#fcf9f8]/50 px-4 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-md hover:bg-primary/5 w-fit"
            >
              <span className="material-symbols-outlined text-sm">
                download
              </span>
              Download CV
            </a>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-8">
            <div className="space-y-3">
              <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[#fcf9f8]/25 mb-5">
                Navigate
              </p>
              {[
                { label: "Home", href: "/" },
                { label: "Stack", href: "/#stack" },
                { label: "Works", href: "/#works" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/#contact" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="block text-xs uppercase tracking-widest text-[#fcf9f8]/50 hover:text-[#fcf9f8] transition-colors duration-300"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[#fcf9f8]/25 mb-5">
                Social
              </p>
              <a
                href={me.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#fcf9f8]/50 hover:text-[#97ccfe] transition-colors duration-300 group"
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
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#fcf9f8]/50 hover:text-primary transition-colors duration-300 group"
              >
                <span className="material-symbols-outlined text-sm group-hover:-translate-y-0.5 transition-transform">
                  work
                </span>
                LinkedIn
              </a>
              <a
                href={`mailto:${me.contact.email}`}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#fcf9f8]/50 hover:text-[#97ccfe] transition-colors duration-300 group"
              >
                <span className="material-symbols-outlined text-sm group-hover:-translate-y-0.5 transition-transform">
                  alternate_email
                </span>
                Email
              </a>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black tracking-[0.25em] uppercase text-[#fcf9f8]/25 mb-5">
                Role
              </p>
              <p className="text-[#fcf9f8]/50 text-xs leading-relaxed">
                {me.personal.role}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#fcf9f8]/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#fcf9f8]/30 text-[10px] font-bold tracking-[0.3em] uppercase">
            © {me.metadata.creationDate} · {me.personal.name}
          </p>
          <p className="text-[#fcf9f8]/15 text-[10px] font-bold tracking-[0.25em] uppercase">
            Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
