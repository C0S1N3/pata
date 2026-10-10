import {getCardRewards} from '../../game/cards.js'
import {pick} from '../../utils.js'
import {html} from '../lib.js'
import CardChooser from './card-chooser.js'

/**
 *
 * @param {object} props
 * @prop {function} props.onSelectCard
 * @prop {object} props.gameState
 * @returns {import('preact').VNode}
 */
export default function VictoryRoom(props) {
	const state = props.gameState
	return html`
		<div class="Container Container--center">
			<h1 center>胜利！</h1>
			<h2 center>${pick(victoryRoomIntroTexts)}</h2>
			${
				!state.didPickCard &&
				html`
				<${CardChooser}
					animate
					cards=${getCardRewards(3)}
					didSelectCard=${(card) => props.onSelectCard(card)}
					buttonLabel="加入牌组"
					showUpgrades=${false}
				/>
			`
			}
			<ul class="Options">
				<button class="Button" onClick=${props.onContinue}>前往下一个房间</button>
			</ul>
		</div>
	`
}

const victoryRoomIntroTexts = [
	'赢下一场，新牌也摆上了台面。挑得仔细些。',
	'胜利很甜，但一张新牌更甜。',
	'怪物倒下，士气上来。',
	'啊，败北的味道！不如挑张新牌庆祝一下？',
	'当然，你也可以不要奖励。随你。',
	'杀过了，该拿了。选哪张，勇者？',
	'胜利了！别磨蹭太久，牌可不会自己选自己。',
	'牌海任你挑。',
	'选一张，随便哪张！',
	'奖励在等你。但记住，牌组塞太满可不行。',
	'胜利之厅。今天的选择，就是明天的胜利——或者明天的败北。',
	'新牌到手。别小看一张新卡的分量。',
]
