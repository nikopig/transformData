<template>
		<el-form ref="kafkaOutput" :model="kafkaOutput" :rules="rules" label-width="100px" label-position="right">
			<common-row>
				<common-col>
					<el-form-item label="数据格式" prop="datatype">
						<el-select v-model="kafkaOutput.datatype" placeholder="请选择">
							<el-option label="TEXT" value="TEXT"></el-option>
							<el-option label="JSON" value="JSON"></el-option>
							<el-option label="XML" value="XML"></el-option>
						</el-select>
					</el-form-item>
				</common-col>
				<common-col v-if="kafkaOutput.datatype === 'TEXT'">
					<el-form-item label="数据分隔符" prop="separator">
						<el-input v-model="kafkaOutput.separator"></el-input>
					</el-form-item>
				</common-col>
				<common-col>
					<el-form-item label="集群地址" prop="outputKafkaBootstrapServers">
						<el-input v-model="kafkaOutput.outputKafkaBootstrapServers"></el-input>
					</el-form-item>
				</common-col>
				<common-col>
					<el-form-item label="主题" prop="outputKafkaTopic">
						<el-input v-model="kafkaOutput.outputKafkaTopic"></el-input>
					</el-form-item>
				</common-col>
				<common-col>
					<el-form-item label="流程名" prop="outputKafkaProcess">
						<el-input v-model="kafkaOutput.outputKafkaProcess"></el-input>
					</el-form-item>
				</common-col>
				<common-col>
					<el-form-item label="集合方式输出" prop="isArray">
						<el-select v-model="kafkaOutput.isArray" placeholder="请选择">
							<el-option label="是" :value="true"></el-option>
							<el-option label="否" :value="false"></el-option>
						</el-select>
					</el-form-item>
				</common-col>
				<common-col :lot="4">
					<el-form-item label="输出源字段" prop="cols">
						<el-input type="textarea" v-model="kafkaOutput.cols"></el-input>
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
									datatype: [{required: true, message: '请选择数据格式', trigger: 'blur'}],
									separator: [{required: true, message: '请输入数据分割符', trigger: 'blur'}],
									outputKafkaBootstrapServers: [{required: true, message: '请选择集群地址', trigger: 'blur'}],
									outputKafkaTopic: [{required: true, message: '请输入主题', trigger: 'blur'}],
									isArray: [{required: true, message: '请输入集合方式输出', trigger: 'blur'}],
									cols: [{required: true, message: '请输入输出源字段', trigger: 'blur'}]
								}
						}
				}
		}
</script>
