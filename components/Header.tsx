"use client";

import { useState } from "react";

const navLinks = [
  { label: "Hero", href: "#" },
  { label: "Stack", href: "#stack" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fcf9f8]/80 backdrop-blur-md">
      <nav className="flex justify-between items-center px-6 h-16 w-full max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            terminal
          </span>
          <span className="text-xl font-black text-on-surface uppercase tracking-tighter">
            FELIXTOLEDO.TECH
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={
                i === 0
                  ? "text-primary font-bold text-xs uppercase tracking-widest"
                  : "text-on-surface opacity-70 text-xs uppercase tracking-widest hover:text-[#2E8B57] transition-colors duration-300"
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-on-surface"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#fcf9f8]/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 border-t border-outline-variant">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-on-surface opacity-70 text-xs uppercase tracking-widest hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
