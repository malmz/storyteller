import type { TransitionConfig } from 'svelte/transition';


export function typewriter(node: HTMLElement, {speed = 1}): TransitionConfig {
  const children = [...node.childNodes.values()].filter((c) => c.nodeType !== Node.COMMENT_NODE);
  const valid = children.length === 1 && children[0].nodeType === Node.TEXT_NODE;
  if (!valid) {
    throw new Error(`This transition only works on elements with a single text node child, got ${node.childNodes.length}`);
  }

  const text = node.textContent!;
  const duration = text.length / (speed * 0.01);

  return {
    duration,
    tick: (t) => {
      const i = ~~(text.length * t);
      node.textContent = text.slice(0, i);
    },
  };
}