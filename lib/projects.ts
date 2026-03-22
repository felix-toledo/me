import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const projectsDirectory = path.join(process.cwd(), "data", "projects");

export type ProjectContent = {
  slug: string;
  title: string;
  date: string;
  role: string;
  description: string;
  contentHtml: string;
};

export async function getProjectContent(
  slug: string,
): Promise<ProjectContent | null> {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    role: (data.role as string) ?? "",
    description: (data.description as string) ?? "",
    contentHtml,
  };
}
