import { Article, articleSchema } from './types';
import * as fs from "fs";
import * as path from 'path';
import { parse } from 'csv-parse';

const convertCsvToTypedArray = async (filename: string): Promise<Article[]> => {
    return new Promise((resolve, reject) => {
        const articles: Article[] = [];

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
            }

            const validationResult = articleSchema.validate(rowObject);

            if (validationResult.error) {
                console.log('Validation Error: ', validationResult.error);
            } else {
                articles.push(rowObject);
            }
        })
    });
}

const main = async () => {
    const absolutePath = path.resolve(__dirname, '../..');

    const filePath = path.join(absolutePath, '_matter_history.csv');  

    await convertCsvToTypedArray(filePath);
}

main();