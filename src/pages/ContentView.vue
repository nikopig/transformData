<template>
	<div class="content-view main-wrapper">
		<div class="common-condition-box">
			<el-form ref="task" :model="task" :inline="true" :rules="taskRules">
				<el-form-item label="任务标识名称" prop="name">
					<el-input v-model="task.name"></el-input>
				</el-form-item>
				<el-form-item label="任务描述" prop="describe">
					<el-input v-model="task.describe"></el-input>
				</el-form-item>
				<el-form-item label="任务时间间隔" prop="interval">
					<el-input type="number" v-model="task.interval"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="success" size="mini" @click="beforeSave">保存</el-button>
					<el-button type="primary" size="mini" @click="start" :loading="running">{{statusText}}</el-button>
					<el-button type="danger" size="mini" @click="stop">停止</el-button>
					<el-button type="danger" size="mini" @click="getColsFromSQL" v-show="form.db.input==='DB'">刷新输入字段
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-card class="origin-card input-card">
			<div slot="header">
				<span class="el-icon-mo-accessoriesFiles">&nbsp;输入配置</span>
				<div class="btn-box">
					<!--绑定配置页面的按钮，暂时未启用-->
					<el-button type="text" icon="el-icon-bell" @click="testConect" v-show="form.db.input==='DB'">连接测试
					</el-button>
					<!--<el-button type="text" icon="el-icon-mo-add"></el-button>-->
					<!--<el-button type="text" icon="el-icon-mo-repair"></el-button>-->
					<!--<el-button type="text" icon="el-icon-mo-cancle2"></el-button>-->
				</div>
				<div class="select-box">
					<el-dropdown @command="handleCommand($event, 0)">
						<span class="el-dropdown-link">
								{{form.db.inputLabel}}<i
								class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :command="item" v-for="(item, index) in form.db.data" :key="index">
								{{item.label}}
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
			<db-input :db="db.input" v-if="form.db.input==='DB'" ref="input_db"></db-input>
			<text-input :textInput="text.input" v-if="form.db.input==='TEXT'" ref="input_text"></text-input>
			<ftp-input :ftpInput="ftp.input" v-if="form.db.input==='FTP'" ref="input_ftp"></ftp-input>
			<kafka-input :kafkaInput="kafka.input" v-if="form.db.input==='KAFKA'" ref="input_kafka"></kafka-input>
			<rest-input :restInput="rest.input" v-if="form.db.input==='REST'" ref="input_rest"></rest-input>
			<!--<oracle-input :oracle="oracle.input" v-if="form.db.input==='oracle'" ref="input_oracle"></oracle-input>-->
		</el-card>
		<el-card class="origin-card">
			<div slot="header">
				<span class="el-icon-mo-breakDocuments">&nbsp;输出配置</span>
				<div class="btn-box">
					<!--绑定配置页面的按钮，暂时未启用-->
					<el-button type="text" icon="el-icon-bell" @click="testOutConect" v-show="form.db.output==='DB'">
						连接测试
					</el-button>
					<el-button type="text" icon="el-icon-plus" @click="addOtherColums">新增字段</el-button>
					<el-button type="text" icon="el-icon-refresh" @click="setOutFields">刷入输出字段</el-button>
					<!--<el-button type="text" icon="el-icon-mo-repair"></el-button>-->
					<!--<el-button type="text" icon="el-icon-mo-cancle2"></el-button>-->
				</div>
				<div class="select-box">
					<el-dropdown @command="handleCommand($event, 1)">
												<span class="el-dropdown-link">
														{{form.db.outputLabel}}<i
														class="el-icon-arrow-down el-icon--right"></i>
												</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item :command="item" v-for="(item, index) in form.db.data" :key="index">
								{{item.label}}
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
			<div class="body-container">
				<db-output :db="db.output" v-if="form.db.output==='DB'" ref="output_db"></db-output>
				<text-output :textOutput="text.output" v-if="form.db.output==='TEXT'" ref="output_text"></text-output>
				<ftp-output :ftpOutput="ftp.output" v-if="form.db.output==='FTP'" ref="output_ftp"></ftp-output>
				<kafka-output :kafkaOutput="kafka.output" v-if="form.db.output==='KAFKA'"
							  ref="output_kafka"></kafka-output>
				<rest-output :restOutput="rest.output" v-if="form.db.output==='REST'" ref="output_rest"></rest-output>
				<div @click="showField = !showField" class="arrow"
					 :class="{'arrow-down': !showField, 'arrow-up': showField}"><i
						class="el-icon-mo-down2"
						:class="{'arrow-el-icon-mo-down2': !showField, 'el-icon-mo-up2': showField}"></i></div>
			</div>
			<div class="field-box" v-show="showField && otherInput.length > 0">
				<el-col :span="24">
					<el-row v-if="otherInput.length > 0">
						<item-filed-other :filed.sync="item" v-for="(item,index) in otherInput" :key="index"
										  @del="delmap"></item-filed-other>
					</el-row>
				</el-col>
			</div>
		</el-card>
	</div>
</template>

<script>
	/* eslint-disable spaced-comment */
	import commonRow from '@/common/components/common-row'
	import commonCol from '@/common/components/common-col'
	import DbInput from '../components/tpl/db-input'
	import DbOutput from '../components/tpl/db-output'
	import TextOutput from '../components/tpl/text-output'
	import TextInput from '../components/tpl/text-input'
	import FtpInput from '../components/tpl/ftp-input'
	import FtpOutput from '../components/tpl/ftp-output'
	import KafkaInput from '../components/tpl/kafka-input'
	import KafkaOutput from '../components/tpl/kafka-output'
	import RestOutput from '../components/tpl/rest-output'
	import RestInput from '../components/tpl/rest-input'
	import OracleInput from '../components/tpl/oracle-input'
	import OracleOutput from '../components/tpl/oracle-output'
	import ItemFiled from '../components/common/ItemFiled'
	import ItemFiledOther from '../components/common/itemFiledOther'
	import Api from '@/utils/api.js'
	import {subSection} from '@/utils/utils.js'

	export default {
		name: 'contentView',
		data () {
			return {
				saved: false, // 当前配置是否已经保存了
				running: false,
				statusText: '启动',
				showField: false,
				task: {
					name: '',
					describe: '',
					interval: 30
				},
				taskRules: {
					name: [{required: true, message: '请输入任务标识', trigger: 'blur'}],
					describe: [{required: true, message: '请输入任务描述', trigger: 'blur'}]
				},
				form: {
					db: {
						input: 'DB',
						inputLabel: '数据库',
						output: 'DB',
						outputLabel: '数据库',
						data: [
							{
								value: 'DB',
								label: '数据库'
							},
							{
								value: 'TEXT',
								label: '文本'
							},
							{
								value: 'FTP',
								label: 'FTP'
							},
							{
								value: 'REST',
								label: 'RestApi'
							},
							{
								value: 'KAFKA',
								label: 'Kafka'
							}
						]
					}
				},
				db: {
					input: {
						db_type: '',
						username: '',
						password: '',
						url: '',
						port: '',
						table: '',
						database: '',
						cols: '',
						sql: '',
						offset: '',
						charset: '',
						modifyTable: '',
						modifyWhereCol: '',
						modifyCol: '',
						modifyColValue: '',
						recordKeyCol: '',
						field: ''
					},
					output: {
						db_type: '',
						username: '',
						password: '',
						cols: '',
						url: '',
						port: '',
						table: '',
						defaultValue: '',
						charset: ''
					},
					dbs: [],
					selectDb: '',
					dbTables: [],
					selectTable: '',
					dbFileds: [],
					selectDbFileds: []
				},
				text: {
					input: {
						filepath: '',
						datatype: '',
						offsetFile: '',
						charset: '',
						cols: '',
						offset: '',
						recordKeyCol: '',
						filetype: '',
						separator: ''
					},
					output: {
						filepath: '',
						datatype: '',
						cols: '',
						separator: '',
						filename: '',
						defaultValue: ''
					}
				},
				ftp: {
					input: {
						username: '',
						password: '',
						url: '',
						port: '',
						cols: '',
						dir: '',
						datatype: '',
						recordKeyCol: '',
						fileNamePrefix: '',
						isHistory: 'false',
						separator: ''
					},
					output: {
						username: '',
						prefix: '',
						password: '',
						url: '',
						port: '',
						cols: '',
						dir: '',
						datatype: '',
						charset: '',
						separator: '',
						filename: '',
						isArray: false,
						defaultValue: ''
					}
				},
				kafka: {
					input: {
						datatype: '',
						separator: '',
						inputKafkaBootstrapServers: '',
						inputKafkaGroupid: '',
						inputKafkaTopic: '',
						cols: ''
					},
					output: {
						datatype: '',
						separator: '',
						outputKafkaBootstrapServers: '',
						outputKafkaTopic: '',
						outputKafkaProcess: '',
						isArray: '',
						cols: ''
					}
				},
				rest: {
					input: {
						url: '',
						datatype: '',
						offset: '',
						charset: '',
						cols: '',
						request: '',
						recordKeyCol: '',
						timeParam: '',
						backCharset: '',
						implicit: '',
						separator: ''
					},
					output: {
						url: '',
						datatype: '',
						separator: '',
						multi: false,
						timeParam: '',
						cols: '',
						dataParam: '',
						implicit: '',
						defaultValue: ''
					}
				},
				oracle: {
					input: {
						username: '',
						password: '',
						url: '',
						port: '',
						sid: '',
						table: '',
						sql: ''
					},
					output: {
						username: '',
						password: '',
						url: '',
						port: '',
						database: '',
						table: '',
						defaultValue: '',
						key: '',
						charset: ''
					},
					tables: [],
					selectTable: '',
					fileds: [],
					selectDbFileds: []
				},
				otherInput: []
			}
		},
		methods: {
			// 映射表删除
			delmap (playoad) {
				this.otherInput.splice(playoad.index, 1)
				if (this.otherInput.length === 0) this.showField = false
			},
			// 刷入输出源字段
			setOutFields () {
				let outFields = this.otherInput.filter(item => item.output).map(item => item.output)
				let rel = ''
				if (outFields.length === 0) {
					this.$alert('映射表中至少有一个输出字段才可以进行该操作')
				} else {
					rel = outFields.join(',')
				}
				if (this.form.db.output === 'DB') {
					this.db.output.cols = rel
				} else if (this.form.db.output === 'TEXT') {
					this.text.output.cols = rel
				} else if (this.form.db.output === 'FTP') {
					this.ftp.output.cols = rel
				} else if (this.form.db.output === 'REST') {
					this.rest.output.cols = rel
				} else if (this.form.db.output === 'KAFKA') {
					this.kafka.output.cols = rel
				}
			},
			// 刷入映射表输出字段
			setOutMap () {
				let outputStr = ''
				if (this.form.db.output === 'DB') {
					outputStr = this.db.output.cols
				} else if (this.form.db.output === 'TEXT') {
					outputStr = this.text.output.cols
				} else if (this.form.db.output === 'FTP') {
					outputStr = this.ftp.output.cols
				} else if (this.form.db.output === 'REST') {
					outputStr = this.rest.output.cols
				} else if (this.form.db.output === 'KAFKA') {
					outputStr = this.kafka.output.cols
				}
				if (!outputStr) return false
				let outputArray = outputStr.split(',')
				outputArray.map((item, index) => {
					if (index < this.otherInput.length) {
						this.otherInput[index].output = item
					} else {
						this.otherInput.push({
							output: item,
							input: '',
							defaultValue: '',
							index: index
						})
					}
				})
				// 展示映射表
				if (this.otherInput.length > 0 && !this.showField) this.showField = true
			},
			validateProps (formObj, arr, cb) {
				if (arr.length > 0) {
					let prop = arr[0]
					formObj.validateField(prop, valid => {
						if (!valid) {
							arr.splice(0, 1)
							this.validateProps(formObj, arr, cb)
						}
					})
				} else {
					cb()
				}
			},
			testConect () {
				this.validateProps(this.$refs.input_db.$refs.db, ['url', 'username', 'password'], () => {
					let params = {
						url: this.db.input.url,
						username: this.db.input.username,
						password: this.db.input.password
					}
					Api.post('checkConnection', params)
							.then(res => {
								if (res.code === -1) {
									this.$alert(res.message)
									return false
								}
								this.$alert('输入源测试连接成功')
							})
				})
			},
			testOutConect () {
				this.validateProps(this.$refs.output_db.$refs.db, ['url', 'username', 'password'], () => {
					let params = {
						url: this.db.output.url,
						username: this.db.output.username,
						password: this.db.output.password
					}
					Api.post('checkConnection', params)
						.then(res => {
							if (res.code === -1) {
								this.$alert(res.message)
								return false
							}
							this.$alert('输出源测试连接成功')
						})
				})
			},
			handleCommand (command, type) {
				if (type === 0) {
					this.form.db.input = command.value
					this.form.db.inputLabel = command.label
				} else {
					this.form.db.output = command.value
					this.form.db.outputLabel = command.label
				}
			},
			checkChange (val) {
				if (val.checked) {
					this.form.db.input === 'db'
							? this.db.selectDbFileds.push(val)
							: this.oracle.selectDbFileds.push(val)
				} else if (this.form.db.input === 'db') {
					let tempArr = []
					this.db.selectDbFileds.forEach(item => {
						if (item.input !== val.input) {
							tempArr.push(item)
						}
						// eslint-disable-next-line spaced-comment
					})
					this.db.selectDbFileds = tempArr
				}
			},
			addColums () {
				if (this.form.db.input === 'db' && this.db.dbFileds.length > 0) {
					this.db.dbFileds.push({
						input: '',
						output: '',
						isdisabled: true,
						checked: false,
						defaultValue: ''
					})
				}
			},
			addOtherColums () {
				this.otherInput.push({
					output: '',
					input: '',
					defaultValue: '',
					index: this.otherInput.length
				})
				this.showField = true
			},
			beforeSave () {
				if ((!this.$route.query.identity || this.task.name !== this.$route.query.identity) && this.task.name) {
					let params = {
						identity: this.task.name
					}
					Api.post('checkIdentity', params)
						.then(res => {
							if (res.code === -1) {
								this.$confirm('任务名重复，是否覆盖')
									.then(() => {
										this.save()
									})
							} else {
								this.save()
							}
						})
				} else {
					this.save()
				}
			},
			save () {
				let vad = true
				let send = {}
				send['configStatusCode'] = '2'
				this.$refs.task.validate(valid => {
					if (valid) {
						send['identity'] = this.task.name
						send['desc'] = this.task.describe
						send['interval'] = this.task.interval
					} else {
						vad = false
					}
				})
				send['input.type'] = this.form.db.input
				if (this.form.db.input === 'DB') {
					this.$refs.input_db.$refs.db.validate(valid => {
						if (valid) {
							send['input.username'] = this.db.input.username
							send['input.password'] = this.db.input.password
							send['input.url'] = this.db.input.url
							send['input.db.sql'] = this.db.input.sql
									? this.db.input.sql.replace(/\n+/g, '')
									: ''
							send['input.cols'] = this.db.input.cols
							send['offset.col'] = this.db.input.field
							send['offset.offset'] = this.db.input.offset
							send['input.charset'] = this.db.input.charset
							send['modifyTable'] = this.db.input.modifyTable
							send['modifyWhereCol'] = this.db.input.modifyWhereCol
							send['modifyCol'] = this.db.input.modifyCol
							send['modifyColValue'] = this.db.input.modifyColValue
							send['recordKeyCol'] = this.db.input.recordKeyCol
						} else {
							vad = false
						}
					})
				} else if (this.form.db.input === 'TEXT') {
					this.$refs.input_text.$refs.textInput.validate(valid => {
						if (valid) {
							send['input.filepath'] = this.text.input.filepath
							send['offset.name'] = this.text.input.offsetFile
							send['offset.offset'] = this.text.input.offset
							send['input.datatype'] = this.text.input.datatype
							send['input.filetype'] = this.text.input.filetype
							send['input.charset'] = this.text.input.charset
							send['input.separator'] = this.text.input.separator
							send['recordKeyCol'] = this.text.input.recordKeyCol
							send['input.cols'] = this.text.input.cols
							console.log(this.text)
						} else {
							vad = false
						}
					})
				} else if (this.form.db.input === 'FTP') {
					this.$refs.input_ftp.$refs.ftpInput.validate(valid => {
						if (valid) {
							send['input.username'] = this.ftp.input.username
							send['input.password'] = this.ftp.input.password
							send['input.url'] = this.ftp.input.url
							send['input.port'] = this.ftp.input.port
							send['input.ftp.dir'] = this.ftp.input.dir
							send['inputFilePrefix'] = this.ftp.input.inputFilePrefix
							send['input.datatype'] = this.ftp.input.datatype
							send['offset.name'] = this.ftp.input.offsetFile
							send['offset.offset'] = this.ftp.input.offset
							send['input.charset'] = this.ftp.input.charset
							send['input.ftp.isHistory'] = this.ftp.input.isHistory
							send['input.separator'] = this.ftp.input.separator
							send['recordKeyCol'] = this.ftp.input.recordKeyCol
							send['input.cols'] = this.ftp.input.cols
						} else {
							vad = false
						}
					})
				} else if (this.form.db.input === 'REST') {
					this.$refs.input_rest.$refs.restInput.validate(valid => {
						if (valid) {
							send['input.url'] = this.rest.input.url
							send['input.datatype'] = this.rest.input.datatype
							send['input.separator'] = this.rest.input.separator
							send['offset.offset'] = this.rest.input.offset
							send['input.rest.implicit'] = this.rest.input.implicit
							send['input.rest.timeParam'] = this.rest.input.timeParam
							send['input.rest.dataParam'] = this.rest.input.dataParam
							send['input.charset'] = this.rest.input.charset
							send['input.rest.request'] = this.rest.input.request
							send['recordKeyCol'] = this.rest.input.recordKeyCol
							send['input.cols'] = this.rest.input.cols
						} else {
							vad = false
						}
					})
				} else if (this.form.db.input === 'KAFKA') {
					this.$refs.input_kafka.$refs.kafkaInput.validate(valid => {
						if (valid) {
							send['input.datatype'] = this.kafka.input.datatype
							send['input.separator'] = this.kafka.input.separator
							send['inputKafkaBootstrapServers'] = this.kafka.input.inputKafkaBootstrapServers
							send['inputKafkaGroupid'] = this.kafka.input.inputKafkaGroupid
							send['inputKafkaTopic'] = this.kafka.input.inputKafkaTopic
							send['input.cols'] = this.kafka.input.cols
						} else {
							vad = false
						}
					})
				}
				if (this.form.db.output === 'DB') {
					this.$refs.output_db.$refs.db.validate(valid => {
						if (valid) {
							send['output.username'] = this.db.output.username
							send['output.password'] = this.db.output.password
							send['output.url'] = this.db.output.url
							send['output.table'] = this.db.output.table
							send['output.db.keys'] = this.db.output.key
							send['output.cols'] = this.db.output.cols
						} else {
							vad = false
						}
					})
				} else if (this.form.db.output === 'KAFKA') {
					this.$refs.output_kafka.$refs.kafkaOutput.validate(valid => {
						if (valid) {
							send['output.datatype'] = this.kafka.output.datatype
							send['output.separator'] = this.kafka.output.separator
							send['outputKafkaBootstrapServers'] = this.kafka.output.outputKafkaBootstrapServers
							send['outputKafkaTopic'] = this.kafka.output.outputKafkaTopic
							send['outputKafkaProcess'] = this.kafka.output.outputKafkaProcess
							send['output.isArray'] = this.kafka.output.isArray
							send['output.cols'] = this.kafka.output.cols
						} else {
							vad = false
						}
					})
				} else if (this.form.db.output === 'TEXT') {
					this.$refs.output_text.$refs.textOutput.validate(valid => {
						if (valid) {
							send['output.filepath'] = this.text.output.filepath
							send['output.datatype'] = this.text.output.datatype
							send['output.separator'] = this.text.output.separator
							send['output.filename'] = this.text.output.filename
							send['output.cols'] = this.text.output.cols
						} else {
							vad = false
						}
					})
				} else if (this.form.db.output === 'FTP') {
					this.$refs.output_ftp.$refs.ftpOutput.validate(valid => {
						if (valid) {
							send['output.username'] = this.ftp.output.username
							send['output.password'] = this.ftp.output.password
							send['output.url'] = this.ftp.output.url
							send['output.port'] = this.ftp.output.port
							send['output.ftp.dir'] = this.ftp.output.dir
							send['output.datatype'] = this.ftp.output.datatype
							send['output.separator'] = this.ftp.output.separator
							send['output.filename'] = this.ftp.output.filename
							send['output.charset'] = this.ftp.output.charset
							send['outputFilenamePrefix'] = this.ftp.output.prefix
							send['output.json.array'] = this.ftp.output.isArray
							send['output.cols'] = this.ftp.output.cols
						} else {
							vad = false
						}
					})
				} else if (this.form.db.output === 'REST') {
					this.$refs.output_rest.$refs.restOutput.validate(valid => {
						if (valid) {
							send['output.url'] = this.rest.output.url
							send['output.datatype'] = this.rest.output.datatype
							send['output.separator'] = this.rest.output.separator
						} else {
							vad = false
						}
					})
				}
				this.otherInput.forEach(item => {
//					if ()
//					outputArray.push(item.output)
//					if (!item.input) {
//						inputArray.push('__EMPTY__')
//					} else {
//						inputArray.push(item.input)
//					}
					if (item.output) {
						send['convert.' + item.output] = item.input + ',' + item.defaultValue
					}
				})
				if (!vad) {
					this.$alert('请填写完整配置')
					return false
				}
				send['output.type'] = this.form.db.output
				Api.post('getConfigInfo', send).then(res => {
					if (res.code === 0) {
						this.$alert('保存服务配置成功')
					} else {
						this.$alert(res.message)
					}
				})
			},
			getIndexOfItem (arr, obj) {
				let pos = -1
				for (let i = 0; i < arr.length; i++) {
					let item = arr[i]
					let judge = true
					for (let f in obj) {
						if (!(f in item)) {
							judge = false
							break
						} else if (obj[f] !== item[f]) {
							judge = false
							break
						}
					}
					if (judge) pos = i
				}
				return pos
			},
			getData () {
				let params = {
					identity: this.task.name
				}
				Api.post('getConfigInfoToUpdate', params).then(res => {
					if (res.code === -1) {
						this.$alert(res.message)
						return false
					}
					res = this.GenerateJson(res.data)
					this.task.name = res['identity']
					this.task.describe = res['desc']
					this.task.interval = res['interval']
					this.form.db.input = res['input.type']
					let pos = this.getIndexOfItem(this.form.db.data, {value: res['input.type']})
					this.form.db.inputLabel = this.form.db.data[pos].label
					if (this.form.db.input === 'DB') {
						this.db.input.username = res['input.username']
						this.db.input.password = res['input.password']
						this.db.input.modifyTable = res['modifyTable']
						this.db.input.recordKeyCol = res['recordKeyCol']
						this.db.input.modifyWhereCol = res['modifyWhereCol']
						this.db.input.modifyCol = res['modifyCol']
						this.db.input.modifyColValue = res['modifyColValue']
						this.db.input.url = res['input.url']
						this.db.input.sql = res['input.db.sql']
						this.db.input.field = res['offset.col']
						this.db.input.offset = res['offset.offset']
						this.db.input.charset = res['input.charset']
						this.db.input.cols = res['input.cols']
					} else if (this.form.db.input === 'TEXT') {
						this.text.input.filepath = res['input.filepath']
						this.text.input.offsetFile = res['offset.name']
						this.text.input.offset = res['offset.offset']
						this.text.input.datatype = res['input.datatype']
						this.text.input.filetype = res['input.filetype']
						this.text.input.charset = res['input.charset']
						this.text.input.separator = res['input.separator']
						this.text.input.cols = res['input.cols']
					} else if (this.form.db.input === 'FTP') {
						this.ftp.input.username = res['input.username']
						this.ftp.input.password = res['input.password']
						this.ftp.input.url = res['input.url']
						this.ftp.input.port = res['input.port']
						this.ftp.input.dir = res['input.ftp.dir']
						this.ftp.input.datatype = res['input.datatype']
						this.ftp.input.offsetFile = res['offset.name']
						this.ftp.input.offset = res['offset.offset']
						this.ftp.input.charset = res['input.charset']
						this.ftp.input.isHistory = res['input.ftp.isHistory']
						this.ftp.input.separator = res['input.separator']
						this.ftp.input.cols = res['input.cols']
					} else if (this.form.db.input === 'REST') {
						this.rest.input.url = res['input.url']
						this.rest.input.datatype = res['input.datatype']
						this.rest.input.separator = res['input.separator']
						this.rest.input.offset = res['offset.offset']
						this.rest.input.implicit = res['input.rest.implicit']
						this.rest.input.outputFilenamePrefix = res['outputFilenamePrefixoutputFilenamePrefix']
						this.rest.input.timeParam = res['input.rest.timeParam']
						this.rest.input.dataParam = res['input.rest.dataParam']
						this.rest.input.charset = res['input.charset']
						this.rest.input.request = res['input.rest.request']
						this.rest.input.cols = res['input.cols']
					} else if (this.form.db.input === 'KAFKA') {
						this.kafka.input.datatype = res['input.datatype']
						this.kafka.input.separator = res['input.separator']
						this.kafka.input.inputKafkaBootstrapServers = res['inputKafkaBootstrapServers']
						this.kafka.input.inputKafkaGroupid = res['inputKafkaGroupid']
						this.kafka.input.inputKafkaTopic = res['inputKafkaTopic']
						this.kafka.input.cols = res['input.cols']
					}
					this.otherInput = []
					let mapData = Object.keys(res).filter(item => {
						return item.indexOf('convert.') !== -1
					})
					mapData.forEach((item, index) => {
						let temp = {}
						temp.output = subSection(item, 'convert.')
						let val = res[item]
						temp.input = val.split(',')[0]
						temp.defaultValue = subSection(val, ',')
						temp.index = index
						this.otherInput.push(temp)
					})
//					if (res['output.cols'] && res['output.cols'].length > 0) {
//						let inputArray = res['input.cols'].split(',')
//						let outputArray = res['output.cols'].split(',')
//						console.log(inputArray, outputArray)
//						outputArray.forEach((item, index) => {
//							let temp = {}
//							temp.output = item
//							temp.input = index >= inputArray.length ? '' : inputArray[index]
//							temp.index = index
//							let defaultStr = res['convert.' + temp.output]
//							console.log(temp.output, defaultStr)
//							let pos = defaultStr.indexOf(',')
//							temp.defaultValue = defaultStr.substring(pos + 1)
//							this.otherInput.push(temp)
//						})
//					}
					this.form.db.output = res['output.type']
					let pos1 = this.getIndexOfItem(this.form.db.data, {value: res['output.type']})
					this.form.db.outputLabel = this.form.db.data[pos1].label
					if (this.form.db.output === 'DB') {
						this.db.output.username = res['output.username']
						this.db.output.password = res['output.password']
						this.db.output.url = res['output.url']
						this.db.output.table = res['output.table']
						this.db.output.key = res['output.db.keys']
						this.db.output.cols = res['output.cols']
					} else if (this.form.db.output === 'TEXT') {
						this.text.output.filepath = res['output.filepath']
						this.text.output.datatype = res['output.datatype']
						this.text.output.separator = res['output.separator']
						this.text.output.filename = res['output.filename']
						this.text.output.cols = res['output.cols']
					} else if (this.form.db.output === 'FTP') {
						this.ftp.output.username = res['output.username']
						this.ftp.output.password = res['output.password']
						this.ftp.output.url = res['output.url']
						this.ftp.output.port = res['output.port']
						this.ftp.output.dir = res['output.ftp.dir']
						this.ftp.output.datatype = res['output.datatype']
						this.ftp.output.separator = res['output.separator']
						this.ftp.output.filename = res['output.filename']
						this.ftp.output.prefix = res['outputFilenamePrefix']
						this.ftp.output.charset = res['output.charset']
						this.ftp.output.isArray = res['output.json.array']
						this.ftp.output.cols = res['output.cols']
					} else if (this.form.db.output === 'REST') {
						this.rest.output.url = res['output.url']
						this.rest.output.datatype = res['output.datatype']
						this.rest.output.separator = res['output.separator']
						this.rest.output.cols = res['output.cols']
					} else if (this.form.db.output === 'KAFKA') {
						this.kafka.output.datatype = res['output.datatype']
						this.kafka.output.separator = res['output.separator']
						this.kafka.output.outputKafkaBootstrapServers = res['outputKafkaBootstrapServers']
						this.kafka.output.outputKafkaTopic = res['outputKafkaTopic']
						this.kafka.output.outputKafkaProcess = res['outputKafkaProcess']
						this.kafka.output.isArray = res['output.isArray']
						this.kafka.output.cols = res['output.cols']
					}
				})
			},
			// TODO: 获取字段插入到InputMapping表单。
			getColsFromSQL () {
				if (this.db.input.sql.indexOf(';') !== -1) {
					this.$alert('sql语句中不能有分号，请检查')
					return false
				}
				let params = {
					'input.sql': this.db.input.sql,
					'input.url': this.db.input.url,
					'input.username': this.db.input.username,
					'input.password': this.db.input.password
				}
				Api.post('getCols', params).then(res => {
					if (res.code !== 0) {
						this.$alert(res.message)
						return false
					}
					if (res.data && res.data.length > 0) {
						this.otherInput = []
						this.$alert(res.message)
						this.db.input.cols = res.data.join(',')
						res.data.forEach(item => {
							this.otherInput.push({
								output: '',
								input: item,
								defaultValue: '',
								isdisabled: true
							})
						})
					}
				})
			},
			start () {
				this.statusText = '启动中...'
				let params = {
					identity: this.task.name,
					interval: this.task.interval,
					configStatusCode: '1',
					desc: this.task.describe
				}
				this.$refs.task.validate(valid => {
					if (valid) {
						Api.post('mission', params).then(res => {
							if (res.code === 0) {
								this.$alert('服务启动成功')
								this.running = true
								this.statusText = '运行中...'
							} else {
								this.statusText = '启动'
								this.$alert(res.message)
							}
						})
					} else {
						return false
					}
				})
			},
			stop () {
				let params = {
					identity: this.task.name,
					interval: this.task.interval,
					configStatusCode: '2',
					desc: this.task.describe
				}
				this.$refs.task.validate(valid => {
					if (valid) {
						Api.post('mission', params).then(res => {
							if (res.code === 0) {
								this.$alert('操作成功')
								this.running = false
								this.statusText = '启动'
							} else {
								this.$alert(res.message)
							}
						})
					} else {
						return false
					}
				})
			},
			GenerateJson (arr) {
				let rel = {}
				for (let i = 0; i < arr.length; i++) {
					let pos = arr[i].indexOf('=')
					let key = arr[i].substring(0, pos)
					let val = arr[i].substring(pos + 1)
					rel[key] = val
				}
				return rel
			},
			init () {
				//	this.$route.query.identity = '111'
				if (this.$route.query.identity) {
					this.task.name = this.$route.query.identity
					if (this.$route.query.configStatusCode === '1') {
						this.running = true
						this.statusText = '运行中...'
					} else {
						this.running = false
						this.statusText = '启动'
					}
					this.getData()
				}
			}
		},
		created () {
			console.log(this.otherInput)
		},
		components: {
			commonRow,
			commonCol,
			DbInput,
			DbOutput,
			ItemFiled,
			ItemFiledOther,
			TextOutput,
			TextInput,
			FtpInput,
			FtpOutput,
			KafkaInput,
			KafkaOutput,
			RestOutput,
			RestInput,
			OracleInput,
			OracleOutput
		},
		mounted () {
			this.otherInput.push({
				output: '',
				input: '',
				defaultValue: ''
			})
			this.init()
		}
	}
</script>


<style lang="less">
	.content-view {
		overflow: hidden;
		.origin-card {
			margin-bottom: 30px;
			/*&.input-card {*/
			/*box-shadow: none;*/
			/*}*/
			border-top: none;
			overflow: visible;
			.el-card__header {
				padding: 10px;
				background-color: #ebeef5;
				.select-box {
					float: right;
					padding-right: 10px;
					cursor: pointer;
					/*margin-top: -13px;*/
					.el-form-item {
						margin-bottom: 0px;
						input {
							background-color: #ebeef5;
						}
					}
				}
				.el-input {
					input {
						text-align: right;
						border: none;
						outline: none;
					}
				}
			}
			.el-card__body {
				width: 100%;
				padding: 20px 0px 0px 0px;
				.body-container {
					position: relative;
					.arrow {
						position: absolute;
						border-style: solid;
						border-color: #e5e5e5;
						-webkit-box-sizing: border-box;
						box-sizing: border-box;
						width: 62px;
						height: 15px;
						left: 50%;
						margin-left: -31px;
						background-color: #fff;
						z-index: 999;
						cursor: pointer;
						i {
							font-size: 32px;
							text-align: center;
						}
						i::before {
							bottom: -6px;
							position: absolute;
							width: 100%;
						}
					}
					.arrow-up {
						border-width: 1px 1px 0;
						bottom: -1px;
						border-radius: 8px 8px 0 0;
						i::before {
							bottom: -10px;
						}
					}
					.arrow-down {
						border-width: 0 1px 1px;
						bottom: -15px;
						border-radius: 0 0 8px 8px;
					}
				}
				.field-box {
					padding: 28px 0px 20px 0px;
					border-top: 1px solid #eee;
					overflow: hidden;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
					.delete-box {
						width: 100%;
						text-align: center;
					}
				}
			}
			.btn-box {
				float: right;
				margin-top: -13px;
			}
		}
		.item-header {
			display: flex;
			.item-body {
				flex: 1;
				text-align: center;
			}
		}
	}
</style>
