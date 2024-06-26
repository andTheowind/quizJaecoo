<script lang="ts">
	import { PagerKey, type PagerContext } from '@lib/pager';
	import { getContext } from 'svelte';

	const { addPage, currentPage }: PagerContext = getContext(PagerKey);

	let pageIndex: number = addPage();

	let selected: boolean;
	$: selected = pageIndex === $currentPage;
</script>

<slot pageSelected={selected} />
