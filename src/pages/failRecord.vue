<template>
	<div class="main-wrapper">
		<div class="common-condition-box">
			<el-form :inline="true">
				<el-form-item label="失败记录">
					<el-input v-model="form.failRecord"></el-input>
				</el-form-item>
				<el-form-item label="失败原因">
					<el-input v-model="form.expcause"></el-input>
				</el-form-item>
				<el-form-item label="任务名">
					<el-input v-model="form.identity"></el-input>
				</el-form-item>
				<el-form-item label="起止时间">
					<el-date-picker
							v-model="form.time"
							type="datetimerange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
			</el-form>
		</div>
		<el-table :data="pageData">
			<el-table-column label="失败记录" prop="shortFailRecord"></el-table-column>
			<el-table-column label="记录时间" prop="occurredTime"></el-table-column>
			<el-table-column label="失败原因" prop="expcause"></el-table-column>
			<el-table-column label="对应任务名" prop="identity" width="150px"></el-table-column>
			<el-table-column label="处理结果" prop="result" width="100px"></el-table-column>
			<el-table-column label="操作" width="100px">
				<template slot-scope="scope">
					<el-button
							size="mini"
							@click="handleDeal(scope.$index, scope.row)">重新处理
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="page-box">
			<el-pagination
				background
				layout="prev, pager, next"
				:total="pages.total"
				:current-page.sync="pages.currentPage"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import Api from '@/utils/api.js'

	export default {
		name: 'failRecord',
		props: [],
		components: {},
		data () {
			return {
				listData: [],
				form: {
					failRecord: '',
					expcause: '',
					identity: '',
					time: ''
				},
				pages: {
					currentPage: 1,
					pageSize: 10,
					total: 10
				}
			}
		},
		computed: {
			realData () {
				let rel = this.listData.filter((item) => {
					let rel = (!this.form.failRecord || this.form.failRecord === item.failRecord) && (!this.form.expcause || this.form.expcause === item.expcause) && (!this.form.identity || this.form.identity === item.identity)
					if (!this.form.time) {
						return rel
					} else {
						let startTime = new Date(this.form.time[0]).valueOf()
						let endTime = new Date(this.form.time[1]).valueOf()
						let currentTime = new Date(item.occurredTime).valueOf()
						let timeFlag = (currentTime >= startTime && currentTime <= endTime)
						return rel && timeFlag
					}
				})
				this.pages.total = rel.length
				return rel
			},
			pageData () {
				return this.getPageData(this.realData, this.pages.currentPage, this.pages.pageSize)
			}
		},
		methods: {
			getPageData (arr, currentPage, pageSize) {
				let startIndex = (currentPage - 1) * pageSize
				let endIndex = currentPage * pageSize
				return arr.slice(startIndex, endIndex)
			},
			handleDeal (index, row) {
				let params = {
					identity: row.identity,
					record: row.failRecord
				}
				Api.post('dealErrorRecord', params)
					.then(res => {
						if (res.code === 0) {
							this.$set(row, 'result', '成功')
						} else if (res.code === -1) {
							this.$set(row, 'result', '失败')
						}
					})
			},
			getData () {
				Api.get('getErrorInfoList', {})
					.then(res => {
						if (res.code === 0) {
							this.listData = res.data.map(item => {
								let rel = JSON.parse(item)
								rel.shortFailRecord = rel.failRecord.substr(0, 100)
								return rel
							}).sort((a, b) => {
								return new Date(b.occurredTime).valueOf() - new Date(a.occurredTime).valueOf()
							})
						} else {
							this.$alert(res.message)
						}
					})
			}
		},
		created () {
		},
		mounted () {
			this.getData()
		}
	}
</script>
<style lang="less" scoped>
</style>
