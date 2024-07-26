import nodeData from './nodes.json';
interface NodeData {
  text: string;
  actions: {
    text: string;
    to: string;
  }[]
}

export const nodes = new Map<string, NodeData>(Object.entries(nodeData))