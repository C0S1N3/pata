// SoulDrain.js
export default {
	name: 'Soul Drain',
	zh: '汲魂',
	type: 'attack',
	energy: 1,
	target: 'allEnemies',
	description: '对所有敌人施加 3 层虚弱与易伤。自身失去 3 点生命。',
	image: 'soul-drain.png',
	damage: 0,
	powers: {
		weak: 3,
		vulnerable: 3,
	},
	actions: [
		{
			type: 'removeHealth',
			parameter: {
				amount: 3,
				target: 'player',
			},
		},
	],
}

export const upgrade = (card) => {
	const a = card.actions.find((action) => action.type === 'removeHealth')
	a.parameter.amount = 4
	return {
		...card,
		powers: {
			weak: 4,
			vulnerable: 4,
		},
		description: '对所有敌人施加 4 层虚弱与易伤。自身失去 4 点生命。',
	}
}
