<template>
	<div class="login" :style="loginIn" >
		<div class="login-header">
			<h1>通用数据传输平台</h1>
			<h5>GENERAL  ADTA  TRANSFER  PLATFORM</h5>
		</div>
		<div class="login-wrapper">
			<div class="login-background">

			</div>
			<div class="login-box" :style="loginBox">
				<h1 style="">用户登录</h1>
				<el-form>
					<el-form-item>
						<el-input v-model="login.user" suffix-icon="el-icon-mo-client"   placeholder="用户名" @keyup.native.enter="checkCode"></el-input>
					</el-form-item>
					<el-form-item>
						<el-input type="password" v-model="login.pwd" suffix-icon="el-icon-mo-lock"
								  @keyup.native.enter="checkCode"></el-input>
					</el-form-item>
					<el-form-item>
						<el-input v-model="login.codes" suffix-icon="el-icon-mo-insuranceCompanyfile"  class="verify"  placeholder="验证码" @keyup.native.enter="checkCode"></el-input>
						<img class="verifying" :src="codeSrc" @click="changeCode">
						<el-button type="primary" class="el-icon-refresh ref-in" @click="changeCode">换一换</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="checkCode">登录</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="login-footer">
			<p>CopyRight  JOINTOWN  Logistics&nbsp;&nbsp;2015-2017&nbsp;&nbsp;服务热线： 400800-4488转4978&nbsp;&nbsp;<i><img src="../assets/loginImages/icon_05.png" alt=""></i>
			</p>
		</div>
	</div>

</template>

<script>
	import Api from '@/utils/api'
	import runConfig from '@/utils/config'
	const validUrl = runConfig.runType === 'dev' ? '/api/' : '/conduit/config/'
	export default {
		name: 'login',
		props: [],
		components: {},
		data () {
			return {
				loginIn: null,
				loginWrapper: null,
				loginBox: null,
				codeSrc: validUrl + 'getImageCode?url=CodeImage&Time=' + Date.now(),
				login: {
					user: '',
					pwd: '',
					verify: '',
					codes: ''
				}
			}
		},
		computed: {},
		methods: {
			setStyle () {
				this.loginIn = {
					width: window.innerWidth + 'px',
					height: window.innerHeight + 'px'
				}
				this.loginBox = {

				}
			},
			checkCode () {
				if (!this.login.user) {
					this.$alert('请先输入用户名')
					return false
				}
				if (!this.login.pwd) {
					this.$alert('请先输入密码')
					return false
				}
				if (!this.login.codes) {
					this.$alert('请先输入验证码')
					return false
				}
				let params = {
					url: 'CheckCodeImage',
					Code: this.login.codes
				}
				Api.post('getImageCode', params)
					.then(res => {
						if (res !== 'True') {
							this.$alert('验证码错误')
							this.login.codes = ''
							this.changeCode()
							return false
						}
						this.Login()
					})
			},
			Login () {
				let params = {
					url: 'SsoLogin',
					UserName: this.login.user,
					Password: this.login.pwd,
					ImageCode: this.login.codes
				}
				Api.post('getImageCode', params)
					.then(res => {
						if (res === 'True') {
							this.setCookie('user', this.login.user, 30)
							this.setCookie('pwd', this.login.pwd, 30)
							this.$router.push('/ContentView')
						} else {
							this.$alert('用户名或密码错误')
						}
					})
			},
			changeCode () {
				this.codeSrc = validUrl + 'getImageCode?url=CodeImage&Time=' + Date.now()
			}
		},
		created () {
		},
		mounted () {
			this.setStyle()
			window.onresize = this.setStyle
//			this.getCheckCode()
		}
	}
</script>
<style lang="less">
	.login {
		/*overflow: hidden;*/
		display: flex;
		flex-flow: column;
		.login-header {
			position: fixed;
			z-index: 99;
			top:0px;
			height: 50px;
			padding-left: 36px;
			width: 100%;
			background-color: #fff;
			padding-top: 12px;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			overflow: hidden;
			h1, h5 {
				padding: 0;
				margin: 0px;
				color: #2273b4;
			}
			h1 {
				font-size: 20px;
				margin-bottom: 2px;
				letter-spacing: 3px;
			}
			h5 {
				font-size: 10px;
			}
		}
		.login-wrapper {
			position: relative;
			display: flex;
			flex: 1;
			background-color: #0b44b6;
			background-color: #75b9e6;
			margin-top: 60px;
			margin-bottom: 28px;
			width: 100%;
			overflow: hidden;
			.login-background {
				background: url("../../static/image/bg-1.png") no-repeat 124px 0px;
				background-size: 100% 100%;
				width: 100%;
				margin-right: 515px;
			}
			.login-box {
				position: absolute;
				width: 515px;
				transform: translate(0px, -64%);
				min-height: 300px;
				padding: 0px 134px 0px 62px;
				margin: 0px auto;
				top:50%;
				right: 0;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				h1 {
					color: #f3f3f3;
					font-weight: normal;
					height: 50px;
					line-height: 50px;
					border-bottom: 1px solid #fff;
					margin-bottom: 10px;
				}
				.el-form-item {
					margin-bottom: 10px;
					.el-input {
						height: 36px;
						line-height: 36px;
						input.el-input__inner {
							position: relative;
							height: 34px;
							line-height: 34px;
							border: 1px solid rgba(255, 255, 255, 0.1);
							/*background: rgba(0, 0, 0, 0.1);*/
							color:#6e6c77;
							font-size: 14px;
							padding: 0px 20px;
						}
						input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
							-webkit-box-shadow: 0 0 0 1000px transparent inset;
						}
						.el-input__prefix {
							color: #6e6c77;
						}
					}
					.el-button {
						width: 100%;
						height: 38px;
						background-color: #f0ac09;
						border: 1px solid #f0ac09;
						color: #fff;
						font-size: 14px;
						letter-spacing: 20px;
						/*word-spacing: 60px;*/

					}
					.verify {
						width: 130px;
						background-color: #fff;
						border: 0;
						float: left;
					}
					.verifying {
						width: 98px;
						color: #6e6c77;
						background-color: #fff;
						display: inline-block;
						height: 36px;
						float: left;
						line-height: 50px;
						text-align: center;
						margin: 0px 12px;
					}
					.ref-in {
						background-color: #75b9e6;
						border: 0;
						width: 62px;
						height: 38px;
						float: right;
						padding: 0px;
						margin-right: 4px;
						letter-spacing: 0px;

					}
				}
			}
		}
		.login-footer {
			background-color: #fff;
			z-index: 100;
			position: fixed;
			bottom: 0px;
			width: 100%;
			height: 28px;
			p {
				vertical-align: middle;
				padding: 0;
				margin: 0;
				height: 100%;
				line-height: 28px;
				text-align: center;
				font-size: 14px;
				color: #2273b4;
				i {
					height: 28px;
					display: inline-block;
					width: 80px;
					img {
						width: 100%;
						vertical-align: middle;
					}
				}
			}
		}
		.el-icon-mo-lock {
			font-weight: 600;
		}
	}
</style>
