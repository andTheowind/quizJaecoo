export const PagerKey = Symbol();

export type PagerContext = {
	currentPage: Writable<number>;
	totalPages: Writable<number>;
	canGoNext: Readable<boolean>;
	canGoPrevious: Readable<boolean>;

	addPage: () => number;
	goNext: () => boolean;
	goPrevious: () => boolean;
};
