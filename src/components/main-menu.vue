<template>
		<div class="menu" :class="{expanded: 'expanded'}">
				<div class="menu">
						<el-menu>
								<el-menu-item :index="index + ''" v-for="(item, index) in menus" :key="index" @click.native="goRouter(index)">
										<span>{{item}}</span>
								</el-menu-item>
						</el-menu>
				</div>
		</div>
</template>

<script>
export default {
	name: 'main-menu',
	props: [],
	components: {},
	data () {
		return {
			expanded: false,
			menus: ['配置', '配置列表', '异常信息', '失败记录处理']
		}
	},
	computed: {
		colapse () {
			return !this.expanded
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
