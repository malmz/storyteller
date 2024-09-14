import fs from 'node:fs/promises';
import { z } from 'zod';

const linksSchema = z.array(
	z.object({
		LinkId: z.string(),
		Text: z.string(),
		Node: z.string()
	})
);

const nodesSchema = z.array(
	z.object({
		NodeId: z.string(),
		Text: z.string(),
		Links: z.array(z.string())
	})
);

class FileCache<T> {
	#path: string;
	#cb: (data: unknown) => Promise<T>;
	#lastAccess: number;
	#dirty: boolean;
	#deps: FileCache<unknown>[];
	#data?: T;

	constructor(path: string, deps: FileCache<unknown>[], cb: (data: unknown) => Promise<T>) {
		this.#path = path;
		this.#cb = cb;
		this.#lastAccess = 0;
		this.#dirty = true;
		this.#deps = deps;
	}

	async isDirty(): Promise<boolean> {
		if (this.#dirty) return true;
		const stat = await fs.stat(this.#path);
		this.#dirty = this.#lastAccess < stat.mtimeMs;
		if (this.#dirty) return true;
		for (const dep of this.#deps) {
			const status = await dep.isDirty();
			if (status) {
				this.#dirty = true;
				return true;
			}
		}
		return false;
	}

	clean() {
		this.#lastAccess = Date.now();
		this.#dirty = false;
	}

	async read(): Promise<T> {
		if (await this.isDirty()) {
			const text = await fs.readFile(this.#path, { encoding: 'utf-8' });
			const data = JSON.parse(text);
			const parsed = await this.#cb(data);
			this.#data = parsed;
			this.clean();
		}
		return this.#data!;
	}
}

export const linksCache = new FileCache('./data/links.json', [], async (data) => {
	const parsed = linksSchema.parse(data);
	return new Map(parsed.map((link) => [link.LinkId, { text: link.Text, to: link.Node }]));
});

export const nodesCache = new FileCache('./data/nodes.json', [linksCache], async (data) => {
	const parsed = nodesSchema.parse(data);
	const links = await linksCache.read();
	return new Map(
		parsed.map((node) => [
			node.NodeId,
			{
				text: node.Text,
				actions: node.Links.map((link) => links.get(link)!)
			}
		])
	);
});
