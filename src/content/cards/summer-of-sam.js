export default {
	name: 'Summer of Sam',
	zh: '山姆之夏',
	type: 'skill',
	energy: 1,
	target: 'player',
	description: '回复 1 点生命。若生命值低于 50%，抽 2 张牌。',
	image: 'bare-feet-of-god.jpg',
	actions: [
		{
			type: 'addHealth',
			parameter: {
				amount: 1,
			},
		},
		{
			type: 'drawCards',
			parameter: {
				amount: 2,
			},
			conditions: [
				{
					type: 'healthPercentageBelow',
					percentage: 50,
				},
			],
		},
	],
}

export const upgrade = (card) => {
	// An example of how to upgrade a local action.
	const a = card.actions.find((action) => action.type === 'addHealth')
	a.parameter.amount = 2
	return {
		...card,
		description: '回复 2 点生命。若生命值低于 50%，抽 2 张牌。',
	}
}
