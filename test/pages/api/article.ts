// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Article from "@/model/article.model";
import { PageWrapper } from "@/model/pageWrapper.model";
import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../data.json";

type SORT_TYPE = "NEW" | "OLD";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PageWrapper<Article>>
) {
  switch (req.method) {
    case "GET": {
      const searchKey = req.query.searchKey as string;
      const sortType = req.query.sort as SORT_TYPE;
      const groupedBySource = req.query.groupedBySource;
      const { page = 0, limit = 10 } = req.query;
      let articleData = data as Article[];
      if (searchKey && searchKey.length > 0) {
        articleData = handleSearchFilter(articleData, searchKey);
      }
      if (groupedBySource) {
        // articleData = hanldeGroupBySource(articleData);
      }
      switch (sortType.toLocaleUpperCase()) {
        case "NEW":
          articleData = newFirst(articleData);
          break;
        case "OLD":
          articleData = oldestFirst(articleData);
          break;
        default:
          break;
      }
      const paginatedResult = handlePagination(
        articleData,
        page as number,
        limit as number
      );
      res.status(200).send({
        data: paginatedResult.data,
        totalPages: paginatedResult.totalPages,
        page: page as number,
        limit: limit as number,
      });
    }
  }
}

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
  const groupedArticles: { [key: string]: Article[] } = {};
  articles.forEach((article) => {
    const sourceName = article.source.name;
    if (!groupedArticles[sourceName]) {
      groupedArticles[sourceName] = [];
    }
    groupedArticles[sourceName].push(article);
  });
  articles = Object.keys(groupedArticles).map((sourceName) => ({
    source: { name: sourceName, id: groupedArticles[sourceName][0].source.id },
    articles: groupedArticles[sourceName],
  }));

  return groupedArticles;
};
