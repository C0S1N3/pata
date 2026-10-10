export default {
	name: 'Thunderclap',
	zh: '雷鸣',
	type: 'attack',
	energy: 1,
	damage: 4,
	target: 'allEnemies',
	powers: {
		vulnerable: 1,
	},
	description: '造成 4 点伤害。对所有敌人施加 1 层易伤。',
	image: '4.jpg',
}

export const upgrade = (card) => {
	return {
		...card,
		damage: 6,
		description: '造成 6 点伤害。对所有敌人施加 1 层易伤。',
	}
}
