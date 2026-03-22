"use client";

import { useState } from "react";

const navItems = [
  { label: "Hero", icon: "home_app_logo", href: "#" },
  { label: "Stack", icon: "layers", href: "#stack" },
  { label: "Works", icon: "folder_special", href: "#works" },
  { label: "Contact", icon: "alternate_email", href: "#contact" },
];

export default function BottomNav() {
  const [active, setActive] = useState("Hero");

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 h-20 bg-[#fcf9f8] z-50 shadow-[0_-4px_40px_rgba(187,0,19,0.04)]">
      {navItems.map((item) => {
        const isActive = active === item.label;
        return (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setActive(item.label)}
            className={`flex flex-col items-center justify-center transition-all ${
              isActive
                ? "text-[#bb0013] border-t-4 border-[#bb0013] pt-1 active:-translate-y-0.5"
                : "text-[#1c1b1b] opacity-40 pt-3 hover:opacity-100 hover:text-[#2E8B57]"
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest mt-1">
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
