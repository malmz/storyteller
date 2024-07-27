<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		children,
		class: klass,
		href
	}: { children?: Snippet; class?: string; href: string } = $props();
</script>

<a
	{href}
	class="inline-flex border-l border-current bg-cyan-950 px-3 py-2 font-mono text-cyan-500 outline-none ring-current ring-offset-2 ring-offset-stone-950 hover:bg-cyan-950/90 focus-visible:ring-1 {klass}"
	>{#if children}{@render children()}{/if}</a
>
