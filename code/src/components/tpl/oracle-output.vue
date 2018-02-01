<template>
		<el-form ref="oracle" :model="oracle" label-width="100px" :rules="rules" :inline="true" label-position="right">
				<el-form-item label="用户名" prop="username">
						<el-input v-model="oracle.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
						<el-input v-model="oracle.password"></el-input>
				</el-form-item>
				<el-form-item label="URL" prop="url">
						<el-autocomplete v-model="oracle.url" placeholder="对应的连接字符串"  :fetch-suggestions="querySearch" @select="handleSelect"></el-autocomplete>
				</el-form-item>
				<el-form-item label="SID" prop="database">
						<el-input v-model="oracle.database"></el-input>
				</el-form-item>
				<el-form-item label="表名" prop="table">
						<el-input v-model="oracle.table"></el-input>
				</el-form-item>
				<el-form-item label="特征值字段" prop="key">
						<el-input v-model="oracle.key"></el-input>
				</el-form-item>
				<el-form-item label="编码格式" prop="charset">
						<el-input v-model="oracle.charset" value="UTF-8"></el-input>
				</el-form-item>
		</el-form>
</template>

<script>
		export default {
				name: 'oracle-output',
				props: {
						oracle: Object
				},
				data () {
						return {
								rules: {
										username: [{required: true, message: '请输入数据库用户名', trigger: 'blur'}],
										password: [{required: true, message: '请输入数据库密码', trigger: 'blur'}],
										url: [{required: true, message: '请输入数据库地址URL', trigger: 'blur'}],
//										port: [{required: true, message: '请输入数据库地址端口号', trigger: 'blur'}],
										database: [{required: true, message: '请输入要导入的服务名', trigger: 'blur'}],
										table: [{required: true, message: '请输入要导入数据库的表名', trigger: 'blur'}],
										charset: [{required: true, message: '请输入编码格式、默认为:UTF-8', trigger: 'blur'}],
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
										{
												'value': 'jdbc:mysql://localhost:3306/test?serverTimezone=UTC&characterEncoding=utf8&useSSL=true',
												'address': 'oracleURL'
										},
										{'value': 'mysql', 'address': 'mysqlURL'},
										{'value': 'sqlserver', 'address': 'sqlserverURL'}
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
