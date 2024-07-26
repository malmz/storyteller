import { nodes } from '$lib/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({params}) => {
  const node = nodes.get(params.node);
  if (!node) error(404, "Node not found");
  return {key: params.node, node};
};