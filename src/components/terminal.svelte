<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	const { children, class: klass }: { children: Snippet; class?: string } = $props();
</script>

<p class="border-l border-amber-500 bg-amber-950 p-4 font-mono">
	<span class="reveal">{@render children()}</span>
</p>

<style>
	.reveal {
		color: #0000;
		--amber-color: #f59e0b;
		background:
			linear-gradient(var(--amber-color) 0 0) no-repeat,
			linear-gradient(var(--amber-color) 0 0) no-repeat;
		background-size: 0% 100%;
		background-clip: padding-box, text;
		animation:
			t 0.5s 0.5s both,
			b 0.5s 0.7s both;
	}

	@keyframes t {
		to {
			background-size: 150% 100%;
		}
	}

	@keyframes b {
		to {
			background-position:
				-201% 0,
				0 0;
		}
	}
</style>
