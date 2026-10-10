import gsap from '../animations.js'
import {Component, html} from '../lib.js'
import {DeckSelector} from './deck-selector.js'

export default class SplashScreen extends Component {
	constructor() {
		super()
		this.state = {
			selectedDeck: null,
			selectingDeck: false,
		}

		this.handleStartGame = this.handleStartGame.bind(this)
		this.startDeckSelection = this.startDeckSelection.bind(this)
	}

	componentDidMount() {
		gsap.from(this.base, {duration: 0.2, autoAlpha: 0, scale: 0.98})
	}

	handleDeckSelected(deck) {
		this.setState({selectedDeck: deck}, () => {
			// Start game immediately when a deck is selected
			this.handleStartGame()
		})
	}

	startDeckSelection() {
		this.setState({selectingDeck: true})
	}

	handleStartGame() {
		this.props.onNewGame(this.state.selectedDeck)
	}

	render(_props, state) {
		if (state.selectingDeck) {
			return html`
				<article class="Splash Container Container--vcenter">
					<div class="Box">
						<ul class="Options">
							<li><button class="Button" onClick=${() => this.setState({selectingDeck: false})}>← 返回</button></li>
						</ul>
						<br/>
						<h2>选择一套牌组</h2>
						<${DeckSelector} onSelectDeck=${(deck) => this.handleDeckSelected(deck)} />
						<ul class="Options">
							<li><hr /></li>
							<li><a class="Button" href="./deck-builder.html">牌组编辑器 →</a></li>
						</ul>
					</div>
				</article>
			`
		}

		return html`
			<article class="Splash Container Container--vcenter">
				<img class="Splash-spoder" src="./images/spoder.png" title="你来啦" />
				<div class="Box">
					<h1 class="Title Splash-title">爬塔</h1>
					<ul class="Options">
						${
							location.hash
								? html`
									<li>
										发现一局未结束的游戏。<button class="Button" autofocus onClick=${this.props.onContinue}>继续？</button>
									</li>
									<li><button class="Button" onClick=${() => this.props.onNewGame()}>重新开始</button></li>
								`
								: html`
									<li><button class="Button primary" autofocus onClick=${() => this.props.onNewGame()}>开始游戏</button></li>
									<li><button class="Button" onClick=${this.startDeckSelection}>自选牌组</button></li>
									<li><hr /></li>
									<li><a class="Button" href="./index.html?debug&tutorial">教学</a></li>
									<li><a class="Button" href="./deck-builder.html">牌组编辑器</a></li>
								`
						}
						<li><a class="Button" href="./collection.html">卡牌图鉴</a></li>
						<li><a class="Button" href="./monsters.html">怪物图鉴</a></li>
						<li><a class="Button" href="./manual.html">手册</a></li>
					</ul>
				</div>
			</article>
		`
	}
}
