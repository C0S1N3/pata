// Succube.js
export default {
	name: 'Succube',
	zh: '魅魔',
	type: 'attack',
	energy: 3,
	target: 'allEnemies',
	description: '对所有敌人造成 2 点伤害，并将其转化为生命。',
	image: 'succube.png',
	damage: 2,
	actions: [
		{
			type: 'addRegenEqualToAllDamage',
		},
	],
}

export const upgrade = (card) => ({
	...card,
	damage: 3,
	name: 'High Succube+',
	zh: '上位魅魔',
	description: '对所有敌人造成 3 点伤害，并将其转化为生命。',
})
