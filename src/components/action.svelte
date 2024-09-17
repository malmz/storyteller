<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	const {
		children,
		class: klass,
		href
	}: { children?: Snippet; class?: string; href?: string } = $props();
	const classes =
		'inline-flex border-l border-current bg-cyan-950 px-3 py-2 font-mono text-cyan-500 outline-none ring-current ring-offset-2 ring-offset-stone-950 hover:bg-cyan-950/90 focus-visible:ring-1';
</script>

{#if href}
	<a {href} class={cn(classes, klass)}
		>{#if children}{@render children()}{/if}</a
	>
{:else}
	<button type="submit" class={cn(classes, klass)}
		>{#if children}{@render children()}{/if}</button
	>
{/if}
