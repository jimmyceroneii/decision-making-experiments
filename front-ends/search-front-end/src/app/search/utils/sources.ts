import type { MatterArticle, ReadwiseArticle } from "./types";

export const fetchLocalMatterArticles = (): MatterArticle[] => {
  try {
    const data = require('../../../../../../backend/sources/matter/backup.json');
    return data as MatterArticle[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchLocalReadwiseArticles = (): ReadwiseArticle[] => {
  try {
    const data = require('../../../../../../backend/sources/readwise-reader/backup.json')
    return data as ReadwiseArticle[];
  } catch (err) {
    console.error(err);
    return [];
  }
}
