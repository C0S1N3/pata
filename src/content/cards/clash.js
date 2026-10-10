// Clash.js
export default {
	name: 'Clash',
	zh: '激战',
	type: 'attack',
	energy: 0,
	damage: 14,
	target: 'enemy',
	conditions: [
		{
			type: 'onlyType',
			cardType: 'attack',
		},
	],
	description: '仅当手牌全部为攻击牌时可打出。造成 14 点伤害。',
	image: 'h-sperling-horrified.jpg',
}

export const upgrade = (card) => ({
	...card,
	damage: 17,
	description: '仅当手牌全部为攻击牌时可打出。造成 17 点伤害。',
})
