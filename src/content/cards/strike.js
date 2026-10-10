export default {
	name: 'Strike',
	zh: '打击',
	type: 'attack',
	energy: 1,
	target: 'enemy',
	damage: 6,
	description: '造成 6 点伤害。',
	image: 'the-angel-of-death.jpg',
}

export const upgrade = (card) => {
	return {
		...card,
		damage: 9,
		description: '造成 9 点伤害。',
	}
}
