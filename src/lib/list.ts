import type { Readable } from "svelte/store";

export const ListKey = Symbol();

export type ListContext<T> = {
    setValue: (value: T) => void;
    value: Readable<T>;
};
