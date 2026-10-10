export default {
	name: 'Intimidate',
	zh: '威慑',
	type: 'skill',
	energy: 0,
	damage: 0,
	target: 'allEnemies',
	powers: {
		weak: 1,
	},
	description: '对所有敌人施加 1 层虚弱。消耗。',
	image: 'poured-millions-of-bubbles.jpg',
	exhaust: true,
}

export const upgrade = (card) => {
	card.powers.weak = 2
	return {
		...card,
		description: '对所有敌人施加 2 层虚弱。消耗。',
	}
}
