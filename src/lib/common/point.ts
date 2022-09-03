export interface Point {
	x: number;
	y: number;
}

export function getRandomPoint(endX: number, endY: number): Point {
	return {
		x: Math.random() * endX,
		y: Math.random() * endY
	};
}
