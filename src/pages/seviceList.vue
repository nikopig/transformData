<template>
  <div class="main-wrapper">
				<div class="toolbar">
						<div class="btn-box">
								<el-button type="text" @click="goConfig(null)">
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
				<div class="table-box">
						<el-table :data="listData">
								<el-table-column label="任务标识名称" prop="identity"></el-table-column>
								<el-table-column label="任务状态" prop="configStatus"></el-table-column>
								<el-table-column label="运行间隔时间" prop="interval"></el-table-column>
								<el-table-column label="操作">
										<template slot-scope="scope">
												<el-button
																				size="mini"
																				@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
												<el-button
																				size="mini"
																				type="danger"
																				@click="handleDelete(scope.$index, scope.row)">删除</el-button>
										</template>
								</el-table-column>
						</el-table>
				</div>
  </div>
</template>

<script>
		import Api from '@/utils/api.js'
  export default {
    name: 'seviceList',
    props: [],
    components: {},
    data () {
      return {
      		listData: []
						}
    },
    computed: {},
    methods: {
						goConfig (identity) {
								console.log(identity)
								let params = {name: 'ContentView'}
								if (identity) {
										params.query = {
												identity: identity
										}
								}
								this.$router.push(params)
						},
						handleEdit (index, row) {
								this.goConfig(row.identity)
						},
						handleDelete (index, row) {
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
						},
						getMaskList () {
								Api.get('findConfigs', {})
										.then(res => {
												if (res.code === 0) {
														console.log(res.data)
														this.listData = res.data.map(item => {
																return JSON.parse(item)
														})
														console.log(this.listData)
												} else {
														this.alert(res.message)
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
