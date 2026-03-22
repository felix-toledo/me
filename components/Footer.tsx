export default function Footer() {
  return (
    <footer className="bg-[#1c1b1b] w-full py-12 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full max-w-7xl mx-auto">
        <div className="text-[#fcf9f8] font-black text-sm tracking-widest uppercase">
          © 2026 FELIXTOLEDO.TECH
        </div>

        <div className="flex gap-12">
          <a
            href="#"
            className="text-xs font-medium tracking-widest uppercase text-[#fcf9f8]/60 hover:text-[#97ccfe] transition-colors"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-xs font-medium tracking-widest uppercase text-[#bb0013] underline decoration-2 underline-offset-4"
          >
            LinkedIn
          </a>
          <a
            href="#contact"
            className="text-xs font-medium tracking-widest uppercase text-[#fcf9f8]/60 hover:text-[#97ccfe] transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="text-[#fcf9f8]/40 text-[10px] font-bold tracking-[0.3em] uppercase">
          Monumental Architecture.
        </div>
      </div>
    </footer>
  );
}
