<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Client from '../../client.svelte';
	import Terminal from '../../terminal.svelte';
	import Action from '../../action.svelte';

	const { data } = $props();
</script>

{#key data.key}
	<div
		class="page-container mx-auto my-4 flex w-full max-w-[80ch] grow flex-col justify-between px-4"
	>
		<div in:fade={{ delay: 300 }} out:fly={{ y: -100, duration: 300 }}>
			<Terminal>
				{data.node.text}
			</Terminal>
		</div>
		<div
			in:fade={{ delay: 300 }}
			out:fly={{ y: 100, duration: 300 }}
			class="grid gap-3 sm:grid-cols-2 md:grid-cols-3"
		>
			<Client>
				{#each data.node.actions as { text, to }, i}
					<div in:fly|global={{ x: -100, delay: i * 300 + 700, duration: 500 }}>
						<Action href={to} class="w-full">{text}</Action>
					</div>
				{/each}
			</Client>
		</div>
	</div>
{/key}

<style>
	.page-container:nth-child(2) {
		display: none;
	}
</style>
