"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useActiveSection } from "@/hooks/useActiveSection";

const navItems = [
  { label: "Home", icon: "home_app_logo", href: "/", section: "hero" },
  { label: "Stack", icon: "layers", href: "/#stack", section: "stack" },
  { label: "Works", icon: "folder_special", href: "/#works", section: "works" },
  { label: "Blog", icon: "edit_note", href: "/blog", section: null },
  {
    label: "Contact",
    icon: "alternate_email",
    href: "/#contact",
    section: "contact",
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const activeSection = useActiveSection(
    pathname === "/" ? ["hero", "stack", "works", "contact"] : [],
  );

  const isActive = (item: { href: string; section: string | null }) => {
    if (pathname === "/blog" || pathname.startsWith("/blog/"))
      return item.href === "/blog";
    if (pathname === "/" && item.section) {
      return (
        activeSection === item.section ||
        (!activeSection && item.section === "hero")
      );
    }
    return false;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-stretch px-0 h-[64px] bg-[#fcf9f8]/95 backdrop-blur-md z-50 border-t border-outline-variant/30">
      {navItems.map((item) => {
        const active = isActive(item);
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`relative flex flex-col items-center justify-center flex-1 transition-all duration-300 ${
              active
                ? "text-[#bb0013]"
                : "text-[#1c1b1b] opacity-35 hover:opacity-80 hover:text-[#2E8B57]"
            }`}
          >
            {active && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-b-full" />
            )}
            <span
              className={`material-symbols-outlined transition-transform duration-300 ${
                active ? "scale-110" : ""
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[9px] font-black uppercase tracking-widest mt-0.5">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
