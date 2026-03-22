import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const blogsDirectory = path.join(process.cwd(), "data", "blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};

export function getAllPosts(): BlogPostMeta[] {
  const fileNames = fs.readdirSync(blogsDirectory);

  return fileNames
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? "",
        description: (data.description as string) ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(blogsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    description: (data.description as string) ?? "",
    contentHtml,
  };
}
