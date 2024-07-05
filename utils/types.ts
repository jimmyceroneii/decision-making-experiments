export interface DocumentContent {
	id: string;
	url: string;
	title: string;
	extract?: string;
	text?: string;
	author?: string | null;
}

export interface Result {
	title: string;
	url: string;
	publishedDate?: string;
	author?: string;
	score?: number;
	id: string;
}
