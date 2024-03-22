import { Article, articleSchema } from './types';
import { ValidationError } from 'joi';
import * as fs from "fs";
import * as path from 'path';
import { parse } from 'csv-parse';

const convertCsvToTypedArray = async (filename: string): Promise<{ articles: Article[], errors: ValidationError[] }> => {
    return new Promise((resolve, reject) => {
        const articles: Article[] = [];

        const errorsArray: ValidationError[] = [];

        fs.createReadStream(filename).pipe(parse({ delimiter: ',' })).on('data', (row: any) => {
            const [title, author, publisher, url, tags, wordCount, inQueue, favorited, read, highlightCount, lastInteractionDate, id] = row;

            const rowObject = {
                id,
                title,
                author,
                publisher,
                url,
                tags,
                wordCount,
                inQueue,
                favorited,
                read,
                highlightCount,
                lastInteractionDate
            };

            const validationResult = articleSchema.validate(rowObject);

            if (validationResult.error) {
                errorsArray.push(validationResult.error);
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

const main = async () => {
    const absolutePath = path.resolve(__dirname, '../..');

    const filePath = path.join(absolutePath, '_matter_history.csv');

    const results = await convertCsvToTypedArray(filePath);

    console.log('articles: ', results.articles.length);
    console.log('errors: ', results.errors.length)
}

main();