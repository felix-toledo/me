"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

const navLinks = [
  { label: "Hero", href: "/", section: "hero" },
  { label: "Stack", href: "/#stack", section: "stack" },
  { label: "Works", href: "/#works", section: "works" },
  { label: "Blog", href: "/blog", section: null },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const activeSection = useActiveSection(
    pathname === "/" ? ["hero", "stack", "works", "contact"] : [],
  );

  const isActive = (link: { href: string; section: string | null }) => {
    if (pathname === "/blog") return link.href === "/blog";
    if (pathname.startsWith("/blog/")) return link.href === "/blog";
    if (pathname === "/" && link.section) {
      return (
        activeSection === link.section ||
        (!activeSection && link.section === "hero")
      );
    }
    return false;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fcf9f8]/90 backdrop-blur-md border-b border-outline-variant/20 transition-shadow">
      <nav className="flex justify-between items-center px-6 h-16 w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="material-symbols-outlined text-primary transition-transform duration-300 group-hover:rotate-12">
            terminal
          </span>
          <span className="text-xl font-black text-on-surface uppercase tracking-tighter group-hover:text-primary transition-colors duration-300">
            FELIXTOLEDO.TECH
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-xs uppercase tracking-widest font-bold transition-all duration-300 py-1.5 ${
                  active
                    ? "text-primary"
                    : "text-on-surface opacity-55 hover:opacity-100 hover:text-primary"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 bg-primary transition-all duration-300 origin-left ${
                    active ? "w-full scale-x-100" : "w-full scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-on-surface hover:text-primary transition-colors duration-300"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined transition-transform duration-300">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#fcf9f8]/97 backdrop-blur-md px-6 py-6 flex flex-col gap-5 border-t border-outline-variant animate-fade-slide-down">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-bold transition-colors duration-300 flex items-center gap-3 ${
                  active
                    ? "text-primary"
                    : "text-on-surface opacity-55 hover:opacity-100 hover:text-primary"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    active ? "bg-primary" : "bg-on-surface/20"
                  }`}
                />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
