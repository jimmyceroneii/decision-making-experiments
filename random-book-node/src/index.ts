import { retrieveBooksAndFormat } from '../sources/goodreads/processGoodreadsCsv';
import { shuffleList } from './randomizer';

const main = async () => {
    const { books, errors } = await retrieveBooksAndFormat();

    if (errors.length > 0) {
        console.log(errors);
    }
    
    const randomBookList = shuffleList(books);

    const randomBook = randomBookList[0];

    const randomBookFormattedTitle = randomBook['title'].split(' ').join('+');

    const alibrisSearchUrl = `https://www.alibris.com/booksearch?keyword=${randomBookFormattedTitle}`;

    console.log(alibrisSearchUrl);
}

main();