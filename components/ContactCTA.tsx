export default function ContactCTA() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto text-center" id="contact">
      <div className="inline-block mb-8">
        <span className="material-symbols-outlined text-6xl text-primary animate-pulse">
          alternate_email
        </span>
      </div>

      <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
        READY TO BUILD SOMETHING{" "}
        <span className="italic text-secondary">SUBSTANTIAL</span>?
      </h2>

      <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
        Currently open for architectural consultations and engineering
        leadership roles for 2026.
      </p>

      <a
        href="https://www.linkedin.com/in/felix-toledo-ctes/"
        target="_blank"
        className="inline-flex items-center gap-4 bg-on-surface text-surface px-12 py-6 rounded-md font-black tracking-[0.2em] uppercase hover:bg-primary transition-colors text-sm"
      >
        Initiate Project
        <span className="material-symbols-outlined">send</span>
      </a>
    </section>
  );
}
