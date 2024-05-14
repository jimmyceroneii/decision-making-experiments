import fs from "fs";
import ejs from "ejs";
import { ReadwiseArticle } from "../../sources/readwise-reader/types";

type GenerateEmailParams = {
  weeklyArticles: ReadwiseArticle[]
}

export const generateEmail = ({
  weeklyArticles
}: GenerateEmailParams) => {
  const templateString = fs.readFileSync('src/newsletter-template/newsletter.ejs', 'utf-8');

  return ejs.render(templateString, {
    weeklyArticles
  });
}

