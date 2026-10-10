export default {
	name: 'Bludgeon',
	zh: '重锤',
	type: 'attack',
	energy: 3,
	target: 'enemy',
	damage: 24,
	description: '造成 24 点伤害。',
	image: 'alice-holds-the-white-king.jpg',
}

export const upgrade = (card) => {
	return {
		...card,
		damage: 36,
		description: '造成 36 点伤害。',
	}
}
