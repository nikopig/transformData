<template>
		<el-form ref="db" :model="db" label-width="100px" :rules="rules" label-position="right">
				<common-row>
						<common-col>
								<el-form-item label="表名" prop="table">
										<el-input v-model="db.table"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="表主键字段" prop="key">
										<el-input v-model="db.key"></el-input>
								</el-form-item>
						</common-col>
						<common-col :lot="2">
								<el-form-item label="URL" prop="url">
										<el-input v-model="db.url" placeholder="对应的连接字符串"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="用户名" prop="username">
										<el-input v-model="db.username"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="密码" prop="password">
										<el-input v-model="db.password"></el-input>
								</el-form-item>
						</common-col>
						<common-col :lot="4">
								<el-form-item label="输出源字段" prop="cols">
										<el-input type="textarea" v-model="db.cols"></el-input>
								</el-form-item>
						</common-col>
				</common-row>
		</el-form>
</template>
<script>
		import commonRow from '@/common/components/common-row'
		import commonCol from '@/common/components/common-col'
		export default {
				name: 'db-output',
				props: {
						db: Object
				},
				components: {commonRow, commonCol},
				data () {
						return {
								rules: {
										db_type: [{required: true, message: '请选择数据库类型', trigger: 'blur'}],
										username: [{required: true, message: '请输入数据库用户名', trigger: 'blur'}],
										password: [{required: true, message: '请输入数据库密码', trigger: 'blur'}],
										url: [{required: true, message: '请输入数据库地址URL', trigger: 'blur'}],
										port: [{required: true, message: '请输入数据库地址端口号', trigger: 'blur'}],
										database: [{required: true, message: '请输入要导入的服务名', trigger: 'blur'}],
										table: [{required: true, message: '请输入要导入数据库的表名', trigger: 'blur'}],
										key: [{required: true, message: '请输入表主键字段', trigger: 'blur'}],
										charset: [{required: true, message: '请输入编码格式', trigger: 'blur'}],
										restaurants: []
								}
						}
				},
				methods: {
						querySearch (queryString, cb) {
								var restaurants = this.restaurants
								var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
								// 调用 callback 返回建议列表的数据
								cb(results)
						},
						createFilter (queryString) {
								return (restaurant) => {
										return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
								}
						},
						loadAll () {
								return [
										{'value': 'jdbc:mysql://IP地址:端口/服务名?serverTimezone=UTC&characterEncoding=utf8&useSSL=true'},
										{'value': 'jdbc:sqlserver://IP地址:端口;DatabaseName=服务名'},
										{'value': 'jdbc:oracle:thin:@IP地址:端口:服务名'}
								]
						},
						handleSelect (item) {
								console.log(item)
						}
				},
				mounted () {
						this.restaurants = this.loadAll()
				}
		}
</script>
