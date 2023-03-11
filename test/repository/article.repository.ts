import Article from "@/model/article.model";
import { PageWrapper } from "@/model/pageWrapper.model";
import { flatMap, groupBy } from "lodash";
import data from "../data.json";

export const articleRepo = {
  getAll: () => getAll(),
  getArticleWithFilter: (
    page: number,
    limit: number,
    sortType: string,
    searchKey: string
  ) => getArticleWithFilter(page, limit, sortType, searchKey),
};

const getArticleWithFilter = (
  page: number,
  limit: number,
  sortType: string,
  searchKey: string
): PageWrapper<Article> => {
  let articleData = data as Article[];
  if (searchKey && searchKey.length > 0) {
    articleData = handleSearchFilter(articleData, searchKey);
  }
  switch (sortType?.toUpperCase() ?? "") {
    case "NEW":
      articleData = newFirst(articleData);
      break;
    case "OLD":
      articleData = oldestFirst(articleData);
      break;
    case "GROUP":
      const grouped = hanldeGroupBySource(articleData);
      articleData = flatMap(grouped);
      break;
    default:
      articleData = newFirst(articleData);
      break;
  }
  const paginatedResult = handlePagination(
    articleData,
    page as number,
    limit as number
  );
  return {
    data: paginatedResult.data,
    totalPages: paginatedResult.totalPages,
    page: page as number,
    limit: limit as number,
  };
};

const getAll = () => {
  return data;
};

const oldestFirst = (articles: Article[]) =>
  [...articles].sort(
    (a, b) => Date.parse(a.publishedAt) - Date.parse(b.publishedAt)
  );

const newFirst = (articles: Article[]) =>
  [...articles].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
  );

const handlePagination = (
  articles: Article[],
  page: number,
  limit: number
): { data: Article[]; totalPages: number } => {
  // Calculate the start and end indices for the current page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Get the articles for the current page
  const articlesForPage = articles.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(articles.length / limit);
  return {
    data: articlesForPage,
    totalPages: totalPages,
  };
};

const handleSearchFilter = (articles: Article[], title: string) => {
  // Filter the articles by title
  return articles.filter((article) =>
    article.title.toLowerCase().includes(title.toLowerCase())
  );
};

const hanldeGroupBySource = (articles: Article[]) => {
  return groupBy(articles, (a) => a.source.id);
};
