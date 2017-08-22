<template>
	<div class="bg">
		<div class="screen-header">
			<div class="banner">
				<img width="30%" src="assets/wiseduLogo.png" />
				<span class="screen-line"></span>
				<div class="time">
					<div>
						<div>{{ymd}}</div>
						<div>{{day}}</div>
					</div>
					
					<div>
						<i v-for="(hm, idx) in hourMinute" :key="idx" :class="['iconfont', hm]"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="screen-main">
			<div class="title-wrap">
				<div class="screen-title">应用访问量趋势</div>
				<div class="subtitle">近30日, 单位：pv</div>
			</div>
			<div class="line-chart"></div>
		</div>
		<div class="side">
			<div class="app">
				<div class="screen-title">应用活动状态</div>
				<div class="timer">近30日, 截止时间：{{stopTime}}</div>
				<div class="items">
					<div class="with-line">
						<div class="item-count color-secondary">{{appCount}}</div>
						<div>应用数量</div>
					</div>
					<div class="with-line">
						<div class="item-count color-primary">{{hostAppCount}}</div>
						<div>活跃数量</div>
					</div>
					<div>
						<div class="item-count color-primary">{{notHostAppCount}}</div>
						<div>非活跃数量</div>
					</div>
				</div>
			</div>
			<div class="depart">
				<div class="screen-title">应用访问量排名</div>
				<div class="timer">近30日, 截止时间：{{stopTime}}</div>
				<div class="pie"></div>
				<div class="bar"></div>
			</div>
		</div>
	</div>
</template>
<script>
import echarts from 'echarts';
import {report} from '../../constants';
import {mapActions, mapGetters} from 'vuex';
// import service from 'services/service';

const days = ["日", "一", "二", "三", "四", "五", "六"];
const colors = [
	'#A12830', '#00529B', '#008193', '#AE005F', '#BB8900',
	'#CA4E00', '#00997A', '#A53BC8', '#87D300', '#0092C7',
	'#F9E700', '#6A1D44', '#9B91B1', '#FF227E', '#FF914E'
]
const colorMap = {};
const refreshTime = window.pvRefreshTime || 86400000;

export default {
	mounted() {
		setInterval(() => this.time = new Date(), 10000);
		this.pie = echarts.init(document.getElementsByClassName('pie')[0]);
		this.lineChart = echarts.init(document.getElementsByClassName('line-chart')[0]);
		this.bar = echarts.init(document.getElementsByClassName('bar')[0]);
		this.getRightInfo()
			.then(() => this.getLeftInfo());
		setInterval(() => {
			this.getRightInfo()
			.then(() => this.getLeftInfo());
		}, refreshTime)
	},
	data() {
		return {
			appCount: 0,
			hostAppCount: 0,
			notHostAppCount: 0,
			time: new Date(),
			statisticsTime: new Date(),
			pie: null,
			lineChart: null,
			bar: null
		}
	},
	computed: {
		ymd() {
			const time = this.time;
			const year = time.getFullYear();
			const month = time.getMonth() + 1;
			const date = time.getDate();
			return `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
		},
		day() {
			const time = this.time;
			const day = time.getDay();
			return `星期${days[day]}`;
		},
		hourMinute() {
			const time = this.time;
      const h = time.getHours();
      const m = time.getMinutes();
			// let hm = time.toLocaleString().substr(10, 5).split("");
			let hm = (h < 10 ? '0'+ h : h) + ":" + (m < 10 ? '0' + m : m);
			let hmArr = [];
			for (let i=0, len=hm.length; i<len; i++) {
				if (hm[i] == ":") {
					hmArr.push("icon-maohao");
				} else {
					hmArr.push("icon-icon-test" + hm[i]);
				}
			}
			return hmArr;
		},
		stopTime() {
			const time = this.statisticsTime;
			const year = time.getFullYear();
			const month = time.getMonth() + 1;
			const date = time.getDate();
			return `${year}/${month < 10 ? '0' + month : month}/${date < 10 ? '0' + date : date}`;;
		}
	},
	methods: {
		...mapActions({
			findBySysApp: report.SCREEN_DATA_APPS,
			analysisTotal: report.SCREEN_DATA_TOTAL
		}),
		getLeftInfo() {
			return this.findBySysApp() 
			.then(json => {
				const keys = Object.keys(json);
				const legend = keys.map(key => ({
					name: key,
					icon: 'circle'
				}));
				if (legend.length >= 10) {
					legend.splice(Math.ceil(legend.length / 2), 0, '');
				}
				const xAxis = json[keys[0]].map(v => v.name);
				const series = [], len = keys.length;
				for(let i=0; i<len; i++) {
					const lgnd = keys[i];
					const data = [];
					for(let m=0; m < xAxis.length; m++) {
						if(json[lgnd][m]) {
							data.push(parseInt(json[lgnd][m].value || 0));
						} else {
							data.push(0)
						}
					}
					series.push({
						name: lgnd,
						type:'line',
						data: data,
						lineStyle: {
							normal: {
								color: colorMap[lgnd]
							}
						},
						markPoint: {
							itemStyle: {
								normal: {
									color: colorMap[lgnd]
								}
							}
						}
					});
				}
				var option = {
					tooltip: {
							trigger: 'axis',
							formatter: function(params, ticket, callback) {
								const sortParams = params.sort((a, b) => b.data - a.data)
								const formattered = sortParams.map(item => {
									return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+item.color+'"></span>'+item.seriesName+': '+ item.data;
								});
								return formattered.join('<br/>');
							}
					},
					grid: {
						bottom: 120
					},
					legend: {
						orient: 'horizontal',
						data: legend,
						itemWidth: 10,
						itemHeight: 10,
						bottom: 0,
						textStyle: {
							color: '#fff',
							fontSize: 10
						},
						backgroundColor: 'rgba(255, 255, 255, 0.1)',
						padding: [5, 12],
						borderWidth: 1,
						borderColor: 'rgba(255, 255, 255, 0.2)'
					},
					xAxis:  {
						type: 'category',
						boundaryGap: false,
						axisLine: {
							onZero: false,
							lineStyle: {
								type: 'dashed',
								color: 'rgba(255, 255, 255, 0.2)'
							}
						},
						axisLabel: {
							margin: 20,
							textStyle: {
								color: '#fff'
							},
							'interval': function(idx) {
								return idx % 2 == 1
							}
						},
						data: xAxis
					},
					yAxis: {
						type: 'value',
						axisLine: {
							show: false
						},
						axisLabel: {
							margin: 20,
							textStyle: {
								color: '#fff'
							},
							formatter: '{value}'
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.4)',
								type: 'dashed'
							}  
						},
					},
					itemStyle: {
						normal: {
							color(param) {
								return colorMap[param.seriesName]
							}
						}
					},
					series: series
				};
				this.lineChart.clear();
				this.lineChart.setOption(option, false);
			})
			.catch(error => console.log(error));
		},
		getRightInfo() {
			return this.analysisTotal()
			.then(json => {
				this.appCount = json.appCount;
				this.hostAppCount = json.hostAppCount;
				this.notHostAppCount = json.notHostAppCount;
				this.statisticsTime = new Date();
				const data = json.systemList.slice(0).reverse();
				const yAxis = data.map(item => item.name);
				const barData = data.map(item => parseInt(item.value))
				const barDataShow = barData.slice(0).map((item, idx) => {
					const c = colors[idx % colors.length];
					colorMap[yAxis[idx]] = c;
					return {
						value: item,
						itemStyle: {
							normal: {
								color: c
							}
						}
					}
				})
				const totalData = barData.length > 0 ? barData.reduce((prev, current) => prev + current) : 0;
				const pieData = barData.map((item, idx) => ({
					name: parseInt(item / totalData * 100) + '%',
					value: item,
					itemStyle: {
						normal: {
							color: colors[idx % colors.length]
						}
					}
				}))
				const option = {
					series : [
						{
							name:'饼图',
							type:'pie',
							radius: ['40%', '70%'],
							center: ['50%', '60%'],
							labelLine: {
								normal: {
									length2: 0,
									smooth: true
								}
							},
							data: pieData
						}
					]
				}
				this.pie.clear();
				this.pie.setOption(option, false);

				const option2 = {
					grid: {
						top: 20,
						left: '40%'
					},
					xAxis: {
							type: 'value',
							boundaryGap: [0, 0.01],
							show: false
					},
					yAxis: {
							type: 'category',
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								textStyle: {
									color: '#fff'
								}
							},
							data: yAxis
					},
					series: [			
						{
							label: {
								normal: {
									show: true,
									position: 'insideRight',
									offset: [0, -2]
								}
							},
							barMinHeight: 30,
							type: 'bar',
							barMaxWidth: 18,
							data: barDataShow
						}
					]
				};
				this.bar.clear();
				this.bar.setOption(option2, false);
			})
			.catch( error => console.log(error));
		}
	}
};
</script>
<style scoped>
.bg {
	color: white;
	height: 100%;
	width: 100%;
	overflow: hidden;
	background: url(~/assets/bg.jpg) no-repeat center;
	background-size: 100% 100%;
	position: relative;
}
.screen-header {
	text-align: center;
}
.banner {
	display: inline-block;
	width: 40%;
	background: url(~/assets/border.png) no-repeat center bottom;
	padding: 0.5em 0;
	font-size: 12px;
	line-height: 22px;
}
.screen-line {
	display: inline-block;
	vertical-align: middle;
	width: 1px;
	min-height: 3em;
	background-color: rgba(255, 255, 255, 0.2);
	margin-left: 2em;
	margin-right: 2em;
}
.with-line {
	position: relative;
}
.with-line::after {
	position: absolute;
	right: 0;
	top: 0;
	content: '';
	width: 1px;
	background: rgba(255, 255, 255, 0.2);
	height: 100%;
}
.time {
	display: inline-block;
	height: 100%;
	vertical-align: middle;
	text-align: right;
}
.time > div {
	display: inline-block;
	height: 100%;
}
.screen-main {
	position: absolute;
	left: 0;
	right: 20%;
	top: 4em;
	bottom: 0;
}
.title-wrap {
	text-align: center;
	width: 20em;
	margin-top: 1em;
}
.title-wrap .screen-title {
	font-size: 1.3em;
}
.title-wrap .subtitle {
	font-size: 1em;
	transform: scale(0.9);
	color: #b0b5b8;
}
.side {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	left: 80%;
	font-size: 12px;
}
.side > div {
	background-color: rgba(0, 0, 0, 0.5);
	background-image: url(~/assets/border.png);
	/*no-repeat center bottom*/
	background-repeat: no-repeat;
	background-position: center bottom;
	position: absolute;
}
.app {
	left: 0;
	top: 5px;
	right: 5px;
	height: 11em;
	text-align: center;
	padding-top: 1.5em;
}
.screen-title {
	/*color: #ebd42c;*/
	color: white;
	font-size: 1.4em;
	line-height: 1.5em;
	letter-spacing: 5px;
}
.timer {
	font-size: 1em;
	transform: scale(0.8);
}
.items {
	margin-top: 1em;
	font-weight: lighter;
}
.items > div {
	display: inline-block;
	width: 32%;
}
.item-count {
	font-size: 2em;
	font-weight: bolder;
}
.item-count + div {
	font-size: 1em;
	transform: scale(0.9);
}
.depart {
	/*display: none;*/
	left: 0;
	top: 13.5em;
	right: 5px;
	bottom: 0.5em;
	text-align: center;
	padding-top: 1.5em;
	min-height: 40em;
}
.iconfont {
	color: #ebd42c;
	font-size: 3.5em;
	display: inline-block;
	width: 0.4em;
}
.color-primary {
	color: #ebd42c;
}
.color-secondary {
	color: #1aa3ac;
}
.pie {
	height: 20em;
}
.bar {
	min-height: 40em;
	height: 70%;
}
.line-chart {
	width: 100%;
	height: 85%;
}
img {
	border: 0;
	vertical-align: middle;
}
</style>