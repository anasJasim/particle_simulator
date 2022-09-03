import type { Writable } from "svelte/store";

export const CanvasKey = Symbol();
export interface CanvasContext {
	getCanvas: () => Writable<HTMLCanvasElement | null>;
	get2DContext: () => Writable<CanvasRenderingContext2D | null>;
}