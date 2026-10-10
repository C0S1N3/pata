import {createCard} from '../../game/cards.js'
import {displayName} from '../../i18n.js'
import {uuid} from '../../utils.js'
import {Card} from '../components/cards.js'
import {DeckEditor} from '../components/deck-editor.js'
import {DeckSelector} from '../components/deck-selector.js'
import {html, useState} from '../lib.js'

export function DeckEditorApp() {
	const [deck, setDeck] = useState(null)

	function createNewDeck() {
		setDeck({
			id: uuid(),
			name: `我的牌组 ${uuid()}`,
			custom: true,
		})
	}

	return html`
		<div class="Box">
			<h2>牌组编辑器</h2>
			<p>
				游戏自带一套经典牌组，你也可以用现有卡牌组一套自己的。自定义牌组目前只存在你自己的浏览器里。
				想把它分享给别人，<a href="./manual.html">看看手册</a>。
			</p>
			<ul class="Options">
				<li><button class="Button" onClick=${createNewDeck}>新建自定义牌组</button></li>
			</ul>
		</div>

		<div class="Box">
			<${DeckSelector} onSelectDeck=${setDeck} />
		</div>

		${
			deck?.custom
				? html`<${DeckEditor}
					deck=${deck}
					onSaveDeck=${setDeck}
					onDeleteDeck=${(deckId) => {
						if (deck?.id === deckId) setDeck(null)
					}}
				/>`
				: html`<${DeckPreview} deck=${deck} />`
		}
	`
}

function DeckPreview({deck}) {
	if (!deck) return html``

	return html`
		<div class="Box">
			<h3>${displayName(deck)} <small>（内置牌组）</small></h3>
			<div class="Cards Cards--grid Cards--mini">
				${deck.cards.map((cardName) => html` <${Card} key=${cardName} card=${createCard(cardName)} /> `)}
			</div>
		</div>
	`
}
