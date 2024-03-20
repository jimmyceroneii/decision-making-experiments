import * as Joi from "joi";

export const articleSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().allow(undefined),
    publisher: Joi.string().allow(undefined),
    url: Joi.string().required(),
    tags: Joi.any(),
    wordCount: Joi.number().required(),
    inQueue: Joi.boolean().required(),
    favorited: Joi.boolean().required(),
    read: Joi.boolean().required(),
    highlightCount: Joi.number().required(),
    lastInteractionDate: Joi.string().required()
})

export type Article = {
    id: string;
    title: string;
    author: string;
    publisher: string;
    url: string;
    tags: any;
    wordCount: number;
    inQueue: boolean;
    favorited: boolean;
    read: boolean;
    highlightCount: number;
    lastInteractionDate: any;
}   