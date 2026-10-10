// @todo implement posion before using this card

export default {
	name: 'Deadly Poison',
	zh: '致命毒药',
	type: 'attack',
	energy: 1,
	damage: 0,
	target: 'enemy',
	powers: {
		poison: 5,
	},
	description: '施加 5 层中毒。',
	image: '6.jpg',
}

export const upgrade = (card) => {
	return {
		...card,
		powers: {
			poison: 7,
		},

		description: '施加 7 层中毒。',
	}
}
