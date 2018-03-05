<template>
    <div class="pie">
		<canvas ref="canvas" width="100" height="100"></canvas>
    </div>
</template>

<script>
	import Echarts from 'echarts'
	import Api from '@/utils/api'
    export default {
        name: 'Pie',
        props: {
			identity: {
				type: String,
				default: ''
			}
		},
        components: {},
        data () {
            return {
				options: {
					tooltip: {
						show: true,
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					series: [
						{
							name: '访问来源',
							type: 'pie',
							center: ['50%', '50%'],
							data: [
								{value: 335, name: '直接访问'},
								{value: 310, name: '邮件营销'},
								{value: 234, name: '联盟广告'},
								{value: 135, name: '视频广告'},
								{value: 1548, name: '搜索引擎'}
							],
							label: {
								normal: {
									show: false,
									position: 'center'
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							}
						}
					]
				},
				originData: {}
			}
        },
        computed: {
		},
        methods: {
        	initChart () {
        		console.log(this.options)
        		this.chart.setOption(this.options)
			},
			dealData (res) {
				if (!res.success) return []
				let keys = Object.keys(res)
				return keys.map(item => {
					let temp = {}
					let num = res[item] - 0
					temp.name = item
					temp.value = num
					return temp
				})
			},
			getSuccessInfo () {
				let params = {
					identity: this.identity
				}
				Api.post('getSuccessInfo', params)
					.then(res => {
						if (res.code === 0) {
							this.options.series[0].data = this.dealData(res.data)
						} else {
							this.options.series[0].data = [
								{value: 0, name: 'success'},
								{value: 0, name: 'error'}
							]
						}
						this.initChart()
					})
			}
		},
        created () {
        },
        mounted () {
        	this.chart = Echarts.init(this.$refs.canvas)
			this.getSuccessInfo()
        }
    }
</script>
<style lang="less" scoped>
</style>
