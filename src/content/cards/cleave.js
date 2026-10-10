export default {
	name: 'Cleave',
	zh: '顺劈斩',
	type: 'attack',
	energy: 1,
	damage: 8,
	target: 'allEnemies',
	description: '对所有敌人造成 8 点伤害。',
	image: 'vernal-equinox.jpg',
}

export const upgrade = (card) => ({
	...card,
	damage: 11,
	description: '对所有敌人造成 11 点伤害。',
})
