import {Draggable} from 'gsap/Draggable.js'
import {cardHasValidTarget, getTargetStringFromElement} from '../game/utils-state.js'
import gsap from './animations.js'
import * as sounds from './sounds.js'

/** Class to add to the element we are dragging over */
const overClass = 'is-dragOver'

/** Makes the card fly back into the hand */
function animateCardToHand(draggable) {
	return gsap.to(draggable.target, {x: draggable.startX, y: draggable.startY, zIndex: 0})
}

/**
 * This gets called continously while dragging a card
 * @param {HTMLElement} target - element being dragged
 * @param {HTMLElement} targetEl - element below the target
 */
function canDropOnTarget(target, targetEl) {
	if (!targetEl) return false
	const hasValidTarget = cardHasValidTarget(
		target.getAttribute('data-card-target'),
		getTargetStringFromElement(targetEl),
	)
	const targetIsDead = targetEl.classList.contains('Target--isDead')
	return hasValidTarget && !targetIsDead
}

/**
 *
 * @param {Element} container
 * @param {Function} afterRelease
 * @param {Function} [onInspect] - 点击（而非拖拽）卡牌时调用，用于放大查看卡面
 */
export default function enableDragDrop(container, afterRelease, onInspect) {
	/** @type {NodeListOf<HTMLElement>} */
	const targets = container.querySelectorAll('.Target')
	const cards = container.querySelectorAll('.Hand .Card')

	cards.forEach((card) => {
		Draggable.create(card, {
			// 点击与拖拽要分得开：手指在窄屏上放大卡面看效果是刚需，
			// 但只要发生位移就是出牌，不能再弹详情。GSAP 的 onClick 只在
			// 几乎没有位移时触发，正好是这个语义。
			onClick() {
				if (onInspect) onInspect(card.dataset.id)
			},

			onDragStart() {
				// Kill any animations trying to move this card
				gsap.killTweensOf(this.target)
				// Reset to proper hand position
				this.startX = 0
				this.startY = 0
				sounds.selectCard()
			},

			onDrag() {
				const cardEl = this.target

				if (cardEl.attributes.disabled) {
					this.endDrag()
				}

				for (const targetEl of targets) {
					if (this.hitTest(targetEl, '40%') && canDropOnTarget(cardEl, targetEl)) {
						targetEl.classList.add(overClass)
					} else {
						targetEl.classList.remove(overClass)
					}
				}
			},

			onRelease() {
				const cardEl = this.target

				// Find the (first) DOM element we dropped the card on.
				let targetEl
				for (const t of targets) {
					if (this.hitTest(t, '40%')) {
						targetEl = t
						break
					}
				}

				// Either trigger the callback with valid target, or animate the card back in back.
				if (canDropOnTarget(cardEl, targetEl)) {
					const targetString = getTargetStringFromElement(targetEl)
					afterRelease(cardEl.dataset.id, targetString, cardEl)
				} else {
					animateCardToHand(this)
					sounds.cardToHand()
				}

				// Remove active class from any other targets.
				targets.forEach((t) => {
					t.classList.remove(overClass)
				})
			},
		})
	})
}
