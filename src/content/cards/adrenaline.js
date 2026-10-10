export default {
	name: 'Adrenaline',
	zh: '肾上腺素',
	type: 'skill',
	energy: 0,
	damage: 0,
	target: 'player',
	actions: [
		{
			type: 'drawCards',
			parameter: {
				amount: 2,
			},
		},
		{
			type: 'addEnergyToPlayer',
			parameter: {
				amount: 1,
			},
		},
	],
	description: '获得 1 点能量。抽 2 张牌。消耗。',
	image: 'serpentine-dancer.jpg',
	exhaust: true,
}

export const upgrade = (card) => {
	const a = card.actions.find((action) => action.type === 'addEnergyToPlayer')
	a.parameter.amount = 2
	return {
		...card,
		description: '获得 2 点能量。抽 2 张牌。消耗。',
	}
}
