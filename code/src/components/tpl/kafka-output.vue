<template>
	<el-form ref="kafkaOutput" :model="kafkaOutput" label-width="100px" :rules="rules" :inline="true" label-position="right">
		<el-form-item label="URL地址" prop="url">
			<el-input v-model="kafkaOutput.url"></el-input>
		</el-form-item>
		<el-form-item label="主题" prop="topic">
			<el-input v-model="kafkaOutput.topic"></el-input>
		</el-form-item>
		<el-form-item label="分组" prop="groupid">
			<el-input v-model="kafkaOutput.groupid"></el-input>
		</el-form-item>
		<el-form-item label="文件类型" prop="datatype">
			<el-select v-model="kafkaOutput.datatype" placeholder="请选择">
				<el-option label="text" value="text"></el-option>
				<el-option label="json" value="json"></el-option>
				<el-option label="xml" value="xml"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="数据分隔符" prop="separator">
			<el-input v-model="kafkaOutput.separator"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
  name: 'kafka-output',
  props: {
    kafkaOutput: Object
  },
  data () {
    return {
      rules: {
        url: [{ required: true, message: '请输入URL地址', trigger: 'blur' }],
        topic: [{ required: true, message: '请输入主题', trigger: 'blur' }],
        datatype: [
          { required: true, message: '请选择数据类型json,text,xml', trigger: 'blur' }
        ],
        separator: [{ required: true, message: '请输入数据分割符', trigger: 'blur' }],
        groupid: [{ required: true, message: '请输入分组', trigger: 'blur' }]
      }
    }
  }
}
</script>
