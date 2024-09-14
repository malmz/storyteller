import { nodesCache } from '$lib/data';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const nodes = await nodesCache.read();
	const node = nodes.get(params.node);
	if (!node) error(404, 'Node not found');
	return { key: params.node, node };
};
