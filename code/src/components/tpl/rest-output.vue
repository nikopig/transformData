<template>
	<el-form ref="restOutput" :model="restOutput" label-width="100px" :rules="rules" :inline="true" label-position="right">
		<el-form-item label="URL地址" prop="url">
			<el-input v-model="restOutput.url"></el-input>
		</el-form-item>
		<el-form-item label="文件类型" prop="datatype">
			<el-select v-model="restOutput.datatype" placeholder="请选择">
				<el-option label="text" value="text"></el-option>
				<el-option label="json" value="json"></el-option>
				<el-option label="xml" value="xml"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="是否为一行输出" prop="multi">
			<el-select v-model="restOutput.multi" placeholder="请选择">
				<el-option label="是" :value="true"></el-option>
				<el-option label="否" :value="false"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="数据分隔符" prop="separator">
			<el-input v-model="restOutput.separator"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
  name: 'rest-output',
  props: {
    restOutput: Object
  },
  data () {
    return {
      rules: {
        url: [{ required: true, message: '请输入URL地址', trigger: 'blur' }],
        datatype: [
          { required: true, message: '请选择数据类型json,text,xml', trigger: 'blur' }
        ],
        separator: [{ required: true, message: '请输入数据分割符', trigger: 'blur' }],
        multi: [{ required: true, message: '请选择是否为一行输出', trigger: 'blur' }]
      }
    }
  }
}
</script>
