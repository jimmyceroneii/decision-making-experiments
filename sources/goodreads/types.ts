import * as Joi from "joi";

export type Book = {
	id: string;
	title: string;
	author: string;
	authorLastFirst: string;
	additionalAuthors: string;
	isbn: string;
	isbn13: string;
	myRating: number;
	averageRating: number;
	publisher: string;
	binding: string;
	pages: number;
	publicationYear: number;
	originalPublicationYear: number;
	dateRead: string;
	dateAdded: string;
	bookShelves: string;
	bookShelvesWithPositions: string;
	exclusiveShelf: string;
	myReview: string;
	spoiler: string;
	privateNotes: string;
	readCount: number;
	ownedCopies: number;
};

export const bookSchema = Joi.object({
	id: Joi.string(),
	title: Joi.string(),
	author: Joi.string(),
	authorLastFirst: Joi.string(),
	additionalAuthors: Joi.string().allow(""),
	isbn: Joi.string(),
	isbn13: Joi.string(),
	myRating: Joi.number(),
	averageRating: Joi.number(),
	publisher: Joi.string().allow(""),
	binding: Joi.string().allow(""),
	pages: Joi.number().allow(""),
	publicationYear: Joi.number().allow(""),
	originalPublicationYear: Joi.number().allow(""),
	dateRead: Joi.string().allow(""),
	dateAdded: Joi.string(),
	bookShelves: Joi.any(),
	bookShelvesWithPositions: Joi.any(),
	exclusiveShelf: Joi.any(),
	myReview: Joi.string().allow(""),
	spoiler: Joi.string().allow(""),
	privateNotes: Joi.string().allow(""),
	readCount: Joi.number(),
	ownedCopies: Joi.number(),
});
