export default {
	name: 'Ritual Rain',
	zh: '净秽之雨',
	type: 'skill',
	energy: 2,
	target: 'player',
	description: '驱散自身所有虚弱与易伤。',
	image: 'ritual-rain.png',
	damage: 0,
	actions: [
		{
			type: 'removePlayerDebuffs',
		},
	],
}

export const upgrade = (card) => {
	return {
		...card,
		description: '驱散自身所有虚弱与易伤。获得 10 点格挡。',
		block: 10,
	}
}
