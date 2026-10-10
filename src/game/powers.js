/**
 * The type of a power
 * @typedef POWER
 * @prop {string} name - 逻辑名，同时作为 powers 对象的键，不要翻译
 * @prop {string} [zh] - 中文显示名
 * @prop {string} description
 * @prop {string} type
 * @prop {string=} target
 * @prop {Function=} use
 */

// Class representing a power.
class Power {
	/**
	 * @param {POWER} power - The base power to create a class from
	 */
	constructor(power) {
		const {name, zh, description, type, target, use} = power
		this.name = name
		this.zh = zh
		this.description = description
		this.type = type
		this.target = target
		this.use = use
	}
}

export const regen = new Power({
	type: 'buff',
	name: 'Regen',
	zh: '再生',
	description: '回合结束时回复等同于再生层数的生命',
	target: 'player',
	use: (stacks) => stacks,
})

export const poison = new Power({
	type: 'debuff',
	name: 'Poison',
	zh: '中毒',
	description: '造成等同于中毒层数的伤害',
	use: (stacks) => stacks,
})

export const vulnerable = new Power({
	type: 'debuff',
	name: 'Vulnerable',
	zh: '易伤',
	description: '受到的伤害提高 50%',
	use: (dmg) => Math.floor(dmg * 1.5),
})

export const weak = new Power({
	type: 'debuff',
	name: 'Weak',
	zh: '虚弱',
	description: '造成的伤害降低 25%',
	use: (dmg) => Math.floor(dmg * 0.75),
})

export const strength = new Power({
	type: 'buff',
	name: 'strength',
	zh: '力量',
	description: '每层使造成的伤害提高 1 点',
	use: (stacks) => stacks,
})

/**tried to add strength, but can't figure out how to give the +1 dmg per stack and stack doesn't reduce*/
export default {regen, vulnerable, weak, strength}
