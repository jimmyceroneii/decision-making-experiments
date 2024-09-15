export type ReflectDocument = {
	id: string;
	subject: string;
	document_json: string;
	created_at: string;
	updated_at: string;
	edited_at: string;
	daily_at: unknown;
	backlinked_count: number;
};

export type ReflectBlock = {
	type: string;
	attrs: Record<string, unknown>;
	content: ReflectContent | ReflectContent[];
};

export interface ReflectContent {
	type: string;
	text: string;
	attrs: Record<string, unknown>;
	content?: ReflectContent[];
}

export interface ReflectBacklink extends ReflectContent {
	type: "backlink";
	attrs: {
		id: string;
		label: string;
		graphId: string;
	};
}
