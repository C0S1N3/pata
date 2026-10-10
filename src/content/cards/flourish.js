const flourish = {
	name: 'Flourish',
	zh: '生机勃发',
	type: 'skill',
	energy: 2,
	target: 'player',
	description: '获得 5 层再生。仅当生命值低于 50% 时可打出。',
	image: '5.jpg',
	powers: {
		regen: 5,
	},
	conditions: [
		{
			type: 'healthPercentageBelow',
			percentage: 50,
		},
	],
}

export default flourish

export const upgrade = (card) => {
	const a = card.conditions.find((action) => action.type === 'healthPercentageBelow')
	a.percentage = 75
	return {
		...card,
		description: '获得 5 层再生。仅当生命值低于 75% 时可打出。',
	}
}
