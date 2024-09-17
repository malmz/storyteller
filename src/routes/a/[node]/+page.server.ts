import { nodesCache } from '$lib/data';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const nodes = await nodesCache.read();
	const node = nodes.get(params.node);
	if (!node) error(404, 'Node not found');
	const searchParams = url.searchParams;
	if (node.password && searchParams.get('p') !== node.password.password) {
		return {
			key: params.node,
			type: 'password' as const,
			node: node.password
		};
	}

	return {
		key: params.node,
		type: 'text' as const,
		node: { text: node.text, actions: node.actions }
	};
};
