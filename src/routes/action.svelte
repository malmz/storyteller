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
	class="inline-flex border-l border-current bg-cyan-950 px-3 py-2 font-mono text-cyan-500 {klass}"
	>{#if children}{@render children()}{/if}</a
>
