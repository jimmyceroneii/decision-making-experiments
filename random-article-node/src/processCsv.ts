import { Article, articleSchema } from './types';
import { ValidationError } from 'joi';
import * as fs from "fs";
import * as path from 'path';
import { parse } from 'csv-parse';

const convertCsvToTypedArray = async (filename: string): Promise<{ articles: Article[], errors: ValidationError[] }> => {
    return new Promise((resolve, reject) => {
        const articles: Article[] = [];

        const errorsArray: ValidationError[] = [];

        let isFirstRow = true;

        let i = 0;

        fs.createReadStream(filename).pipe(parse({ delimiter: ',' })).on('data', (row: any) => {
            if (isFirstRow) {
                isFirstRow = false;
                return;
            }

            const [title, author, publisher, url, tags, wordCount, inQueue, favorited, read, highlightCount, lastInteractionDate, id] = row;

            const rowObject = {
                id,
                title,
                author,
                publisher,
                url,
                tags,
                wordCount: wordCount === '' ? 0 : parseInt(wordCount),
                inQueue,
                favorited,
                read,
                highlightCount,
                lastInteractionDate
            };

            const validationResult = articleSchema.validate(rowObject);

            if (validationResult.error) {
                if (i < 10) {
                    console.log(validationResult.error.details);
                    console.log(row);
                }

                errorsArray.push(validationResult.error);

                i++;
            } else {
                articles.push(rowObject);
            }
        }).on('end', () => {
            resolve({ articles, errors: errorsArray });
        }).on('error', (err) => {
            reject(err)
        })
    });
}

export const retrieveArticlesAndFomat = async () => {
    const absolutePath = path.resolve(__dirname, '../..');

    const filePath = path.join(absolutePath, '_matter_history.csv');

    return await convertCsvToTypedArray(filePath);
}