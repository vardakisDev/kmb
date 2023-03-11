// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Article from "@/model/article.model";
import { PageWrapper } from "@/model/pageWrapper.model";
import { articleRepo } from "@/repository/article.repository";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PageWrapper<Article>>
) {
  switch (req.method) {
    case "GET": {
      const searchKey = req.query.searchKey as string;
      const sortType = req.query.sort as string;
      const { page = 0, limit = 6 } = req.query;
      const filteredArticles = articleRepo.getArticleWithFilter(
        page as number,
        limit as number,
        sortType,
        searchKey
      );
      res.status(200).send(filteredArticles);
    }
  }
}
