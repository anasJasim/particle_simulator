<script lang="ts">
	import type { Point } from '$lib/common/point';

	import { getContext } from 'svelte';
	import { CanvasKey, type CanvasContext } from './utils';

	export let center: Point;
	export let radius: number;
	export let fill: string;

	const { get2DContext } = getContext<CanvasContext>(CanvasKey);
	const ctx = get2DContext();
	$: if ($ctx) {
		draw($ctx, center);
	}

	function draw(ctx: CanvasRenderingContext2D, center: Point) {
		ctx.lineWidth = 1;
		ctx.fillStyle = fill;
		ctx.beginPath();
		ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
	}
</script>
