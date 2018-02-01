<template>
	<el-form ref="textInput" :model="textInput" label-width="100px" :rules="rules" label-position="right">
			<common-row>
					<common-col>
							<el-form-item label="偏移文件名" prop="offsetFile">
									<el-input v-model="textInput.offsetFile"></el-input>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="偏移量" prop="offset">
									<el-input v-model="textInput.offset"></el-input>
							</el-form-item>
					</common-col>

					<common-col>
							<el-form-item label="数据类型" prop="datatype">
									<el-select v-model="textInput.datatype" placeholder="请选择">
											<el-option label="TEXT" value="TEXT"></el-option>
											<el-option label="JSON" value="JSON"></el-option>
											<el-option label="XML" value="XML"></el-option>
									</el-select>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="数据分隔符" prop="separator">
									<el-input v-model="textInput.separator"></el-input>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="文件类型" prop="filetype">
									<el-select v-model="textInput.filetype" placeholder="请选择">
											<el-option label="TEXT" value="TEXT"></el-option>
											<el-option label="JSON" value="JSON"></el-option>
											<el-option label="XML" value="XML"></el-option>
									</el-select>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="输入目录" prop="filepath">
									<el-input v-model="textInput.filepath"></el-input>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="标识主键" prop="recordKeyCol">
									<el-input v-model="textInput.recordKeyCol"></el-input>
							</el-form-item>
					</common-col>
					<common-col>
							<el-form-item label="数据编码"  prop="charset">
									<el-select v-model="textInput.charset" placeholder="请选择数据库">
											<el-option label="GBK" value="GBK"></el-option>
											<el-option label="UTF-8" value="UTF8"></el-option>
									</el-select>
							</el-form-item>
					</common-col>
			</common-row>
	</el-form>
</template>

<script>
import commonRow from '@/common/components/common-row'
import commonCol from '@/common/components/common-col'
export default {
  name: 'text-input',
  props: {
    textInput: Object
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
								offsetFile: [{ required: true, message: '请输入偏移文件名', trigger: 'blur' }],
								recordKeyCol: [{ required: true, message: '请输入标识主键', trigger: 'blur' }],
								offset: [{ required: true, message: '请输入偏移量', trigger: 'blur' }]
      }
    }
  }
}
</script>
