<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	const { children }: { children?: Snippet } = $props();

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

{#if visible}
	{#if children}
		{@render children()}
	{/if}
{/if}
