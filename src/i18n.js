/**
 * 显示名与逻辑名分离。
 *
 * 上游把 `name` 同时用作唯一 ID：牌组按名字引用卡牌、升级后给 `name`
 * 追加 "+"、upgradeNameMap 反查、测试断言也依赖它。所以 `name` 必须保留
 * 英文原样，中文名单独放在 `zh` 字段，仅在展示层取用。
 */

/** 取显示名，优先 zh，回落到 name。 */
export function displayName(entity) {
	if (!entity) return ''
	return entity.zh || entity.name || ''
}

/**
 * 卡牌显示名。升级后的卡 name 形如 "Strike+"，中文名要补回同样的后缀，
 * 否则升级前后看起来是同一张牌。
 */
export function cardName(card) {
	if (!card) return ''
	const base = card.zh || card.name || ''
	return card.name && card.name.endsWith('+') ? `${base}+` : base
}

/**
 * 卡牌类型的中文标签。`card.type` 本身是 CSS 选择器与逻辑判断的依据
 * （attack/skill），只能在展示时映射，不能改它的值。
 */
export const cardTypeLabels = {
	attack: '攻击',
	skill: '技能',
	power: '能力',
}

/** 取卡牌类型的中文标签，未知类型原样返回。 */
export function cardTypeLabel(type) {
	return cardTypeLabels[type] || type || ''
}
