import type { PostMeta, Projects, StrapiPost, StrapiProject } from "./types";

// In types.ts or utils/transformers.ts
export function transformStrapiPost(strapiPost: StrapiPost): PostMeta {
  return {
    id: strapiPost.id,
    slug: strapiPost.slug,
    excerpt: strapiPost.excerpt,
    title: strapiPost.title,
    date: strapiPost.date,
    body: strapiPost.body,
    image: strapiPost.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${strapiPost.image.url}`
      : "/images/no-image.png",
  };
}

export function transformStrapiProject(strapiProject: StrapiProject): Projects {
  return {
    id: strapiProject.id,
    documentId: strapiProject.documentId,
    title: strapiProject.title,
    description: strapiProject.description,
    image: strapiProject.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${strapiProject.image.url}`
      : "/images/no-image.png",
    url: strapiProject.url,
    date: strapiProject.date,
    category: strapiProject.category,
    featured: strapiProject.featured,
    // ... other fields
  };
}
