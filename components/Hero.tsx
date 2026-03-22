export default function Hero() {
  return (
    <section className="relative min-h-[921px] flex flex-col justify-center px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative background icon */}
      <div className="absolute top-20 right-0 w-1/2 h-full opacity-10 pointer-events-none select-none overflow-hidden">
        <span
          className="material-symbols-outlined text-[40rem]"
          style={{ fontVariationSettings: '"wght" 100' }}
        >
          architecture
        </span>
      </div>

      <div className="z-10 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-[-0.04em] leading-[0.9] text-on-surface mb-8">
          ARCHITECTING <br />
          <span className="text-primary italic">SCALABLE</span> <br />
          WEB SYSTEMS <br />
          WITH PRECISION
        </h1>

        <p className="text-xl md:text-2xl font-light text-on-surface-variant max-w-2xl leading-relaxed mb-12 border-l-4 border-secondary pl-6">
          Full-stack engineering specialized in Next.js, Node.js, and automated
          ecosystems. Delivering resilient infrastructure for modern digital
          products.
        </p>

        <div className="flex flex-wrap gap-6">
          <a
            href="#works"
            className="aurora-gradient text-on-primary px-8 py-4 rounded-md font-bold tracking-widest uppercase text-xs flex items-center gap-3 hover:scale-105 transition-transform"
          >
            View Projects
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </a>
          <a
            href="#contact"
            className="border-b-2 border-secondary-fixed-dim text-on-surface px-4 py-4 font-bold tracking-widest uppercase text-xs hover:text-secondary transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
