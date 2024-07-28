<script lang="ts">
	import { fly } from 'svelte/transition';
	import Action from '../components/action.svelte';
	import Terminal from '../components/terminal.svelte';
	import Client from '../components/client.svelte';

	const actions = [{ action: 'Open the door', to: '/a/inside' }];
</script>

<div class="mx-auto my-4 flex w-full max-w-[80ch] grow flex-col justify-between px-4">
	<Terminal>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae veniam error facilis dolores,
		ad possimus vitae similique magnam, maiores nobis ducimus tempora? Tenetur, molestiae voluptate?
		Ipsum aliquam hic natus minima?
	</Terminal>
	<div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
		<Client>
			{#each actions as { action, to }, i}
				<div in:fly|global={{ x: -100, delay: i * 300 + 700, duration: 500 }}>
					<Action href={to} class="w-full">{action}</Action>
				</div>
			{/each}
		</Client>
	</div>
</div>
