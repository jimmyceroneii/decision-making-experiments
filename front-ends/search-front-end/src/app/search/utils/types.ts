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

export type Article = MatterArticle | ReadwiseArticle;

export type NarrowedArticle = {
  url: string;
  title: string;
};

export type SimpleSearchParams<T> = {
  searchTerm: string;
  list: Article[];
};

export const CATEGORIES = {
	email: "email",
	article: "article",
	video: "video",
	highlight: "highlight",
	note: "note",
	pdf: "pdf",
	rss: "rss",
	epub: "epub",
} as const;

export type Category = keyof typeof CATEGORIES;

export type Tag = {
	name: string;
	type: string;
	created: number;
};

// biome-ignore lint: type magic from weird readwise type
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
	summary: string | null;
	image_url: string;
	content: string | null;
	source_url: string;
	notes: string;
	parent_id: string | null;
	reading_progress: number;
};
