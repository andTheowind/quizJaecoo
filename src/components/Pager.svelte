<script lang="ts">
	import { PagerKey, type PagerContext } from '@lib/pager';
	import { setContext } from 'svelte';
	import { derived, writable, type Writable } from 'svelte/store';

	let totalPages: Writable<number> = writable(0);
	let currentPage: Writable<number> = writable(0);

	const canGoNextPage = derived([totalPages, currentPage], ([$totalPages, $currentPage]) => {
		return $currentPage < $totalPages - 1;
	});

	const canGoPreviousPage = derived([totalPages, currentPage], ([$totalPages, $currentPage]) => {
		return $currentPage > 0 && $currentPage < $totalPages;
	});

	export const goPrevious = (): boolean => {
		if (!$canGoPreviousPage) return false;
		$currentPage--;
		return true;
	};

	export const goNext = (): boolean => {
		if (!canGoNextPage) return false;
		$currentPage++;
		return true;
	};

	const addPage = () => {
		$totalPages++;
		return $totalPages - 1;
	};

	setContext(PagerKey, {
		currentPage: currentPage,
		totalPages: totalPages,
		canGoNext: canGoNextPage,
		canGoPrevious: canGoPreviousPage,

		addPage: addPage,
		goNext: goNext,
		goPrevious: goPrevious
	} as PagerContext);


    export let canGoNext: boolean;
    $: canGoNext = $canGoNextPage;

    export let canGoPrevious: boolean;
    $: canGoPrevious = $canGoPreviousPage;

	export let pageIndex: number = $currentPage;
	$: pageIndex = $currentPage;
</script>

<slot {canGoNext} {canGoPrevious} {goNext} {goPrevious} />
