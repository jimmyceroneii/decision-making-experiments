import fs from "node:fs";
import ejs from "ejs";
import type { Book } from "../../backend/sources/goodreads/types";

export const generateEmail = ({
	book,
	bookUrl,
}: { book: Book; bookUrl: string }) => {
	const templateString = fs.readFileSync(
		"experiments/books/email-templates/email.ejs",
		"utf-8",
	);

	return ejs.render(templateString, { book, bookUrl });
};
