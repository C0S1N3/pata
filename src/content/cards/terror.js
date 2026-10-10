export default {
	name: 'Terror',
	zh: '恐惧',
	type: 'skill',
	energy: 1,
	damage: 0,
	target: 'enemy',
	powers: {
		vulnerable: 99,
	},
	description: '施加 99 层易伤。消耗。',
	image: '2.jpg',
	exhaust: true,
}

export const upgrade = (card) => {
	return {
		...card,
		energy: 0,
	}
}
