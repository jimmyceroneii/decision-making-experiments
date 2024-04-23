import * as Joi from "joi";

export const readwiseArticleSchema = Joi.object({
    id: Joi.string().required(),
    url: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    source: Joi.string().required(),
    category: Joi.string().required(),
    location: Joi.string().required(),
    tags: Joi.any().optional(),
    site_name: Joi.string().required(),
    word_count: Joi.number().required(),
    created_at: Joi.string().required(),
    updated_at: Joi.string().required(),
    published_date: Joi.number().required(),
    summary: Joi.string().optional(),
    image_url: Joi.string().required(),
    content: Joi.string().optional(),
    source_url: Joi.string().required(),
    notes: Joi.string().required(),
    parent_id: Joi.string().optional(),
    reading_progress: Joi.number().required(),
})

export const CATEGORIES = {
    email: "email",
    article: "article",
    video: "video",
    highlight: "highlight",
    note: "note",
    pdf: "pdf",
    rss: "rss",
    epub: "epub"
} as const;

export type Category = keyof typeof CATEGORIES;

export type Tag = {
    name: string;
    type: string;
    created: number;
}

export type Tags = Record<string, Tag> | {};

export type ReadwiseArticle = {
    id: string;
    url: string;
    title: string;
    author: string;
    source: string;
    category: Category;
    location: string;
    tags: Tags | null;
    site_name: string;
    word_count: number;
    created_at: string;
    updated_at: string;
    published_date: number;
    summary: any;
    image_url: string;
    content: any;
    source_url: string;
    notes: string;
    parent_id: any;
    reading_progress: number;
}