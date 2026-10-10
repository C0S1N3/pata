export default {
	name: 'Mask of the Faceless',
	zh: '无面者面具',
	type: 'skill',
	energy: 0,
	target: 'player',
	description: '获得 1 点能量。',
	image: 'mask-of-the-faceless.png',
	damage: 0,
	actions: [
		{
			type: 'addEnergyToPlayer',
			parameter: {
				amount: 1,
			},
		},
	],
}

export const upgrade = (card) => {
	return {
		...card,
		block: 5,
		description: '获得 1 点能量和 5 点格挡。',
	}
}
