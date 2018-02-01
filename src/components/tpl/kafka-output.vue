<template>
		<el-form ref="output_kafka" :model="kafkaOutput" label-width="100px" label-position="right">
				<common-row>
						<common-col>
								<el-form-item label="数据类型" prop="datatype">
										<el-select v-model="kafkaOutput.datatype" placeholder="请选择">
												<el-option label="TEXT" value="TEXT"></el-option>
												<el-option label="JSON" value="JSON"></el-option>
												<el-option label="XML" value="XML"></el-option>
										</el-select>
								</el-form-item>
						</common-col>
						<common-col v-if="kafkaOutput.separator !== 'JSON'">
								<el-form-item label="数据分隔符" prop="separator">
										<el-input v-model="kafkaOutput.separator"></el-input>
								</el-form-item>
						</common-col>
						<common-col :lot="2">
								<el-form-item label="Servers" prop="servers">
										<el-input v-model="kafkaOutput.servers"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="端口" prop="port">
										<el-input v-model="kafkaOutput.port"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="Topic" prop="topic">
										<el-input v-model="kafkaOutput.topic"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="GroupId" prop="groupId">
										<el-input v-model="kafkaOutput.groupId"></el-input>
								</el-form-item>
						</common-col>
						<common-col>
								<el-form-item label="标识主键" prop="recordKeyCol">
										<el-input v-model="kafkaOutput.recordKeyCol"></el-input>
								</el-form-item>
						</common-col>
				</common-row>
		</el-form>
</template>

<script>
		import commonRow from '@/common/components/common-row'
		import commonCol from '@/common/components/common-col'
		export default {
				name: 'kafka-output',
				props: {
						kafkaOutput: Object
				},
				components: {commonRow, commonCol},
				data () {
						return {
								rules: {
										datatype: [
												{required: true, message: '请选择数据类型json,text,xml', trigger: 'blur'}
										],
										separator: [{required: true, message: '请输入数据分割符', trigger: 'blur'}],
										recordKeyCol: [{required: true, message: '请输入标识主键', trigger: 'blur'}]
								}
						}
				}
		}
</script>
