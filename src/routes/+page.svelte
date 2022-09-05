<script lang="ts">
	import Canvas from '$lib/canvas/Canvas.svelte';
	import Circle from '$lib/canvas/Circle.svelte';
	import { BIG_G, type Particle } from '$lib/common/particle';
	import { getRandomPoint, getRandomVelocity, type Point } from '$lib/common/point';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let simulate = true;
	let particles: Particle[] = [];
	// give properties to each particle (depending on color or size..)
	// startColor-endColor as we go more towards endColor the particle will be more repellent
	// startWeight-endWeight as we go more towards endWeight the particle will be more attractive
	let width = 1000;
	let height = 1000;
	let ctx: Writable<CanvasRenderingContext2D | null>;
	onMount(() => {
		seedRandomParticles();
		requestAnimationFrame(draw);
	});
	function seedRandomParticles() {
		for (let i = 0; i < 100; i++) {
			particles = [
				...particles,
				{
					center: getRandomPoint(width, height),
					color: 'red',
					radius: 5,
					velocity: { x: 0, y: 0 },
					mass: 1
				}
			];
		}
	}
	function calculateBasedOfGravity(deltaTime: number) {
		for (let particleIndex1 = 0; particleIndex1 < particles.length; particleIndex1++) {
			const accelaration: Point = { x: 0, y: 0 };
			for (let particleIndex2 = 0; particleIndex2 < particles.length; particleIndex2++) {
				if (particleIndex1 === particleIndex2) continue;
				const diff: Point = {
					x: particles[particleIndex1].center.x - particles[particleIndex2].center.x,
					y: particles[particleIndex1].center.y - particles[particleIndex2].center.y
				};

				const diffMagnitude = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
				if (diffMagnitude === 0) continue;

				const unitVector: Point = { x: diff.x / diffMagnitude, y: diff.y / diffMagnitude };

				const _accelaration =
					(-1 * BIG_G * particles[particleIndex2].mass * particles[particleIndex1].mass) /
					Math.pow(diffMagnitude, 2);
				accelaration.x += _accelaration * unitVector.x;
				accelaration.y += _accelaration * unitVector.y;
			}

			particles[particleIndex1].velocity.x += accelaration.x * deltaTime;
			particles[particleIndex1].velocity.y += accelaration.y * deltaTime;
		}
		for (let particleIndex = 0; particleIndex < particles.length; particleIndex++) {
			particles[particleIndex].center.x += particles[particleIndex].velocity.x * deltaTime;
			particles[particleIndex].center.y += particles[particleIndex].velocity.y * deltaTime;
		}
	}
	function calculateBasedOfCenterOfMass() {
		const totalMass = particles.length;
		let centerOfMassX = 0;
		let centerOfMassY = 0;
		for (let i = 0; i < particles.length; i++) {
			centerOfMassX += particles[i].center.x * 1;
			centerOfMassY += particles[i].center.y * 1;
		}
		centerOfMassX = centerOfMassX / totalMass;
		centerOfMassY = centerOfMassY / totalMass;

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
			// calculateBasedOfCenterOfMass();
			calculateBasedOfGravity(186000);
			// console.log(particles);
			// console.log(particles);
		}
		requestAnimationFrame(draw);
	}
	function incr(ovb: Writable<any>) {
		// ovb.x += 1;
		// obv.set({ x: obv. });
		// ovb.set
	}
	setInterval(() => {
		// obj.x += 1;
		incr(obj);
	}, 1000);
	let obj = writable({ x: 1 });
</script>

{$obj.x}
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
