import { retrieveBooksAndFormat } from "../../sources/goodreads/processGoodreadsCsv";
import { shuffleList } from "../../utils/randomizer";
import { sendEmail } from "../../utils/send";
import { generateEmail } from "./generate-email";

const main = async () => {
	console.log("retrieving books...\n");

	const { books, errors } = await retrieveBooksAndFormat();

	if (errors.length > 0) {
		console.log(errors);
	}

	console.log("getting random book...\n");

	const randomBookList = shuffleList(books);

	const randomBook = randomBookList[0];

	const randomBookFormattedTitle = randomBook["title"].split(" ").join("+");

	const alibrisSearchUrl = `https://www.alibris.com/booksearch?keyword=${randomBookFormattedTitle}`;

	console.log("sending email for book...\n");

	const emailBody = generateEmail({
		book: randomBook,
		bookUrl: alibrisSearchUrl,
	});

	await sendEmail(emailBody);
};

main();
