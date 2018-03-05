<template>
	<div id="app" class="common-container" :class="{loginPage: !notLogin, otherPage: notLogin}">
			<div class="top-bar">
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
			</div>
			<div class="main-content" :class="{hideSide: isCollapse}" :style="{ paddingTop: notLogin ?'60px' : 0 }">
				<div class="side-bar" v-show="notLogin">
					<el-menu :collapse="isCollapse" class="side-menu" @select="goRouter">
						<el-menu-item :index="index+''" v-for="(item,index) in menus" :key="index" :class="{'is-active':$route.path === item.route}">
							<i :class="item.icon"></i>
							<span slot="title">{{item.label}}</span>
						</el-menu-item>
					</el-menu>
				</div>
				<div class="router-box">
					<router-view/>
				</div>
			</div>
	</div>
</template>

<script>
import mainMenu from './components/main-menu'
export default {
	name: 'app',
	data () {
		return {
			notLogin: false,
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
//				{
//					label: '配置',
//					icon: 'el-icon-edit',
//					route: '/ContentView'
//				},
				{
					label: '配置列表',
					icon: 'el-icon-tickets',
					route: '/seviceList'
				},
				{
					label: '日志信息',
					icon: 'el-icon-error',
					route: '/log'
				}
			]
		}
	},
	methods: {
		onClose () {
//			console.log(11)
		},
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
						this.$router.push({ path: '/seviceList' })
					} else {
						this.$router.push({ path: '/login' })
					}
				})
			}
		}
	},
	watch: {
		$route (val) {
			this.notLogin = val.name !== 'login'
		}
	},
	components: { mainMenu },
	mounted () {
		this.notLogin = this.$route.name !== 'login'
	},
	computed: {}
}
</script>

<style lang="less">
@import './common/style/less/primary.less';
.common-container {
	&.loginPage .top-bar {
		display: none;
	}
	&.loginPage .main-content .router-box {
		padding-left: 0px;
	}
	&.otherPage {
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
		.main-content {
			&.hideSide .side-menu {
				width: 75px;
			}
			&.hideSide .router-box {
				padding-left: 90px;
			}
			&.hideSide .page-box {
				.el-pagination {
					left: -45px;
				}
			}
			.side-menu {
				position: fixed;
				top: 60px;
				bottom: 0px;
				z-index: 999;
				left: 0px;
				width: 200px;
				border-right: none;
				padding-right: 10px;
				-webkit-transition: width 0.3s ease-out;
				-moz-transition: width 0.3s ease-out;
				-ms-transition: width 0.3s ease-out;
				-o-transition: width 0.3s ease-out;
				transition: width 0.3s ease-out;
			}
			.router-box {
				padding-left: 215px;
				-webkit-transition: padding-left 0.3s ease-out;
				-moz-transition: padding-left 0.3s ease-out;
				-ms-transition: padding-left 0.3s ease-out;
				-o-transition: padding-left 0.3s ease-out;
				transition: padding-left 0.3s ease-out;
			}
			.page-box {
				.el-pagination {
					left: -107.5px;
					-webkit-transition: left 0.3s ease-out;
					-moz-transition: left 0.3s ease-out;
					-ms-transition: left 0.3s ease-out;
					-o-transition: left 0.3s ease-out;
					transition: left 0.3s ease-out;
				}
			}
		}
	}
}
</style>
