<template>
  <div class="login-wrapper" :style="loginWrapper">
				<div class="login-box" :style="loginBox">
						<h1 style="">用户登录</h1>
						<el-form>
								<el-form-item>
										<el-input v-model="login.user" prefix-icon="el-icon-mo-client"></el-input>
								</el-form-item>
								<el-form-item>
										<el-input type="password" v-model="login.pwd" prefix-icon="el-icon-mo-lock" @keyup.native.enter="Login"></el-input>
								</el-form-item>
								<el-form-item>
										<el-button type="primary" @click="Login">登录</el-button>
								</el-form-item>
						</el-form>
				</div>
  </div>
</template>

<script>
		import Api from '@/utils/api'
  export default {
    name: 'login',
    props: [],
    components: {},
    data () {
      return {
								loginWrapper: null,
								loginBox: null,
								login: {
										user: '',
										pwd: ''
								}
						}
    },
    computed: {},
    methods: {
    		setStyle () {
								this.loginWrapper = {
										width: window.innerWidth + 'px',
										height: window.innerHeight + 'px'
								}
								this.loginBox = {
										top: ((window.innerHeight / 2) - 190) + 'px'
								}
						},
						Login () {
    				console.log(111)
    				let params = {
										userName: this.login.user,
										password: this.login.pwd
								}
								Api.post('login', params)
										.then(res => {
												if (res.code === 0) {
														this.setCookie('user', this.login.user, 30)
														this.setCookie('pwd', this.login.pwd, 30)
														this.$router.push('/ContentView')
												} else {
														this.$alert(res.message)
												}
										})
						}
				},
    created () {
    },
    mounted () {
						this.setStyle()
						window.onresize = this.setStyle
    }
  }
</script>
<style lang="less">
		.login-wrapper {
				/*background-color: #0b44b6;*/
				background: url("../../static/image/bg-1.png") no-repeat center;
				background-size: 100% 100%;
				background-color: #75b9e6;
				.login-box {
						top: 5.5px;
						width: 450px;
						min-height: 300px;
						padding: 35px;
						margin: 0px auto;
						position: relative;
						left: 0px;
						-webkit-box-sizing: border-box;
						-moz-box-sizing: border-box;
						box-sizing: border-box;
						h1 {
								color: #f3f3f3;
								font-weight: normal;
								text-align: center;
						}
						.el-input {
								height: 50px;
								line-height: 50px;
								input.el-input__inner {
										height: 48px;
										line-height: 48px;
										border: 1px solid rgba(255, 255, 255, 0.1);
										background: rgba(0, 0, 0, 0.1);
										color: #fff;
										font-size: 14px;
										padding-left: 42px;
								}
								input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
										-webkit-box-shadow: 0 0 0 1000px transparent inset;
								}
								.el-input__prefix {
										color: #fff;
								}
						}
						.el-button {
								width: 100%;
								background-color: #f0ac09;
								border: 1px solid #f0ac09;
								color: #fff;
								font-size: 14px;
								/*word-spacing: 60px;*/
								letter-spacing: 20px;
						}
				}
		}
		.el-icon-mo-lock {
				font-weight: 600;
		}
</style>
