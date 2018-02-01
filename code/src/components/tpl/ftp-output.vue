<template>
	<el-form ref="ftpOutput" :model="ftpOutput" label-width="100px" :rules="rules" :inline="true" label-position="right">
		<el-form-item label="用户名" prop="username">
			<el-input v-model="ftpOutput.username"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="ftpOutput.password"></el-input>
		</el-form-item>
		<el-form-item label="IP" prop="url">
			<el-input v-model="ftpOutput.url"></el-input>
		</el-form-item>
		<el-form-item label="端口" prop="port">
			<el-input v-model="ftpOutput.port"></el-input>
		</el-form-item>
		<el-form-item label="文件夹所在目录" prop="dir">
			<el-input v-model="ftpOutput.dir"></el-input>
		</el-form-item>
		<el-form-item label="数据类型" prop="datatype">
			<el-select v-model="ftpOutput.datatype" placeholder="请选择">
				<el-option label="text" value="text"></el-option>
				<el-option label="json" value="json"></el-option>
				<el-option label="xml" value="xml"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="数据分隔符" prop="separator">
			<el-input v-model="ftpOutput.separator"></el-input>
		</el-form-item>
		<el-form-item label="保存文件名" prop="filename">
			<el-input v-model="ftpOutput.filename"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
  name: 'ftp-output',
  props: {
    ftpOutput: Object
  },
  data () {
    return {
      rules: {
        username: [{ required: true, message: '请输入FTP用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入FTP密码', trigger: 'blur' }],
        url: [{ required: true, message: '请输入FTP地址URL', trigger: 'blur' }],
        port: [{ required: true, message: '请输入FTP地址端口号', trigger: 'blur' }],
        dir: [{ required: true, message: '请输入保存文件目录', trigger: 'blur' }],
        datatype: [{ required: true, message: '请输入保存文件类型', trigger: 'blur' }],
        separator: [{ required: true, message: '请输入数据分隔符', trigger: 'blur' }],
        filename: [{ required: true, message: '请输入保存文件名', trigger: 'blur' }]
      }
    }
  }
}
</script>
