// toc.ts
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";

export type TocItem = { depth: number; text: string; id: string };

export function getToc(markdown: string): TocItem[] {
  const tree = unified().use(remarkParse).parse(markdown);
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];

  visit(tree, "heading", (node: any) => {
    const depth = node.depth as number; // 1..6
    if (depth > 5) return;
    const text = (node.children || [])
      .filter(
        (c: any) =>
          c.type === "text" ||
          c.type === "inlineCode" ||
          c.type === "emphasis" ||
          c.type === "strong"
      )
      .map(
        (c: any) =>
          c.value ?? (c.children?.map((cc: any) => cc.value).join("") || "")
      )
      .join("")
      .trim();
    if (!text) return;
    const id = slugger.slug(text); // matches rehype-slug
    toc.push({ depth, text, id });
  });

  return toc;
}
