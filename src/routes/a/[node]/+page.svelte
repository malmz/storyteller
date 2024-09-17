<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Terminal from '../../../components/terminal.svelte';
	import Action from '../../../components/action.svelte';
	import { LockKeyhole } from 'lucide-svelte';

	const { data } = $props();
</script>

{#key data.key}
	{#if data.type === 'text'}
		<div
			class="page-container mx-auto my-4 flex w-full max-w-[80ch] grow flex-col justify-between overflow-hidden px-4 pb-16"
		>
			<div in:fade={{ delay: 300 }} out:fly={{ y: -100, duration: 300 }}>
				<Terminal>
					{@html data.node.text}
				</Terminal>
			</div>
			<div
				in:fade={{ delay: 300 }}
				out:fly|global={{ y: 100, duration: 300 }}
				class="grid gap-3 sm:grid-cols-2 md:grid-cols-3"
			>
				{#each data.node.actions as { text, to }, i}
					<div in:fly|global={{ x: -100, delay: i * 300 + 700, duration: 500 }}>
						<Action href={to} class="w-full">{text}</Action>
					</div>
				{/each}
			</div>
		</div>
	{:else if data.type === 'password'}
		<div
			class="page-container mx-auto my-4 flex w-full max-w-[80ch] grow flex-col justify-between px-4"
		>
			<div in:fade={{ delay: 300 }} out:fly={{ y: -100, duration: 300 }}>
				<Terminal>
					{@html data.node.text}
				</Terminal>
			</div>
			<LockKeyhole class="mx-auto my-8 h-48 w-48 text-amber-900"></LockKeyhole>
			<div>
				<form
					method="get"
					in:fade={{ delay: 300 }}
					out:fly|global={{ y: 100, duration: 300 }}
					class="grid grid-cols-1 gap-3"
				>
					<div in:fly|global={{ x: -100, delay: 0 * 300 + 700, duration: 500 }}>
						{#if data.error}
							<p in:fade={{ duration: 100 }} class="mb-2 font-mono text-red-500">
								{data.error}
							</p>
						{/if}
						<div
							class="flex gap-4 border-l border-amber-500 bg-amber-950 p-4 font-mono text-amber-500"
						>
							&gt;
							<input
								type="password"
								name="p"
								placeholder="password..."
								class="w-full border-amber-500 bg-transparent underline-offset-4 outline-none placeholder:text-amber-700 focus:underline"
								required
							/>
						</div>
					</div>
					<div in:fly|global={{ x: -100, delay: 1 * 300 + 700, duration: 500 }}>
						<Action class="w-full">Enter</Action>
					</div>
				</form>
			</div>
		</div>
	{/if}
{/key}

<style>
	.page-container:nth-child(2) {
		display: none;
	}
</style>
