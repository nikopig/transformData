<template>
		<el-form ref="restInput" :model="restInput" label-width="100px" :rules="rules" label-position="right">
				<common-row>
						<common-col>
								<el-form-item label="偏移量" prop="offset">
										<el-input v-model="restInput.offset"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="返回数据编码" prop="backCharset">
										<el-select v-model="restInput.backCharset" placeholder="请选择">
												<el-option label="GBK" value="GBK"></el-option>
												<el-option label="UTF8" value="UTF8"></el-option>
										</el-select>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="数据类型" prop="datatype">
										<el-select v-model="restInput.datatype" placeholder="请选择">
												<el-option label="TEXT" value="TEXT"></el-option>
												<el-option label="JSON" value="JSON"></el-option>
												<el-option label="XML" value="XML"></el-option>
										</el-select>
								</el-form-item>
						</common-col>
						<common-col v-if="restInput.datatype !== 'JSON'">
								<el-form-item label="数据分隔符" prop="separator">
										<el-input v-model="restInput.separator"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="URL" prop="url">
										<el-input v-model="restInput.url"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="隐示参数及值" prop="implicit">
										<el-input v-model="restInput.implicit"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="标识主键" prop="recordKeyCol">
										<el-input v-model="restInput.recordKeyCol"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="数据编码" prop="charset">
										<el-select v-model="restInput.charset" placeholder="请选择编码方式">
												<el-option label="GBK" value="GBK"></el-option>
												<el-option label="UTF8" value="UTF8"></el-option>
										</el-select>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="时间戳字段" prop="timeParam">
										<el-input v-model="restInput.timeParam"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
							<el-form-item label="请求方式" prop="request">
								<el-select v-model="restInput.request" placeholder="请选择请求方式">
									<el-option label="POST" value="POST"></el-option>
									<el-option label="GET" value="GET"></el-option>
								</el-select>
							</el-form-item>
						</common-col>
						<common-col :lot="4">
							<el-form-item label="输入源字段" prop="cols">
								<el-input type="textarea" v-model="restInput.cols"></el-input>
							</el-form-item>
						</common-col>
				</common-row>
		</el-form>
</template>

<script>
		import commonRow from '@/common/components/common-row'
		import commonCol from '@/common/components/common-col'
		export default {
				name: 'rest-input',
				props: {
						restInput: Object
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
										recordKeyCol: [{required: true, message: '请输入标识主键', trigger: 'blur'}],
										offset: [{required: true, message: '请输入偏移量', trigger: 'blur'}]
								}
						}
				}
		}
</script>
