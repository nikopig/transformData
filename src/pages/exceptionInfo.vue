<template>
  <div class="exception main-wrapper">
				<div class="common-condition-box">
						<el-form :model="form">
								<el-form-item label="时期">
										<el-date-picker v-model="form.date" @change="getException"></el-date-picker>
								</el-form-item>
						</el-form>
				</div>

				<el-card>
						<div slot="header">异常信息</div>
						{{errorInfo}}
				</el-card>
  </div>
</template>

<script>
		import Api from '@/utils/api.js'
		import {DateFtt} from '@/utils/utils.js'
  export default {
    name: 'exceptionInfo',
    props: [],
    components: {},
    data () {
      return {
      		form: {
      				date: new Date()
								},
								errorInfo: ''
						}
    },
    computed: {},
    methods: {
					getException () {
							let params = {
									timeStr: DateFtt('yyyy-MM-dd', this.form.date)
							}
							Api.post('getRunLogInfo', params)
									.then(res => {
											if (res.code === 0) {
													this.errorInfo = res.data
											} else {
													this.$alert(res.message)
											}
									})
					}
				},
    created () {
    },
    mounted () {
    		this.getException()
    }
  }
</script>
<style lang="less">
		.exception {
				.el-card__body {
						min-height: 200px;
				}
		}
</style>
