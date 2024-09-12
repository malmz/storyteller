import nodeData from './nodes.json';
import linksData from './links.json';

const links = new Map(linksData.map((link) => [link.LinkId, { text: link.Text, to: link.Node }]));

export const nodes = new Map(
	nodeData.map((node) => [
		node.NodeId,
		{
			text: node.Text,
			actions: node.Links.map((link) => links.get(link)!)
		}
	])
);
