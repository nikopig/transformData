<template>
	<el-form ref="textOutput" :model="textOutput" label-width="100px" :rules="rules" label-position="right">
			<common-row>
					<common-col>
							<el-form-item label="数据类型" prop="datatype">
									<el-select v-model="textOutput.datatype" placeholder="请选择">
											<el-option label="TEXT" value="TEXT"></el-option>
											<el-option label="JSON" value="JSON"></el-option>
											<el-option label="XML" value="XML"></el-option>
									</el-select>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="数据分隔符" prop="separator">
									<el-input v-model="textOutput.separator"></el-input>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="输出目录" prop="filepath">
									<el-input v-model="textOutput.filepath"></el-input>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="URL" prop="url">
									<el-autocomplete v-model="textOutput.url" placeholder="对应的连接字符串"></el-autocomplete>
							</el-form-item>
					</common-col>
			</common-row>
		<!--<el-form-item label="字段及默认值" prop="defField">-->
			    <!--<el-input type="textarea" v-model="textOutput.defField" placeholder="col1:v1,col2:v2,col3:v3"></el-input>-->
	  	<!--</el-form-item>-->
	</el-form>
</template>

<script>
import commonRow from '@/common/components/common-row'
import commonCol from '@/common/components/common-col'
export default {
  name: 'text-output',
  props: {
    textOutput: Object
  },
		components: {commonRow, commonCol},
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
