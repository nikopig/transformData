<template>
	<el-form ref="sqlserver" :model="sqlserver" :rules="rules" label-width="80px">
		<el-form-item label="用户名" prop="username">
			<el-input v-model="sqlserver.username"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="sqlserver.password"></el-input>
		</el-form-item>
		<el-form-item label="IP" prop="url">
			<el-input v-model="sqlserver.url"></el-input>
		</el-form-item>
		<el-form-item label="端口" prop="port">
			<el-input v-model="sqlserver.port"></el-input>
		</el-form-item>
		<el-form-item label="数据库" prop="database">
			<el-input v-model="sqlserver.database"></el-input>
		</el-form-item>
		<el-form-item label="表名" prop="table">
			<el-input v-model="sqlserver.table"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
	/* eslint-disable indent */

	export default {
		name: 'sqlserver-output',
		props: {
			sqlserver: Object
		},
		data () {
			return {
				rules: {
					username: [{ required: true, message: '请输入数据库用户名', trigger: 'blur' }],
					password: [{ required: true, message: '请输入数据库密码', trigger: 'blur' }],
					url: [{ required: true, message: '请输入数据库地址URL', trigger: 'blur' }],
					port: [{ required: true, message: '请输入数据库地址端口号', trigger: 'blur' }],
					database: [{ required: true, message: '请输入要导入的数据库', trigger: 'blur' }],
					table: [{ required: true, message: '请输入要导入数据库的表名', trigger: 'blur' }]
				}
			}
		}
	}
</script>
