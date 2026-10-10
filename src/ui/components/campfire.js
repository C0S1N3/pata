import {isCurrRoomCompleted} from '../../game/utils-state.js'
import {pick} from '../../utils.js'
import {Component, html} from '../lib.js'
import CardChooser from './card-chooser.js'

export default class CampfireRoom extends Component {
	rest() {
		this.props.onChoose('rest')
	}
	choose(choice, reward) {
		this.setState({
			choice,
			reward,
			isChoosingCard: !this.state.isChoosingCard,
		})
		if (reward) {
			this.props.onChoose(choice, reward)
		}
	}
	onSelectCard(card) {
		this.choose(this.state.choice, card)
	}
	render(props, state) {
		const {gameState} = props
		const {choice, isChoosingCard} = state
		let label = ''
		if (isCurrRoomCompleted(gameState)) {
			return html`
			<div class="Container Container--center">
				<h1 center>你已经做过选择了</h1>
				<p center>
					<button class="Button" onClick=${props.onContinue}>前往下一个房间</button>
				</p>
			</div>
		`
		}

		let labelButton = ''
		if (choice === 'upgradeCard') {
			label = '选择一张要升级的牌'
			labelButton = '升级卡牌'
		}
		if (choice === 'removeCard') {
			label = '选择一张要移除的牌'
			labelButton = '移除卡牌'
		}

		return html`
			<div class="Container Container--center">
				<h1 center>篝火</h1>
				<p center>${pick(campfireIntroTexts)}</p>

						${
							!isChoosingCard &&
							html`
				<div class="Box">
					<ul class="Options">
									<li><button class="Button" onClick=${() => this.rest()}>休息</button></li>
									<li><button class="Button" onClick=${() => this.choose('upgradeCard')}>升级卡牌</button></li>
									<li><button class="Button" onClick=${() => this.choose('removeCard')}>移除卡牌</button></li>
					</ul>
				</div>
								`
						}

				${
					isChoosingCard &&
					html`
					<br/>
					<h2 center>${label}</h2>
					<${CardChooser}
						gameState=${gameState}
						cards=${gameState.deck.filter((card) => !card.upgraded)}
						didSelectCard=${(card) => this.onSelectCard(card)}
						buttonLabel=${labelButton}
					/>`
				}

				<p center>
					${
						isChoosingCard
							? html`<button class="Button" onClick=${() => this.setState({isChoosingCard: false})}>取消</button>`
							: html`<button class="Button" onClick=${() => this.props.onContinue()}>不用了，就这样</button>`
					}
				</p>

			</div>
		`
	}
}

const campfireIntroTexts = [
	'火光在招呼你。歇一歇，把力气收回来，好走接下来的路。',
	'篝火明亮，正适合休整。体力和牌组一样要紧。',
	'火光落在你的牌上。趁现在磨一磨它们，如何？',
	'火光照亮你的牌组。升一张，下一战会不会就不一样了？',
	'坐在火边翻看牌组。也许该丢掉一张了？',
	'火苗晃动，你翻着牌。有时少即是多。',
	'前方是篝火。难得的安宁，你要怎么用？',
	'火光映着你的牌。这里的每个选择，都可能是你缺的那点优势。',
]
