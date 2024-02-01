import express, { Request, Response } from 'express';
import { shuffleList } from "./randomizer";

const app = express();
const PORT = 3000;

const list = [1, 2, 3, 4];

app.get('/randomList', (req: Request, res: Response) => {
    const shuffledList = shuffleList<number>(list);

    res.send(JSON.stringify(shuffledList));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})