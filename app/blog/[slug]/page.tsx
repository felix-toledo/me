import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import BlogCodeCopy from "@/components/BlogCodeCopy";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import me from "@/data/me.json";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${me.siteUrl}/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `${me.siteUrl}/blog/${slug}`,
      title: `${post.title} | ${me.personal.name}`,
      description: post.description,
      publishedTime: post.date,
      authors: [me.personal.name],
      images: [
        { url: "/felix.png", width: 400, height: 400, alt: me.personal.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${me.personal.name}`,
      description: post.description,
      images: ["/felix.png"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="pt-16 pb-24 md:pb-0 min-h-screen">
        <article className="px-6 max-w-3xl mx-auto py-24">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-16"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Back to Blog
          </Link>

          {/* Meta */}
          <time className="block text-xs font-black tracking-widest uppercase text-primary mb-4">
            {post.date}
          </time>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] mb-6">
            {post.title}
          </h1>
          <p className="text-on-surface-variant text-xl leading-relaxed border-l-4 border-secondary pl-6 mb-12">
            {post.description}
          </p>

          {/* Author strip */}
          <div className="flex items-center gap-4 mb-16 pb-12 border-b border-outline-variant">
            <div className="flex-shrink-0">
              <Image
                src="/felix.png"
                alt={me.personal.name}
                width={40}
                height={40}
                className="drop-shadow-sm"
              />
            </div>
            <div>
              <p className="font-black text-sm">{me.personal.name}</p>
              <p className="text-xs text-on-surface-variant">
                {me.personal.role}
              </p>
            </div>
          </div>

          {/* Rendered markdown */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
          <BlogCodeCopy />

          {/* Author card at bottom */}
          <div className="mt-20 pt-12 border-t border-outline-variant">
            <div className="bg-surface-container-low border border-outline-variant p-8 rounded-xl">
              <p className="text-xs font-black tracking-widest uppercase text-primary mb-6">
                Written by
              </p>
              <p className="font-black text-2xl tracking-tight mb-1">
                {me.personal.name}
              </p>
              <p className="text-on-surface-variant text-sm mb-4">
                {me.personal.role} &middot; {me.personal.location}
              </p>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                {me.story.present}
              </p>
              <div className="flex gap-6">
                <a
                  href={me.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold tracking-widest uppercase hover:text-secondary transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={me.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${me.contact.email}`}
                  className="text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
