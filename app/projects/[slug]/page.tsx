import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { getProjectContent } from "@/lib/projects";
import projectsData from "@/data/projects.json";
import me from "@/data/me.json";

type Props = {
  params: Promise<{ slug: string }>;
};

type Project = {
  id: number;
  slug: string;
  number: string;
  title: string;
  client: string;
  description: string;
  coverImage: string | null;
  placeholderIcon: string | null;
  gallery: string[];
  appUrl: string | null;
  repoUrl: string | null;
  markdownFile: string | null;
  tags: string[];
};

export async function generateStaticParams() {
  return (projectsData as Project[]).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = (projectsData as Project[]).find((p) => p.slug === slug);
  if (!project) return {};
  const ogImage = project.coverImage ?? "/felix.png";
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `${me.siteUrl}/projects/${slug}` },
    openGraph: {
      type: "website",
      url: `${me.siteUrl}/projects/${slug}`,
      title: `${project.title} | ${me.personal.name}`,
      description: project.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${me.personal.name}`,
      description: project.description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = (projectsData as Project[]).find((p) => p.slug === slug);

  if (!project) notFound();

  const content = project.markdownFile
    ? await getProjectContent(project.markdownFile)
    : null;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${me.siteUrl}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: me.personal.name,
      url: me.siteUrl,
    },
    keywords: project.tags.join(", "),
    ...(project.coverImage && { image: `${me.siteUrl}${project.coverImage}` }),
    ...(project.appUrl && { sameAs: project.appUrl }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <Header />
      <main className="pt-16 pb-24 md:pb-0 min-h-screen">
        <article className="px-6 max-w-4xl mx-auto py-24">
          {/* Back link */}
          <Link
            href="/#works"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-16"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            All Projects
          </Link>

          {/* Header */}
          <div className="mb-16">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-6xl font-black text-outline-variant opacity-20 leading-none">
                {project.number}
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-primary">
                {project.client}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.92] mb-6">
              {project.title}
            </h1>
            <p className="text-on-surface-variant text-xl leading-relaxed border-l-4 border-secondary pl-6 mb-8">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-surface-container-high text-on-surface-variant px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* External links */}
            {(project.appUrl || project.repoUrl) && (
              <div className="flex flex-wrap gap-4">
                {project.appUrl && (
                  <a
                    href={project.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      open_in_new
                    </span>
                    Live App
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-outline-variant text-on-surface px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      code
                    </span>
                    Repository
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Cover image */}
          {project.coverImage && (
            <div className="w-full aspect-video bg-surface-container rounded-xl overflow-hidden mb-16 relative">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Placeholder if no image */}
          {!project.coverImage && project.placeholderIcon && (
            <div className="w-full aspect-video bg-surface-container-high rounded-xl overflow-hidden mb-16 flex items-center justify-center">
              <span className="material-symbols-outlined text-8xl text-outline-variant">
                {project.placeholderIcon}
              </span>
            </div>
          )}

          {/* Markdown content */}
          {content && (
            <div
              className="blog-content mb-16"
              dangerouslySetInnerHTML={{ __html: content.contentHtml }}
            />
          )}

          {/* Gallery */}
          {project.gallery.length > 1 && (
            <div className="mt-16">
              <h2 className="text-2xl font-black tracking-tight mb-8 uppercase">
                Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gallery.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-video bg-surface-container rounded-xl overflow-hidden relative"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} screenshot ${i + 2}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 448px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next project navigation */}
          <div className="mt-24 pt-12 border-t border-outline-variant">
            <NextProjectLink currentId={project.id} />
          </div>
        </article>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

function NextProjectLink({ currentId }: { currentId: number }) {
  const projects = projectsData as Project[];
  const nextProject =
    projects.find((p) => p.id === currentId + 1) ?? projects[0];

  return (
    <Link
      href={`/projects/${nextProject.slug}`}
      className="group flex items-center justify-between hover:text-primary transition-colors"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-1">
          Next Project
        </p>
        <p className="text-2xl font-black tracking-tight">
          {nextProject.title}
        </p>
      </div>
      <span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-primary group-hover:translate-x-2 transition-all duration-300">
        arrow_forward
      </span>
    </Link>
  );
}
