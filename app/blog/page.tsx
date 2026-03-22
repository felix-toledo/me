import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { getAllPosts } from "@/lib/blog";
import me from "@/data/me.json";

export const metadata: Metadata = {
  title: `Blog | ${me.personal.name}`,
  description: `Technical thoughts, architecture deep dives, and project updates by ${me.personal.name}.`,
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="pt-16 pb-24 md:pb-0 min-h-screen">
        <section className="relative px-6 max-w-7xl mx-auto py-24 overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-10 right-0 w-1/2 h-full opacity-5 pointer-events-none select-none overflow-hidden">
            <span
              className="material-symbols-outlined text-[40rem]"
              style={{ fontVariationSettings: '"wght" 100' }}
            >
              edit_note
            </span>
          </div>

          <div className="z-10 relative">
            <div className="mb-16">
              <p className="text-xs font-bold tracking-widest uppercase text-primary mb-4">
                {me.personal.name} · {me.personal.location}
              </p>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
                BLOG
              </h1>
              <p className="text-on-surface-variant text-xl leading-relaxed border-l-4 border-secondary pl-6 max-w-2xl">
                Technical thoughts, architecture deep dives, and project
                updates.
              </p>
            </div>

            {posts.length === 0 ? (
              <p className="text-on-surface-variant text-lg">
                No posts yet. Check back soon.
              </p>
            ) : (
              <div className="grid gap-6">
                {posts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block bg-surface-container-low border border-outline-variant hover:border-primary hover:bg-surface-container transition-all duration-300 p-8 rounded-xl"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-xs font-black tracking-widest uppercase text-primary border border-primary px-2 py-0.5">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <time className="text-xs font-bold tracking-widest uppercase text-on-surface-variant">
                            {post.date}
                          </time>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3 group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </h2>
                        <p className="text-on-surface-variant leading-relaxed line-clamp-2">
                          {post.description}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors mt-1 flex-shrink-0 group-hover:translate-x-1 duration-300">
                        arrow_forward
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
