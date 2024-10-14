import { MatterArticle } from "./types";

export const fetchLocalMatterArticles = (): MatterArticle[] | undefined => {
  try {
    const data = require("../../../../../sources/matter/backup.json");
    return data as MatterArticle[];
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
