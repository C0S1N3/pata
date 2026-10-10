// SuckerPunch.js
export default {
	name: 'Sucker Punch',
	zh: '偷袭',
	type: 'attack',
	energy: 1,
	damage: 7,
	target: 'enemy',
	powers: {
		weak: 1,
	},
	description: '造成 7 点伤害。施加 1 层虚弱。',
	image: 'manicule.jpg',
}

export const upgrade = (card) => ({
	...card,
	damage: 8,
	powers: {
		weak: 2,
	},
	description: '造成 8 点伤害。施加 2 层虚弱。',
})
