import { articles, type BlogArticle } from "./data";

export function getRelatedArticles(article: BlogArticle, limit = 3) {
  return articles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => article.tags.includes(tag)).length;
      const sameCategory = candidate.categorySlug === article.categorySlug ? 3 : 0;
      return { article: candidate, score: sameCategory + sharedTags };
    })
    .sort((a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title))
    .slice(0, limit)
    .map(({ article: candidate }) => candidate);
}
