<template>
	<el-form ref="textOutput" :model="textOutput" label-width="100px" :rules="rules" :inline="true" label-position="right">
		<el-form-item label="文件类型" prop="datatype">
			<el-select v-model="textOutput.datatype" placeholder="请选择">
				<el-option label="text" value="text"></el-option>
				<el-option label="json" value="json"></el-option>
				<el-option label="xml" value="xml"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="文件路径" prop="filepath">
			<el-input v-model="textOutput.filepath"></el-input>
		</el-form-item>
		<el-form-item label="数据分隔符" prop="separator">
			<el-input v-model="textOutput.separator"></el-input>
		</el-form-item>
		<el-form-item label="保存文件名" prop="filename">
			<el-input v-model="textOutput.filename"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
  name: 'text-output',
  props: {
    textOutput: Object
  },
  data () {
    return {
      rules: {
        filepath: [{ required: true, message: '请输入本地文件完整路径', trigger: 'blur' }],
        datatype: [
          { required: true, message: '请选择数据类型json,text,xml', trigger: 'blur' }
        ],
        separator: [{ required: true, message: '请输入数据分割符', trigger: 'blur' }],
        filename: [{ required: true, message: '请输入保存文件名', trigger: 'blur' }]
      }
    }
  }
}
</script>
