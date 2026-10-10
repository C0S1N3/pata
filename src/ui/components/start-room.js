import {Component, html} from '../lib.js'

export default class StartRoom extends Component {
	render() {
		return html`
			<div class="Container Container--center">
				<div class="Box">
				<h1 center style="color: black">开始了……</h1>
				<p center>一路打穿地牢，组建你的牌组，击败最后的首领。</p>
					<ul class="Options">
						<li><button class="Button" onClick=${() => this.props.onContinue()}>打开地图</button></li>
					</ul>
				</div>
			</div>
		`
	}
}
