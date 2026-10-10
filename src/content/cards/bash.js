export default {
	name: 'Bash',
	zh: '痛击',
	type: 'attack',
	energy: 2,
	damage: 8,
	target: 'enemy',
	image: 'apteryx-mantelli.jpg',
	powers: {
		vulnerable: 2,
	},
	description: '造成 8 点伤害。施加 2 层易伤。',
}

export const upgrade = (card) => {
	return {
		...card,
		damage: 10,
		description: '造成 10 点伤害。施加 3 层易伤。',
		powers: {
			vulnerable: 3,
		},
	}
}
