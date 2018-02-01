<template>
  <div class="main-wrapper">
				<el-table :data="listData">
						<el-table-column label="失败记录" prop="failRecord"></el-table-column>
						<el-table-column label="失败原因" prop="expcause"></el-table-column>
						<el-table-column label="对应任务名" prop="identity"></el-table-column>
						<el-table-column label="处理结果" prop="result"></el-table-column>
						<el-table-column label="操作">
								<template slot-scope="scope">
										<el-button
																		size="mini"
																		@click="handleDeal(scope.$index, scope.row)">重新处理</el-button>
								</template>
						</el-table-column>
				</el-table>
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
								listData: []
						}
    },
    computed: {},
    methods: {
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
														this.listData = res.data.map(item => JSON.parse(item))
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
