<template>
	<el-form ref="kafkaInput" :model="kafkaInput" :rules="rules" label-width="100px" label-position="right">
		<common-row>
			<common-col>
				<el-form-item label="数据格式" prop="datatype">
					<el-select v-model="kafkaInput.datatype" placeholder="请选择">
						<el-option label="TEXT" value="TEXT"></el-option>
						<el-option label="JSON" value="JSON"></el-option>
						<el-option label="XML" value="XML"></el-option>
					</el-select>
				</el-form-item>
			</common-col>
			<common-col v-if="kafkaInput.datatype === 'TEXT'">
				<el-form-item label="数据分隔符" prop="separator">
					<el-input v-model="kafkaInput.separator"></el-input>
				</el-form-item>
			</common-col>
			<common-col>
				<el-form-item label="集群地址" prop="inputKafkaBootstrapServers">
					<el-input v-model="kafkaInput.inputKafkaBootstrapServers"></el-input>
				</el-form-item>
			</common-col>
			<common-col>
				<el-form-item label="所属组" prop="inputKafkaGroupid">
					<el-input v-model="kafkaInput.inputKafkaGroupid"></el-input>
				</el-form-item>
			</common-col>
			<common-col>
				<el-form-item label="主题" prop="inputKafkaTopic">
					<el-input v-model="kafkaInput.inputKafkaTopic"></el-input>
				</el-form-item>
			</common-col>
			<common-col :lot="4">
				<el-form-item label="输入源字段" prop="cols">
					<el-input type="textarea" v-model="kafkaInput.cols"></el-input>
				</el-form-item>
			</common-col>
		</common-row>
	</el-form>
</template>

<script>
	import commonRow from '@/common/components/common-row'
	import commonCol from '@/common/components/common-col'

	export default {
		name: 'kafka-input',
		props: {
			kafkaInput: Object
		},
		components: {commonRow, commonCol},
		data () {
			return {
				rules: {
					datatype: [{required: true, message: '请选择数据类型json,text,xml', trigger: 'blur'}],
					separator: [{required: true, message: '请输入数据分割符', trigger: 'blur'}],
					inputKafkaBootstrapServers: [{required: true, message: '请输入集群地址', trigger: 'blur'}],
					inputKafkaGroupid: [{required: true, message: '请输入所属组', trigger: 'blur'}],
					inputKafkaTopic: [{required: true, message: '请输入主题', trigger: 'blur'}],
					cols: [{required: true, message: '请填写输出源字段', trigger: 'blur'}]
				}
			}
		}
	}
</script>
