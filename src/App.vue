<template>
	<div id="app" class="common-container">
			<div class="top-bar" v-if="loged">
					<a href="javascipt:void(0)" class="logo">
							<img src="" alt="">
							<i class="el-icon-mo-logo"></i>
							<span>数据转换</span>
					</a>
					<el-button @click="isCollapse=!isCollapse" class="menu-btn" icon="el-icon-mo-icon-view1" type="text"></el-button>
					<div class="person-box">
							<el-dropdown @command="handlePerson">
												<span class="el-dropdown-link">
															<img src="/static/image/head-img.jpg" alt="">
												</span>
									<el-dropdown-menu slot="dropdown">
											<el-dropdown-item :command="item" v-for="(item, index) in personMenus" :key="index">{{item.label}}</el-dropdown-item>
									</el-dropdown-menu>
							</el-dropdown>
					</div>
				<!-- <div class="menu-btn"> -->

							<!-- <el-dropdown @command="goRouter">
												<span class="el-dropdown-link">
														<i class="el-icon-mo-menu"></i>
												</span>
									<el-dropdown-menu slot="dropdown">
											<el-dropdown-item :command="item" v-for="(item, index) in menus" :key="index">{{item.label}}</el-dropdown-item>
									</el-dropdown-menu>
							</el-dropdown> -->
				<!-- </div> -->
			</div>
			<el-row :style="{ paddingTop: loged ?'60px' : 0 }">
				<el-col :span="isLoginShowMenu" v-if="loged">
					<el-menu :collapse="isCollapse" class="el-menu-vertical-demo" @select="goRouter">
						<el-menu-item :index="index+''" v-for="(item,index) in menus" :key="index" :class="{'is-active':$route.path === item.route}">
							<i :class="item.icon"></i>
							<span slot="title">{{item.label}}</span>
						</el-menu-item>
					</el-menu>
				</el-col>
				<el-col :span="isLoginShowContainer" :style="{ marginLeft:isCollapse?'-15px':0 , borderLeft:loged?'1px solid #eee':'none'}">
					<router-view/>
				</el-col>
			</el-row>
	</div>
</template>

<script>
import mainMenu from './components/main-menu'
export default {
	name: 'app',
	data () {
		return {
			loged: false,
			isCollapse: false,
			personMenus: [
				{
					label: '个人中心',
					value: 0
				},
				{
					label: '退出',
					value: 1
				}
			],
			menus: [
				{
					label: '配置',
					icon: 'el-icon-edit',
					route: '/ContentView'
				},
				{
					label: '配置列表',
					icon: 'el-icon-tickets',
					route: '/seviceList'
				},
				{
					label: '异常信息',
					icon: 'el-icon-error',
					route: '/exceptionInfo'
				},
				{
					label: '失败记录处理',
					icon: 'el-icon-warning',
					route: '/failRecord'
				}
			]
		}
	},
	methods: {
		goRouter (key) {
			this.$router.push(this.menus[parseInt(key)].route)
		},
		handlePerson (command) {
			if (command.value === 1) {
				this.clearCookie('user', 'pwd')
				this.$router.push({ name: 'login' })
			}
		},
		checkLogin () {
			let isLogin = this.checkLogin()
			if (!isLogin) {
				this.$router.push({ path: '/login' })
			} else {
				isLogin.then(res => {
					if (res.code === 0) {
						this.$router.push({ path: '/ContentView' })
					} else {
						this.$router.push({ path: '/login' })
					}
				})
			}
		}
	},
	watch: {
		$route (val) {
			this.loged = val.name !== 'login'
		}
	},
	components: { mainMenu },
	mounted () {
		this.loged = this.$route.name !== 'login'
		//				this.checkLogin()
	},
	computed: {
		isLoginShowContainer () {
			if (!this.isCollapse && this.loged) {
				return 21
			}
			if (this.loged && this.isCollapse) {
				return 23
			}
			if (!this.loged) {
				return 24
			}
		},
		isLoginShowMenu () {
			if (this.isCollapse) {
				return 1
			} else {
				return 3
			}
		}
	}
}
</script>

<style lang="less">
@import './common/style/less/primary.less';
.top-bar {
	height: 60px;
	background-color: @main-color;
	-webkit-box-shadow: 1px 0 3px 0 rgba(0, 0, 0, 0.2);
	box-shadow: 1px 0 3px 0 rgba(0, 0, 0, 0.2);
	left: 0px;
	position: fixed;
	right: 0;
	top: 0px;
	z-index: 999;
	.logo {
		display: inline-block;
		height: 60px;
		color: #fff;
		font-size: 23px;
		line-height: 60px;
		padding-left: 20px;
		i {
			position: relative;
			top: 6px;
			font-size: 30px;
		}
	}
	.person-box {
		height: 60px;
		width: 60px;
		padding: 12px;
		float: right;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		.el-dropdown-link {
			img {
				width: 36px;
				height: 36px;
				border-radius: 18px;
			}
		}
	}
	.menu-btn {
		margin-left: 15px;
		color: #fff;
		&:hover {
			color: #eeeeee;
		}
		.el-icon-mo-icon-view1 {
			font-size: 18px;
		}
	}
}
.menu {
	list-style: none;
	min-height: 800px;
	border-right: solid 1px #e6e6e6;
	.menu-item {
		font-size: 14px;
		height: 56px;
		line-height: 56px;
		cursor: pointer;
		&:hover {
			outline: 0;
			background-color: #ecf5ff;
		}
		i {
			font-size: 16px;
		}
		span {
			margin-left: 10px;
		}
	}
}

.el-menu-vertical-demo {
	min-height: 800px;
	border-right: none;
	&:not(.el-menu--collapse) {
		width: 100%;
	}
}
</style>
