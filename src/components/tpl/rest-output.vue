<template>
		<el-form ref="restOutput" :model="restOutput" label-width="100px" :rules="rules" label-position="right">
				<common-row>
						<common-col>
								<el-form-item label="数据类型" prop="datatype">
										<el-select v-model="restOutput.datatype" placeholder="请选择">
												<el-option label="TEXT" value="TEXT"></el-option>
												<el-option label="JSON" value="JSON"></el-option>
												<el-option label="XML" value="XML"></el-option>
										</el-select>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="数据分隔符" prop="separator">
										<el-input v-model="restOutput.separator"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="数据参数名" prop="dataParam">
										<el-input v-model="restOutput.dataParam"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="时间戳字段" prop="timeParam">
										<el-input v-model="restOutput.timeParam"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="隐示参数及值" prop="implicit">
										<el-input v-model="restOutput.implicit"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="URL" prop="url">
										<el-input v-model="restOutput.url"></el-input>
								</el-form-item>
						</common-col>
				</common-row>


				<!--<el-form-item label="字段及默认值" prop="defField">-->
				<!--<el-input type="textarea" v-model="restOutput.defField" placeholder="col1:v1,col2:v2,col3:v3"></el-input>-->
				<!--</el-form-item>-->
				<!--
    <el-form-item label="是否为一行输出" prop="multi">
     <el-select v-model="restOutput.multi" placeholder="请选择">
      <el-option label="是" :value="true"></el-option>
      <el-option label="否" :value="false"></el-option>
     </el-select>
    </el-form-item>
    -->
		</el-form>
</template>

<script>
		import commonRow from '@/common/components/common-row'
		import commonCol from '@/common/components/common-col'
		export default {
				name: 'rest-output',
				props: {
						restOutput: Object
				},
				components: {commonRow, commonCol},
				data () {
						return {
								rules: {
										url: [{required: true, message: '请输入URL地址', trigger: 'blur'}],
										datatype: [
												{required: true, message: '请选择数据类型json,text,xml', trigger: 'blur'}
										],
										separator: [{required: true, message: '请输入数据分割符', trigger: 'blur'}],
//										dataParam: [{required: true, message: '请输入数据参数名', trigger: 'blur'}],
//										timeParam: [{required: true, message: '请输入时间戳字段', trigger: 'blur'}],
//										implicit: [{required: true, message: '请输入隐示参数及值', trigger: 'blur'}],
										multi: [{required: true, message: '请选择是否为一行输出', trigger: 'blur'}]
								}
						}
				}
		}
</script>
