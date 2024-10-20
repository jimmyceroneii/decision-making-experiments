import * as Joi from "joi";

export const matterArticleSchema = Joi.object({
	id: Joi.string().required(),
	title: Joi.string().required(),
	author: Joi.string().allow("", null).required(),
	publisher: Joi.string().allow("", null).required(),
	url: Joi.string().required().allow(""),
	tags: Joi.any().required(),
	wordCount: Joi.number().required(),
	inQueue: Joi.boolean().required(),
	favorited: Joi.boolean().required(),
	read: Joi.boolean().required(),
	highlightCount: Joi.number().required(),
	lastInteractionDate: Joi.string().required(),
});

export type MatterArticle = {
	id: string;
	title: string;
	author: string | null;
	publisher: string | null;
	url: string;
	tags: string;
	wordCount: number;
	inQueue: boolean;
	favorited: boolean;
	read: boolean;
	highlightCount: number;
	lastInteractionDate: string;
};
