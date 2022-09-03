<script lang="ts">
	import Canvas from '$lib/canvas/Canvas.svelte';
	import Circle from '$lib/canvas/Circle.svelte';
	import type { Particle } from '$lib/common/particle';
	import { getRandomPoint } from '$lib/common/point';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	let simulate = true;
	let particles: Particle[] = [];
	// give properties to each particle (depending on color or size..)
	// startColor-endColor as we go more towards endColor the particle will be more repellent
	// startWeight-endWeight as we go more towards endWeight the particle will be more attractive
	let width = 1000;
	let height = 1000;
	let ctx: Writable<CanvasRenderingContext2D | null>;
	onMount(() => {
		generateRandomParticles();
		requestAnimationFrame(draw);
	});
	function generateRandomParticles() {
		for (let i = 0; i < 100; i++) {
			particles = [
				...particles,
				{ center: getRandomPoint(width, height), color: 'red', radius: 5 }
			];
		}
	}
	function calculateNext() {
		const totalMass = particles.length;
		let centerOfMassX = 0;
		let centerOfMassY = 0;
		for (let i = 0; i < particles.length; i++) {
			centerOfMassX += particles[i].center.x * 1;
			centerOfMassY += particles[i].center.y * 1;
		}
		centerOfMassX = centerOfMassX / totalMass;
		centerOfMassY = centerOfMassY / totalMass;
		// console.log(centerOfMassX, centerOfMassY);

		for (let i = 0; i < particles.length; i++) {
			const velocity = 0.01;
			particles[i].center.x =
				particles[i].center.x - (particles[i].center.x - centerOfMassX) * velocity;
			particles[i].center.y =
				particles[i].center.y - (particles[i].center.y - centerOfMassY) * velocity;
		}
	}
	function draw() {
		if (simulate) {
			$ctx?.clearRect(0, 0, width, height);
			calculateNext();
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
		<Circle center={particle.center} radius={particle.radius} fill={particle.color} />
	{/each}
</Canvas>
