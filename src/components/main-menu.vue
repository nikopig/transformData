<template>
	<div class="main-menu">
		<el-menu :collapse.sync="collapse">
			<main-menu-item v-for="(item, index) in config" :config="item"></main-menu-item>
		</el-menu>
	</div>
</template>

<script>
	import mainMenuItem from './main-menu-item'
export default {
	name: 'main-menu',
	props: {
		collapse: {
			type: Boolean,
			default: false
		},
		options: {
			type: Object,
			default () {
				return {}
			}
		},
		config: {
			type: Array,
			default () {
				return [
					{
						title: '配置',
						path: '/config',
						params: {meta: 1},
						icon: 'el-icon-query',
						index: '1',
						children: [
							{
								title: '配置更改',
								path: '/configChange',
								params: {meta: 1},
								icon: 'el-icon-plus',
								index: '1-1',
								children: []
							}
						]
					},
					{
						title: '异常',
						path: '/error',
						params: {meta: 1},
						icon: 'el-icon-query',
						index: '2',
						children: [
							{
								title: '异常处理',
								path: '/errorDeal',
								params: {meta: 1},
								icon: 'el-icon-plus',
								index: '2-1',
								children: []
							}
						]
					}
				]
			}
		}
	},
	components: {mainMenuItem},
	data () {
		return {
			expanded: false,
			menus: ['配置', '配置列表', '异常信息', '失败记录处理']
		}
	},
	computed: {
		cn () {
			let flag = !this.config.children || this.config.children.length <= 0
			return flag ? 'MenuItem' : 'Submenu'
		}
	},
	methods: {
		toggle () {
			this.expanded = !this.expanded
		},
		goRouter (index) {
			switch (index) {
				case 0:
					this.$router.push('/')
					break
				case 1:
					this.$router.push('/seviceList')
					break
				case 2:
					this.$router.push('/exceptionInfo')
					break
				case 3:
					this.$router.push('/failRecord')
					break
			}
			this.$emit('gorouter')
		}
	},
	created () {},
	mounted () {}
}
</script>
<style lang="less">
@import '.././common/style/less/primary.less';
</style>
