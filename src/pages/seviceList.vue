<template>
	<div class="main-wrapper">
		<div class="toolbar">
			<div class="btn-box">
				<el-button type="text" @click="goConfig()">
					<i class="el-icon-plus"></i>
					新增服务配置
				</el-button>
			</div>
		</div>
		<!--<div class="btn-box">-->
		<!--<el-button type="primary" size="small">-->
		<!--<i class="el-icon-plus"></i>-->
		<!--新增配置服务-->
		<!--</el-button>-->
		<!--</div>-->
		<div class="common-condition-box">
			<el-form :inline="true">
				<el-form-item label="任务标识名称" prop="name">
					<el-input v-model="condition.identity"></el-input>
				</el-form-item>
				<el-form-item label="任务描述" prop="describe">
					<el-input v-model="condition.describe"></el-input>
				</el-form-item>
				<el-form-item label="任务状态">
					<el-select v-model="condition.status" :clearable="true">
						<el-option v-for="(item, index) in statusList" :key="index" :value="item.value" :label="item.label"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</div>
		<div class="table-box">
			<el-table :data="listData">
				<el-table-column label="任务标识名称" prop="identity"></el-table-column>
				<el-table-column label="任务描述" prop="desc"></el-table-column>
				<el-table-column label="任务状态" prop="configStatus"></el-table-column>
				<el-table-column label="运行间隔时间" prop="interval" width="120px"></el-table-column>
				<el-table-column label="操作" width="120px">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" :loading="scope.row.running" @click="start(scope.$index, scope.row)">{{scope.row.statusText}}</el-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="300px">
					<template slot-scope="scope">
						<el-button size="mini" type="danger" @click="stop(scope.$index, scope.row)">停止</el-button>
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
				<el-table-column label="数据">
					<template slot-scope="scope">
						<Pie :identity="scope.row.identity"></Pie>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import Api from '@/utils/api.js'
	import Pie from '@/components/pie'
	export default {
		name: 'seviceList',
		props: [],
		components: {Pie},
		data () {
			return {
				originData: [],
				condition: {
					identity: '',
					desc: '',
					status: ''
				},
				statusList: [
					{
						value: '1',
						label: '启动'
					},
					{
						value: '2',
						label: '停止'
					}
				]
			}
		},
		computed: {
			listData () {
				return this.originData.filter(item => {
					return (!this.condition.identity || item.identity.toUpperCase().indexOf(this.condition.identity.toUpperCase()) !== -1) && (!this.condition.describe || item.desc.toUpperCase().indexOf(this.condition.describe.toUpperCase()) !== -1) && (!this.condition.status || item.configStatusCode === this.condition.status)
				})
			}
		},
		methods: {
			goConfig (row) {
				row = row || {
					identity: '',
					configStatusCode: '2'
				}
				let params = {name: 'ContentView'}
				if (row.identity) {
					params.query = {
						identity: row.identity,
						configStatusCode: row.configStatusCode
					}
				}
				this.$router.push(params)
			},
			handleEdit (index, row) {
				this.goConfig(row)
			},
			handleDelete (index, row) {
				this.$confirm('将会永久删除该配置项，是否继续').then(() => {
					let params = {
						identity: row.identity
					}
					Api.post('deleteConfigAfter', params)
						.then(res => {
							if (res.code === 0) {
								this.$alert('删除成功')
								this.getMaskList()
							} else {
								this.$alert(res.message)
							}
						})
				})
			},
			getMaskList () {
				Api.get('findConfigs', {})
						.then(res => {
							if (res.code === 0) {
								console.log(res.data)
								this.originData = res.data.map(item => {
									let rel = JSON.parse(item)
									if (rel.configStatusCode === '1') {
										rel.running = true
										rel.statusText = '运行中...'
									} else {
										rel.running = false
										rel.statusText = '启动'
									}
									return rel
								})
							} else {
								this.alert(res.message)
							}
						})
			},
			start (index, row) {
				let params = {
					identity: row.identity,
					interval: row.interval,
					configStatusCode: '1',
					desc: row.desc
				}
				row.statusText = '启动中...'
				Api.post('mission', params).then(res => {
					if (res.code === 0) {
						row.running = true
						row.statusText = '运行中...'
						row.configStatus = '启动'
						row.configStatusCode = '1'
					} else {
						this.$alert(res.message)
						row.statusText = '启动'
					}
				}, err => {
					if (err) {
						this.$alert('连接超时')
						row.statusText = '启动'
					}
				})
			},
			stop (index, row) {
				let params = {
					identity: row.identity,
					interval: row.interval,
					configStatusCode: '2',
					desc: row.desc
				}
				Api.post('mission', params).then(res => {
					if (res.code === 0) {
						row.running = false
						row.statusText = '启动'
						row.configStatus = '停止'
						row.configStatusCode = '2'
					} else {
						this.$alert(res.message)
					}
				})
			}
		},
		created () {
		},
		mounted () {
			this.getMaskList()
		}
	}
</script>
<style lang="less" scoped>
	/*.btn-box {*/
	/*padding: 15px;*/
	/*}*/
</style>
