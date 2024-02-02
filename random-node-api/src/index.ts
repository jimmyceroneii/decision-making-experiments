import express, { Request, Response } from 'express';
import * as fs from 'fs';
import { shuffleList } from './randomizer';

const app = express();
const PORT = 3000;

app.get('/product/random', (req: Request, res: Response) => {
    

const filePath: string = __dirname + '/products.txt';

try {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8');
    const lines: string[] = fileContent.split('\n');

    const randomLine = shuffleList(lines)[0];

    res.send(`<p>${randomLine}</p>`);
} catch (error) {
    console.error(`Error reading the file: ${error}`);
}
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})