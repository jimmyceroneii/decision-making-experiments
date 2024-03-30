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
    bookShelves: any;
    bookShelvesWithPositions: any;
    exclusiveShelf: any;
    myReview: string;
    spoiler: any;
    privateNotes: string;
    readCount: number;
    ownedCopies: number;
}

export const bookSchema = Joi.object({
    id: Joi.string(),
    title: Joi.string(),
    author: Joi.string(),
    authorLastFirst: Joi.string(),
    additionalAuthors: Joi.string(),
    isbn: Joi.string(),
    isbn13: Joi.string(),
    myRating: Joi.number(),
    averageRating: Joi.number(),
    publisher: Joi.string(),
    binding: Joi.string(),
    pages: Joi.number(),
    publicationYear: Joi.number(),
    originalPublicationYear: Joi.number(),
    dateRead: Joi.string(),
    dateAdded: Joi.string(),
    bookShelves: Joi.any(),
    bookShelvesWithPositions: Joi.any(),
    exclusiveShelf: Joi.any(),
    myReview: Joi.string(),
    spoiler: Joi.any(),
    privateNotes: Joi.string(),
    readCount: Joi.number(),
    ownedCopies: Joi.number()
})
