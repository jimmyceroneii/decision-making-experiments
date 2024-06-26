import { MatterArticle, matterArticleSchema } from './types';
import { ValidationError } from 'joi';
import * as fs from "fs";
import * as path from 'path';
import { parse } from 'csv-parse';

export const convertToBoolean = (field: string): boolean => {
    return field.toLowerCase() === 'true' ? true : false;
}

export const convertToId = (id: string | undefined): string => {
    if (!id) {
        return '';
    }

    return id.split('_')[1].split('.')[0];
}

const convertCsvToTypedArray = async (filename: string): Promise<{ articles: MatterArticle[], errors: ValidationError[] }> => {
    return new Promise((resolve, reject) => {
        const articles: MatterArticle[] = [];

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
                id: convertToId(id),
                title,
                author,
                publisher,
                url,
                tags,
                wordCount: wordCount === '' ? 0 : parseInt(wordCount),
                inQueue: convertToBoolean(inQueue),
                favorited: convertToBoolean(favorited),
                read: convertToBoolean(read),
                highlightCount,
                lastInteractionDate
            };

            const validationResult = matterArticleSchema.validate(rowObject);

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

export const retrieveArticlesAndFormat = async () => {
    const absolutePath = path.resolve(__dirname, '.');

    const filePath = path.join(absolutePath, '_matter_history.csv');

    return await convertCsvToTypedArray(filePath);
}