import {html, useState} from '../lib.js'
import {saveToUrl} from '../save-load.js'
import {toggleMute} from '../sounds.js'

// @ts-expect-error
const abandonGame = () => {
	// 只保留路径，丢掉存档用的 hash 与查询串。不能用 location.origin：
	// 玩具页挂在 /toy/<slug>/ 下，origin 是 bilibili 主站根域。
	window.location.href = window.location.pathname
}

/** @typedef {import('../../game/new-game.js').Game} Game */
/** @typedef {import('../../game/actions.js').State} State */

/**
 * Do something
 * @param {object} props
 * @param {State} props.gameState
 * @returns {import('preact').VNode}
 */
export default function Menu({gameState}) {
	const [muted, setMuted] = useState(false)

	function toggleSound() {
		toggleMute(!muted)
		setMuted(!muted)
	}

	return html`
		<div class="Container">
			<br />
			<br />
			<div class="Box">
				<ul class="Options">
					<li>
						<button
							class="Button"
							onClick=${() => saveToUrl(gameState)}
							title="进度会存进网址里，复制它即可保留"
						>
							保存进度
						</button>
					</li>
					<li>
						<button class="Button" danger onClick=${() => abandonGame()}>放弃本局</button>
					</li>
					<li>
						<label>音效 <input type="checkbox" checked=${!muted} onClick=${() => toggleSound()} /></label>
					</li>
				</ul>
			</div>
		</div>
	`
}
