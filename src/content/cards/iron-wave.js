export default {
	name: 'Iron Wave',
	zh: '铁浪',
	type: 'attack',
	energy: 1,
	damage: 5,
	block: 5,
	target: 'enemy',
	description: '造成 5 点伤害。获得 5 点格挡。',
	image: 'henry-stares-back.jpg',
}

export const upgrade = (card) => ({
	...card,
	damage: 7,
	block: 7,
	description: '造成 7 点伤害。获得 7 点格挡。',
})
