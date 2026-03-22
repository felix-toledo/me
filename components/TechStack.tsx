const cards = [
  {
    icon: "web",
    title: "Frontend",
    description: "Next.js, React, Tailwind CSS, App Shells.",
    badge: "Interfaces",
  },
  {
    icon: "settings_ethernet",
    title: "Backend & API",
    description: "Node.js, TypeScript, Prisma, MCP Protocol.",
    badge: "Logic",
  },
  {
    icon: "database",
    title: "Database",
    description: "SQL, PostgreSQL, Supabase.",
    badge: "Persistence",
  },
  {
    icon: "terminal",
    title: "DevOps & Testing",
    description: "Vercel, Azure, Playwright (Automation).",
    badge: "Reliability",
  },
];

const ecosystem = [
  "Model Context Protocol",
  "GitHub Actions",
  "CI/CD Pipelines",
  "Social Scraper AI",
  "Docker",
];

export default function TechStack() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="stack">
      {/* Section header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
        <div>
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Core Competencies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            The Monumental Stack
          </h2>
        </div>
        <div className="h-[2px] flex-grow mx-8 bg-surface-container-highest hidden md:block" />
        <p className="text-on-surface-variant max-w-xs text-sm font-medium">
          Enterprise-grade technologies for high-performance application
          delivery.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-surface-container-low p-8 rounded-lg group hover:bg-surface-container-lowest transition-all duration-300 border-l-0 hover:border-l-4 hover:border-[#2E8B57]"
          >
            <span className="material-symbols-outlined text-secondary text-4xl mb-6 block">
              {card.icon}
            </span>
            <h3 className="text-xl font-bold mb-3">{card.title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              {card.description}
            </p>
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
              {card.badge}
            </span>
          </div>
        ))}

        {/* Extended ecosystem row */}
        <div className="md:col-span-4 bg-surface-container mt-6 p-8 rounded-lg flex flex-wrap items-center gap-4">
          <span className="text-on-surface-variant text-xs font-bold uppercase tracking-[0.2em] mr-4">
            Extended Ecosystem:
          </span>
          {ecosystem.map((item) => (
            <span
              key={item}
              className="bg-tertiary-fixed hover:bg-secondary-container transition-colors text-on-tertiary-fixed px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-md cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
