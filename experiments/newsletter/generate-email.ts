import fs from "fs";
import ejs from "ejs";
import { ReadwiseArticle } from "../../sources/readwise-reader/types";

type GenerateEmailParams = {
  weeklyArticles: ReadwiseArticle[]
}

export const generateEmail = ({
  weeklyArticles
}: GenerateEmailParams) => {
  const templateString = fs.readFileSync('experiments/newsletter/newsletter-template/newsletter-md.ejs', 'utf-8');

  return ejs.render(templateString, {
    weeklyArticles
  });
}

