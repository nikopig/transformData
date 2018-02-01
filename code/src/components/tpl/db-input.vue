<template>
		<el-form ref="db" :model="db" label-width="100px" :rules="rules" :inline="true" label-position="right">
				<el-form-item label="数据库类型" prop="db_type">
						<el-select v-model="db.db_type" placeholder="请选择数据库">
								<el-option label="mysql" value="mysql"></el-option>
								<el-option label="sqlserver" value="sqlserver"></el-option>
						</el-select>
				</el-form-item>
				<el-form-item label="用户名" prop="username">
						<el-input v-model="db.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
						<el-input v-model="db.password"></el-input>
				</el-form-item>
				<el-form-item label="URL" prop="url">
						<el-autocomplete v-model="db.url" placeholder="对应的连接字符串"  :fetch-suggestions="querySearch" @select="handleSelect"></el-autocomplete>
				</el-form-item>
				<el-form-item label="服务名" prop="database">
						<el-input v-model="db.database"></el-input>
				</el-form-item>
				<el-form-item label="表名" prop="table">
						<el-input v-model="db.table"></el-input>
				</el-form-item>
				<el-form-item label="查询SQL" prop="sql">
						<el-input v-model="db.sql"></el-input>
				</el-form-item>
		</el-form>
</template>

<script>
		export default {
				name: 'db-input',
				props: {
						db: Object
				},
				data () {
						return {
								rules: {
										db_type: [{required: true, message: '请选择数据库类型', trigger: 'blur'}],
										username: [{required: true, message: '请输入数据库用户名', trigger: 'blur'}],
										password: [{required: true, message: '请输入数据库密码', trigger: 'blur'}],
										url: [{required: true, message: '请输入数据库地址URL', trigger: 'blur'}],
										port: [{required: true, message: '请输入数据库地址端口号', trigger: 'blur'}],
										database: [{required: true, message: '请输入数据库服务名', trigger: 'blur'}],
										table: [{required: true, message: '请输入数据库表名', trigger: 'blur'}],
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
										{'value': 'jdbc:mysql://localhost:3306/supermarket?serverTimezone=UTC&characterEncoding=utf8&useSSL=true'},
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
