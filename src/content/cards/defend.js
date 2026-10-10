export default {
	name: 'Defend',
	zh: '防御',
	type: 'skill',
	energy: 1,
	target: 'player',
	block: 5,
	description: '获得 5 点格挡。',
	image: 'angel-messenger.jpg',
}

export const upgrade = (card) => {
	return {
		...card,
		block: 8,
		description: '获得 8 点格挡。',
	}
}
