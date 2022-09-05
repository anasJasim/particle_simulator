<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { type CanvasContext, CanvasKey } from './utils';
	const canvas = writable<HTMLCanvasElement | null>(null);
	export const ctx = writable<CanvasRenderingContext2D | null>(null);
	export let width = 1000;
	export let height = 1000;
	setContext<CanvasContext>(CanvasKey, { get2DContext: () => ctx, getCanvas: () => canvas });
	onMount(() => {
		$ctx = $canvas!.getContext('2d')!;
	});
</script>

<canvas bind:this={$canvas} {width} {height} />
<slot />

<style>
	canvas {
		background-color: yellow;
	}
</style>
