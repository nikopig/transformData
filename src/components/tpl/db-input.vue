<template>
		<el-form ref="db" :model="db" :rules="rules">
				<common-row>
						<common-col>
								<el-form-item label="查询字段">
										<el-input v-model="db.field"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="偏移量">
										<el-input v-model="db.offset"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="标识主键" prop="recordKeyCol">
										<el-input v-model="db.recordKeyCol"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="数据编码" prop="charset">
										<el-select v-model="db.charset" placeholder="请选择编码方式">
												<el-option label="GBK" value="GBK"></el-option>
												<el-option label="UTF-8" value="UTF8"></el-option>
										</el-select>
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
								<el-form-item label="SQL" prop="sql">
										<el-input type="textarea" v-model="db.sql"></el-input>
								</el-form-item>
						</common-col>
						<common-col :lot="4">
								<el-form-item label="输入源字段" prop="cols">
										<el-input type="textarea" v-model="db.cols"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="修改表名" prop="modifyTable">
										<el-input v-model="db.modifyTable"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="条件字段" prop="modifyWhereCol">
										<el-input v-model="db.modifyWhereCol"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="修改字段" prop="modifyCol">
										<el-input v-model="db.modifyCol"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="修改后值" prop="modifyColValue">
										<el-input v-model="db.modifyColValue"></el-input>
								</el-form-item>
						</common-col>
				</common-row>
				<!--
				<el-form-item label="服务名" prop="database">
						<el-input v-model="db.database"></el-input>
				</el-form-item>
				<el-form-item label="表名" prop="table">
						<el-input v-model="db.table"></el-input>
				</el-form-item>
				<el-form-item label="查询SQL" prop="sql">
						<el-input v-model="db.sql"></el-input>
				</el-form-item>
				-->

		</el-form>
</template>

<script>
		import commonRow from '@/common/components/common-row'
		import commonCol from '@/common/components/common-col'
		export default {
				name: 'db-input',
				components: {commonRow, commonCol},
				props: {
						db: Object
				},
				data () {
						return {
								rules: {
										username: [{required: true, message: '请输入数据库用户名', trigger: 'blur'}],
										password: [{required: true, message: '请输入数据库密码', trigger: 'blur'}],
										url: [{required: true, message: '请输入数据库地址URL', trigger: 'blur'}],
										sql: [{required: true, message: '请输入sql语句', trigger: 'blur'}],
										port: [{required: true, message: '请输入数据库地址端口号', trigger: 'blur'}],
										database: [{required: true, message: '请输入数据库服务名', trigger: 'blur'}],
										recordKeyCol: [{required: true, message: '请输入标识主键', trigger: 'blur'}],
										table: [{required: true, message: '请输入数据库表名', trigger: 'blur'}],
										field: [{required: true, message: '请输入查询字段', trigger: 'blur'}],
										offset: [{required: true, message: '请输入偏移量', trigger: 'blur'}],
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
