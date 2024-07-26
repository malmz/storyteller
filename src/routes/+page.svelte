<script lang="ts">
	import { fade } from 'svelte/transition';
	import Action from './action.svelte';
	import Terminal from './terminal.svelte';
	import Client from './client.svelte';

	const actions = [{ action: 'Open the door', to: 'inside' }];
</script>

<div class="mx-auto max-w-[80ch] px-2">
	<Terminal>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae veniam error facilis dolores,
		ad possimus vitae similique magnam, maiores nobis ducimus tempora? Tenetur, molestiae voluptate?
		Ipsum aliquam hic natus minima?
	</Terminal>
	<div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
		<Client>
			{#each actions as { action, to }, i}
				<div in:fade|global={{ delay: i * 300 + 1200, duration: 500 }}>
					<Action href={to} class="w-full">{action}</Action>
				</div>
			{/each}
		</Client>
	</div>
</div>
