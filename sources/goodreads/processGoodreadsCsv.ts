import * as fs from "node:fs";
import * as path from "node:path";
import { parse } from "csv-parse";
import type { ValidationError } from "joi";
import { type Book, bookSchema } from "./types";

const convertCsvToTypedArray = async (
	filename: string,
): Promise<{ books: Book[]; errors: ValidationError[] }> => {
	return new Promise((resolve, reject) => {
		const books: Book[] = [];

		const errorsArray: ValidationError[] = [];

		let isFirstRow = true;

		let i = 0;

		fs.createReadStream(filename)
			.pipe(parse({ delimiter: "," }))
			.on("data", (row: any) => {
				if (isFirstRow) {
					isFirstRow = false;
					return;
				}

				const [
					id,
					title,
					author,
					authorLastFirst,
					additionalAuthors,
					isbn,
					isbn13,
					myRating,
					averageRating,
					publisher,
					binding,
					pages,
					publicationYear,
					originalPublicationYear,
					dateRead,
					dateAdded,
					bookShelves,
					bookShelvesWithPositions,
					exclusiveShelf,
					myReview,
					spoiler,
					privateNotes,
					readCount,
					ownedCopies,
				] = row;

				const rowObject = {
					id,
					title,
					author,
					authorLastFirst,
					additionalAuthors,
					isbn,
					isbn13,
					myRating,
					averageRating,
					publisher,
					binding,
					pages,
					publicationYear,
					originalPublicationYear,
					dateRead,
					dateAdded,
					bookShelves,
					bookShelvesWithPositions,
					exclusiveShelf,
					myReview,
					spoiler,
					privateNotes,
					readCount,
					ownedCopies,
				};

				const validationResult = bookSchema.validate(rowObject);

				if (validationResult.error) {
					if (i < 10) {
						console.log(validationResult.error.details);
						console.log(row);
					}

					errorsArray.push(validationResult.error);

					i++;
				} else {
					books.push(rowObject);
				}
			})
			.on("end", () => {
				resolve({ books, errors: errorsArray });
			})
			.on("error", (err) => {
				reject(err);
			});
	});
};

export const retrieveBooksAndFormat = async () => {
	const absolutePath = path.resolve(__dirname, ".");

	const filePath = path.join(absolutePath, "goodreads_library_export.csv");

	return await convertCsvToTypedArray(filePath);
};
