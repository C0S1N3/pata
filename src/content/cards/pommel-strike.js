export default {
	name: 'Pommel Strike',
	zh: '剑柄打击',
	type: 'attack',
	energy: 1,
	target: 'enemy',
	description: '造成 9 点伤害。抽 1 张牌。',
	image: '8.jpg',
	damage: 9,
	actions: [
		{
			type: 'drawCards',
			parameter: {
				amount: 1,
			},
		},
	],
}

export const upgrade = (card) => {
	const a = card.actions.find((action) => action.type === 'drawCards')
	a.parameter.amount = 2
	return {
		...card,
		damage: 10,
		description: '造成 10 点伤害。抽 2 张牌。',
	}
}
