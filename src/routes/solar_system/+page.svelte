<script lang="ts">
	import Canvas from '$lib/canvas/Canvas.svelte';
	import Circle from '$lib/canvas/Circle.svelte';
	import { calculateBasedOfGravity, type Particle } from '$lib/common/particle';
	import type { Point } from '$lib/common/point';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	const BIG_G = 6.67e-11; // gravitational constant

	let simulate = true;
	let particles: Particle[] = [];
	let width = 1000;
	let height = 1000;
	let ctx: Writable<CanvasRenderingContext2D | null>;
	const particleScale = width / 4495.06e9;
	onMount(() => {
		seedSolarSystem(width, height);
		requestAnimationFrame(draw);
	});
	function seedSolarSystem(canvasWidth: number, canvasHeight: number) {
		// const ratioPositionX = canvasWidth / 4495.06e9; // neptune
		// const ratioMass = 1 / 989e30; // sun
		// const ratioVelocityY = 1 / 47.36e3; // mercury
		const ratioPositionX = 1; // neptune
		const ratioMass = 1; // sun
		const ratioVelocityY = 1; // mercury

		particles = [
			{
				// sun
				center: { x: 0, y: 0 },
				velocity: { x: 0, y: 0 },
				mass: 989e30 * ratioMass,
				color: 'yellow',
				radius: 10
			},
			{
				// mercury
				center: { x: 57.909e9 * ratioPositionX, y: 0 },
				velocity: { x: 0, y: 47.36e3 * ratioVelocityY },
				mass: 33011e24 * ratioMass,
				color: 'grey',
				radius: 10
			},
			{
				// venus
				center: { x: 108.209e9 * ratioPositionX, y: 0 },
				velocity: { x: 0, y: 35.02e3 * ratioVelocityY },
				mass: 4.8675e24 * ratioMass,
				color: 'brown',
				radius: 10
			},
			{
				// earth
				center: { x: 149.596e9 * ratioPositionX, y: 0 },
				velocity: { x: 0, y: 29.78e3 * ratioVelocityY },
				mass: 5.9724e24 * ratioMass,
				color: 'blue',
				radius: 10
			},
			{
				// mars
				center: { x: 227.923e9 * ratioPositionX, y: 0 },
				velocity: { x: 0, y: 24.07e3 * ratioVelocityY },
				mass: 0.64171e24 * ratioMass,
				color: 'red',
				radius: 10
			},
			{
				// jupiter
				center: { x: 778.57e9 * ratioPositionX, y: 0 },
				velocity: { x: 0, y: 13e3 * ratioVelocityY },
				mass: 1898.19e24 * ratioMass,
				color: 'orange',
				radius: 10
			},
			{
				// saturn
				center: { x: 1433.529e9 * ratioPositionX, y: 0 },
				velocity: { x: 0, y: 9.68e3 * ratioVelocityY },
				mass: 568.34e24 * ratioMass,
				color: 'golden',
				radius: 10
			},
			{
				// uranus
				center: { x: 2872.463e9 * ratioPositionX, y: 0 },
				velocity: { x: 0, y: 6.8e3 * ratioVelocityY },
				mass: 86.813e24 * ratioMass,
				color: 'green',
				radius: 10
			},
			{
				// neptune
				center: { x: 4495.06e9 * ratioPositionX, y: 0 },
				velocity: { x: 0, y: 5.43e3 * ratioVelocityY },
				mass: 102.413e24 * ratioMass,
				color: 'blue',
				radius: 10
			}
		];
	}
	function draw() {
		if (simulate) {
			$ctx?.clearRect(0, 0, width, height);
			calculateBasedOfGravity(86000, particles);
		}
		requestAnimationFrame(draw);
	}
</script>

<div>
	Simulate
	<button on:click={() => (simulate = !simulate)}>
		{#if simulate}
			off
		{:else}
			on
		{/if}
	</button>
</div>

<Canvas {width} {height} bind:ctx>
	{#each particles as particle}
		<!-- <div>
			{JSON.stringify({
				x: particle.center.x * particleScale,
				y: particle.center.y * particleScale
			})}
		</div>
	-->
		<Circle
			center={{
				x: particle.center.x * particleScale,
				y: particle.center.y * particleScale
			}}
			radius={particle.radius}
			fill={particle.color}
		/>
	{/each}
</Canvas>
