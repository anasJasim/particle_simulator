import type { Point } from './point';

export interface Particle {
	color: string;
	radius: number;
	center: Point;
	velocity: Point;
	mass: number;
}

export function calculateBasedOfCenterOfMass(particles: Particle[]) {
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

export const BIG_G = 6.67e-11; // gravitational constant
export function calculateBasedOfGravity(deltaTime: number, particles: Particle[]) {
	for (let particleIndex1 = 0; particleIndex1 < particles.length; particleIndex1++) {
		const accelaration: Point = { x: 0, y: 0 };
		for (let particleIndex2 = 0; particleIndex2 < particles.length; particleIndex2++) {
			if (particleIndex1 === particleIndex2) continue;
			const diff: Point = {
				x: particles[particleIndex1].center.x - particles[particleIndex2].center.x,
				y: particles[particleIndex1].center.y - particles[particleIndex2].center.y
			};
			const diffMagnitude = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
			const unitVector: Point = { x: diff.x / diffMagnitude, y: diff.y / diffMagnitude };

			const _accelaration =
				(-1 * BIG_G * particles[particleIndex2].mass) / Math.pow(diffMagnitude, 2);
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
