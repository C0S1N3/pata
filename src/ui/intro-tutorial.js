import {driver} from 'driver.js'
import 'driver.js/dist/driver.css'

export default function startTutorial() {
	const steps = [
		{
			popover: {
				title: '欢迎',
				description: '这是一份极简上手指引，跟着我走一遍。（按回车继续）',
			},
		},
		{
			element: '.Target[data-type="player"]',
			popover: {align: 'center', description: '这是你。别让生命值掉光。'},
		},
		{
			element: '.Hand .Cards',
			popover: {align: 'center', description: '你抽了 5 张牌。出牌需要消耗能量。'},
		},
		{
			element: '.EnergyBadge',
			popover: {description: '你有 3 点能量，每回合开始时补满。'},
		},
		{
			element: '.EndTurn',
			popover: {description: '结束回合后，怪物就该动手了。'},
		},
	]
	const enemies = document.querySelectorAll('.Target[data-type="enemy"]')
	enemies.forEach((target) => {
		steps.push({
			element: target,
			popover: {
				align: 'center',
				position: 'left',
				description: '这是敌人。拿牌砸它，直到它倒下。',
			},
		})
	})
	steps.push({popover: {description: '剩下的自己摸索吧。祝你好运。'}})

	const intro = driver({allowClose: false, nextBtnText: '知道了', showButtons: ['next'], steps})
	intro.drive()
}
