<template>
		<div class="content-view">
				<el-row>
						<el-col :span="8" :offset="-2">
								<el-form label-width="80px">
										<el-form-item label="输入源">
												<el-select v-model="form.db.input">
														<el-option label="db" value="db"></el-option>
														<el-option label="text" value="text"></el-option>
														<el-option label="ftp" value="ftp"></el-option>
														<el-option label="kafka" value="kafka"></el-option>
														<el-option label="rest" value="rest"></el-option>
														<el-option label="oracle" value="oracle"></el-option>
												</el-select>
										</el-form-item>
								</el-form>
								<db-input :db="db.input" v-if="form.db.input==='db'" ref="input_db"></db-input>
								<text-input :textInput="text.input" v-if="form.db.input==='text'" ref="input_text"></text-input>
								<ftp-input :ftpInput="ftp.input" v-if="form.db.input==='ftp'" ref="input_ftp"></ftp-input>
								<kafka-input :kafkaInput="kafka.input" v-if="form.db.input==='kafka'" ref="input_kafka"></kafka-input>
								<rest-input :restInput="rest.input" v-if="form.db.input==='rest'" ref="input_rest"></rest-input>
								<oracle-input :oracle="oracle.input" v-if="form.db.input==='oracle'" ref="input_oracle"></oracle-input>
						</el-col>
						<el-col :span="8" :offset="8">
								<el-form label-width="80px">
										<el-form-item label="输出源">
												<el-select v-model="form.db.output">
														<el-option label="db" value="db"></el-option>
														<el-option label="text" value="text"></el-option>
														<el-option label="ftp" value="ftp"></el-option>
														<el-option label="kafka" value="kafka"></el-option>
														<el-option label="rest" value="rest"></el-option>
														<el-option label="oracle" value="oracle"></el-option>
												</el-select>
										</el-form-item>
								</el-form>
								<db-output :db="db.output" v-if="form.db.output==='db'" ref="output_db"></db-output>
								<text-output :textOutput="text.output" v-if="form.db.output==='text'" ref="output_text"></text-output>
								<ftp-output :ftpOutput="ftp.output" v-if="form.db.output==='ftp'" ref="output_ftp"></ftp-output>
								<kafka-output :kafkaOutput="kafka.output" v-if="form.db.output==='kafka'" ref="output_kafka"></kafka-output>
								<rest-output :restOutput="rest.output" v-if="form.db.output==='rest'" ref="output_rest"></rest-output>
								<oracle-output :oracle="oracle.output" v-if="form.db.output==='oracle'" ref="output_oracle"></oracle-output>
						</el-col>
				</el-row>
				<div class="dash"
									v-if="(db.dbs.length>0||oracle.tables.length>0)&&(form.db.input==='db'||form.db.input==='oracle')"></div>
				<el-row v-if="form.db.input==='db'||form.db.input==='oracle'">
						<el-col :span="22" :offset="2" v-if="form.db.input==='db'||form.db.input==='oracle'">
								<div v-if="db.dbs.length>0&&form.db.input==='db'">
								</div>
								<el-row :gutter="10"
																v-if="(db.dbFileds.length>0||oracle.fileds.length>0)&&(form.db.input==='db'||form.db.input==='oracle')">
										<h5>字段名:</h5>
										<el-col :span="16" :offset="2">
												<div class="item-header">
														<div class="item-body">
																原有字段
														</div>
														<div class="item-body">
																输出字段
														</div>
														<div class="item-body">
																默认值
														</div>
												</div>
												<div v-if="form.db.input==='db'">
														<item-filed @checkChange="checkChange" :filed.sync="item" v-for="(item,index) in db.dbFileds" :key="index"
																										style="margin-top:5px;" :id="index" :otherInput="otherInput"></item-filed>
												</div>
												<div v-if="form.db.input==='oracle'">
														<item-filed @checkChange="checkChange" :filed.sync="item" v-for="(item,index) in oracle.fileds"
																										:key="index" style="margin-top:5px;" :id="index" :otherInput="otherInput"></item-filed>
												</div>
										</el-col>
								</el-row>
						</el-col>
				</el-row>
				<el-row v-if="form.db.input!=='db'&&form.db.input!=='oracle'">
						<el-col :span="22" :offset="2">
								<el-row>
										<el-col :span="16" :offset="2">
												<div class="item-header">
														<div class="item-body">
																原有字段
														</div>
														<div class="item-body">
																输出字段
														</div>
														<div class="item-body">
																默认值
														</div>
														<div class="item-body">
																操作
														</div>
												</div>
												<item-filed-other :filed.sync="item" v-for="(item,index) in otherInput" :key="index"
																														style="margin-top:5px;" :id="index" :otherInput="otherInput"></item-filed-other>
										</el-col>
								</el-row>
						</el-col>
				</el-row>
				<div class="btn-get">
						<div class="dash"></div>
						<el-button @click="changeTable" class="btn btn-primary" v-if="form.db.input==='db'||form.db.input==='oracle'">获取
						</el-button>
						<el-button @click="addColums" v-if="form.db.input==='db'||form.db.input==='oracle'">新增字段</el-button>
						<el-button @click="addOtherColums" v-if="form.db.input!=='db'&&form.db.input!=='oracle'">新增字段</el-button>
						<el-button @click="comfirmTo">转换</el-button>
				</div>
		</div>
</template>

<script>
		import DbInput from './tpl/db-input'
		import DbOutput from './tpl/db-output'
		import TextOutput from './tpl/text-output'
		import TextInput from './tpl/text-input'
		import FtpInput from './tpl/ftp-input'
		import FtpOutput from './tpl/ftp-output'
		import KafkaInput from './tpl/kafka-input'
		import KafkaOutput from './tpl/kafka-output'
		import RestOutput from './tpl/rest-output'
		import RestInput from './tpl/rest-input'
		import OracleInput from './tpl/oracle-input'
		import OracleOutput from './tpl/oracle-output'
		import ItemFiled from './common/ItemFiled'
		import ItemFiledOther from './common/itemFiledOther'
		import Api from '../utils/api'

		export default {
				name: 'contentView',
				data () {
						return {
								form: {
										db: {
												input: 'db',
												output: 'db'
										}
								},
								db: {
										input: {
												db_type: '',
												username: 'root',
												password: 'root',
												url: '',
												port: '',
												table: 'product_info',
												database: 'supermarket',
												sql: ''
										},
										output: {
												db_type: '',
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
												separator: ''
										},
										output: {
												filepath: '',
												datatype: '',
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
												dir: '',
												datatype: '',
												separator: ''
										},
										output: {
												username: '',
												password: '',
												url: '',
												port: '',
												dir: '',
												datatype: '',
												separator: '',
												filename: '',
												defaultValue: ''
										}
								},
								kafka: {
										input: {
												url: '',
												topic: '',
												datatype: '',
												separator: ''
										},
										output: {
												url: '',
												topic: '',
												datatype: '',
												separator: '',
												groupid: '',
												defaultValue: ''
										}
								},
								rest: {
										input: {
												url: '',
												datatype: '',
												separator: ''
										},
										output: {
												url: '',
												datatype: '',
												separator: '',
												multi: false,
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
										})
										this.db.selectDbFileds = tempArr
								} else if (this.form.db.input === 'oracle') {
										let tempArr = []
										this.oracle.selectDbFileds.forEach(item => {
												if (item.input !== val.input) {
														tempArr.push(item)
												}
										})
										this.oracle.selectDbFileds = tempArr
								}
						},
//    getDatabase () {
//      if (this.form.db.input === 'db') {
//        this.db.dbs = []
//        this.$refs.input_db.$refs.db.validate(valid => {
//          if (valid) {
//            let input = {}
//            input['input.type'] = this.db.input.db_type
//            input['input.username'] = this.db.input.username
//            input['input.password'] = this.db.input.password
//            input['input.url'] = this.db.input.url
//            input['input.port'] = this.db.input.port
//            Api.getDatabase(input).then(data => {
//              this.db.dbs = data
//              this.db.dbTables = []
//              this.db.dbFileds = []
//            })
//          } else {
//            return false
//          }
//        })
//      }
//      if (this.form.db.input === 'oracle') {
//        this.$refs.input_oracle.$refs.oracle.validate(valid => {
//          if (valid) {
//            this.changeDB()
//          } else {
//            return false
//          }
//        })
//      }
//    },
//    changeDB () {
//      let input = {}
//      if (this.form.db.input === 'db') {
//        input['input.type'] = this.db.input.db_type
//        input['input.username'] = this.db.input.username
//        input['input.password'] = this.db.input.password
//        input['input.url'] = this.db.input.url
//        input['input.port'] = this.db.input.port
//        input['input.database'] = this.db.selectDb
//        Api.getTable(input).then(data => {
//          this.db.dbTables = data
//          this.db.dbFileds = []
//        })
//      }
//      if (this.form.db.input === 'oracle') {
//        input['input.type'] = this.form.db.input
//        input['input.username'] = this.oracle.input.username
//        input['input.password'] = this.oracle.input.password
//        input['input.url'] = this.oracle.input.url
//        input['input.port'] = this.oracle.input.port
//        input['input.database'] = this.oracle.input.sid
//        Api.getTable(input).then(data => {
//          this.oracle.tables = data
//          this.oracle.fileds = []
//        })
//      }
//    },
						changeTable () {
								let input = {}
								if (this.form.db.input === 'db') {
										this.db.dbFileds = []
										input['input.type'] = this.db.input.db_type
										input['input.username'] = this.db.input.username
										input['input.password'] = this.db.input.password
										input['input.url'] = this.db.input.url
										input['input.port'] = this.db.input.port
										input['input.database'] = this.db.selectDb
										input['input.table'] = this.db.input.table
										Api.getColumns(input).then(data => {
												console.log(data)
												data.forEach((item, index) => {
														let column = {}
														column.input = item
														column.output = item
														column.isdisabled = true
														column.checked = false
														this.db.dbFileds.push(column)
														this.otherInput.push(column)
												})
										})
								}
								if (this.form.db.input === 'oracle') {
										this.oracle.fileds = []
										input['input.type'] = this.form.db.input
										input['input.username'] = this.oracle.input.username
										input['input.password'] = this.oracle.input.password
										input['input.url'] = this.oracle.input.url
										input['input.port'] = this.oracle.input.port
										input['input.database'] = this.oracle.input.sid
										input['input.table'] = this.oracle.input.table
//										input['input.table'] = '\'' + this.oracle.selectTable + '\''
										Api.getColumns(input).then(data => {
												data.forEach((item, index) => {
														let column = {}
														column.input = item
														column.output = item
														column.isdisabled = true
														column.checked = false
														this.oracle.fileds.push(column)
												})
										})
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
								if (this.form.db.input === 'oracle' && this.oracle.fileds.length > 0) {
										this.oracle.fileds.push({
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
										defaultValue: ''
								})
						},
						comfirmTo () {
								let send = {}
								let inputArray = []
								let outputArray = []
//      let defaultArray = []
								send['input.type'] = this.form.db.input
								switch (this.form.db.input) {
										case 'db':
												send['input.type'] = this.db.input.db_type
												send['input.username'] = this.db.input.username
												send['input.password'] = this.db.input.password
												send['input.url'] = this.db.input.url
												send['input.port'] = this.db.input.port
												send['input.database'] = this.db.input.database
												send['input.table'] = this.db.input.table
												send['input.sql'] = this.db.input.sql
												if (this.db.selectDbFileds.length === 0) {
														alert('请选择数据字段!')
														return false
												}
												this.db.selectDbFileds.forEach(item => {
														outputArray.push(item.output)
														inputArray.push(item.input)
//            defaultArray.push(item.defaultValue)
//														if (!item.defaultValue) {
//																item.defaultValue = ''
//														} else {
//																item.defaultValue = ',' + item.defaultValue
//														}
														var arr = []
														arr.push(item.output)
														arr.push(item.defaultValue)
														var str = arr.join(',')
														console.log(arr)
														send['convert.' + item.input] = str
												})
												send['input.cols'] = inputArray.join(',')
												send['output.cols'] = outputArray.join(',')
//          send['input.default'] = defaultArray.join(',')
												break
										case 'text':
												this.$refs.input_text.$refs.textInput.validate(valid => {
														if (valid) {
																send['input.filepath'] = this.text.input.filepath
																send['input.datatype'] = this.text.input.datatype
																send['input.separator'] = this.text.input.separator
														} else {
																return false
														}
												})
												this.otherInput.forEach(item => {
														outputArray.push(item.output)
														inputArray.push(item.input)
//            defaultArray.push(item.defaultValue)
														send['convert.' + item.input + item.defaultValue] = item.output
												})
												send['input.cols'] = inputArray.join(',')
												send['output.cols'] = outputArray.join(',')
//          send['input.default'] = defaultArray.join(',')
												break
										case 'ftp':
												this.$refs.input_ftp.$refs.ftpInput.validate(valid => {
														if (valid) {
																send['input.username'] = this.ftp.input.username
																send['input.password'] = this.ftp.input.password
																send['input.url'] = this.ftp.input.url
																send['input.port'] = this.ftp.input.port
																send['input.ftp.dir'] = this.ftp.input.dir
																send['input.datatype'] = this.ftp.input.datatype
																send['input.separator'] = this.ftp.input.separator
														} else {
																return false
														}
												})
												this.otherInput.forEach(item => {
														outputArray.push(item.output)
														inputArray.push(item.input)
//            defaultArray.push(item.defaultValue)
														send['convert.' + item.input] = item.output + ',' + item.defaultValue
												})
												send['input.cols'] = inputArray.join(',')
												send['output.cols'] = outputArray.join(',')
//          send['input.default'] = defaultArray.join(',')
												break
										case 'kafka':
												this.$refs.input_kafka.$refs.kafkaInput.validate(valid => {
														if (valid) {
																send['input.url'] = this.kafka.input.url
																send['input.topic'] = this.kafka.input.topic
																send['input.datatype'] = this.kafka.input.datatype
																send['input.separator'] = this.kafka.input.separator
														} else {
																return false
														}
												})
												this.otherInput.forEach(item => {
														outputArray.push(item.output)
														inputArray.push(item.input)
//            defaultArray.push(item.defaultValue)
														send['convert.' + item.input] = item.output + ',' + item.defaultValue
												})
												send['input.cols'] = inputArray.join(',')
												send['output.cols'] = outputArray.join(',')
//          send['input.default'] = defaultArray.join(',')
												break
										case 'rest':
												this.$refs.input_rest.$refs.restInput.validate(valid => {
														if (valid) {
																send['input.url'] = this.rest.input.url
																send['input.datatype'] = this.rest.input.datatype
																send['input.separator'] = this.rest.input.separator
														} else {
																return false
														}
												})
												this.otherInput.forEach(item => {
														outputArray.push(item.output)
														inputArray.push(item.input)
//            defaultArray.push(item.defaultValue)
														send['convert.' + item.input] = item.output + ',' + item.defaultValue
												})
												send['input.cols'] = inputArray.join(',')
												send['output.cols'] = outputArray.join(',')
//          send['input.default'] = defaultArray.join(',')
												break
										case 'oracle':
												this.$refs.input_oracle.$refs.oracle.validate(valid => {
														if (valid) {
																send['input.type'] = this.form.db.input
																send['input.username'] = this.oracle.input.username
																send['input.password'] = this.oracle.input.password
																send['input.url'] = this.oracle.input.url
																send['input.port'] = this.oracle.input.port
																send['input.database'] = this.oracle.input.sid
																send['input.sql'] = this.oracle.input.sql
																send['input.table'] = this.oracle.input.table
																if (this.oracle.selectDbFileds.length === 0) {
																		alert('请选择数据字段!')
																		return false
																}
																this.oracle.selectDbFileds.forEach(item => {
																		outputArray.push(item.output)
																		inputArray.push(item.input)
//                defaultArray.push(item.defaultValue)
																		send['convert.' + item.input] = item.output + ',' + item.defaultValue
																})
																send['input.cols'] = inputArray.join(',')
																send['output.cols'] = outputArray.join(',')
//              send['input.default'] = defaultArray.join(',')
														} else {
																return false
														}
												})
												break
								}
								send['output.type'] = this.form.db.output
								switch (this.form.db.output) {
										case 'db':
												send['output.type'] = this.db.output.db_type
												send['output.username'] = this.db.output.username
												send['output.password'] = this.db.output.password
												send['output.url'] = this.db.output.url
												send['output.port'] = this.db.output.port
												send['output.table'] = this.db.output.table
												send['output.database'] = this.db.output.database
												send['output.db.key'] = this.db.output.key
												send['output.db.charset'] = this.db.output.charset
												this.$refs.output_db.$refs.db.validate(valid => {
														if (valid) {
																Api.getConfigInfo(send).then(data => {
																		console.log(data)
																})
														} else {
																return false
														}
												})
												break
										case 'text':
												send['output.filepath'] = this.text.output.filepath
												send['output.datatype'] = this.text.output.datatype
												send['output.separator'] = this.text.output.separator
												send['output.filename'] = this.text.output.filename
												this.$refs.output_text.$refs.textOutput.validate(valid => {
														if (valid) {
																Api.getConfigInfo(send).then(data => {
																		console.log(data)
																})
														} else {
																return false
														}
												})
												break
										case 'ftp':
												send['output.username'] = this.ftp.output.username
												send['output.password'] = this.ftp.output.password
												send['output.url'] = this.ftp.output.url
												send['output.port'] = this.ftp.output.port
												send['output.dir'] = this.ftp.output.dir
												send['output.datatype'] = this.ftp.output.datatype
												send['output.separator'] = this.ftp.output.separator
												send['output.filename'] = this.ftp.output.filename
												this.$refs.output_ftp.$refs.ftpOutput.validate(valid => {
														if (valid) {
																Api.getConfigInfo(send).then(data => {
																		console.log(data)
																})
														} else {
																return false
														}
												})
												break
										case 'kafka':
												send['output.url'] = this.kafka.output.url
												send['output.topic'] = this.kafka.output.topic
												send['output.datatype'] = this.kafka.output.datatype
												send['output.separator'] = this.kafka.output.separator
												send['output.groupid'] = this.kafka.output.groupid
												this.$refs.output_kafka.$refs.kafkaOutput.validate(valid => {
														if (valid) {
																Api.getConfigInfo(send).then(data => {
																		console.log(data)
																})
														} else {
																return false
														}
												})
												break
										case 'rest':
												send['output.url'] = this.rest.output.url
												send['output.datatype'] = this.rest.output.datatype
												send['output.separator'] = this.rest.output.separator
												this.$refs.output_rest.$refs.restOutput.validate(valid => {
														if (valid) {
																Api.getConfigInfo(send).then(data => {
																		console.log(data)
																})
														} else {
																return false
														}
												})
												break
										case 'oracle':
												send['output.type'] = this.form.db.output
												send['output.username'] = this.oracle.output.username
												send['output.password'] = this.oracle.output.password
												send['output.url'] = this.oracle.output.url
												send['output.port'] = this.oracle.output.port
												send['output.table'] = this.oracle.output.table
												send['output.database'] = this.oracle.output.database
												send['output.db.key'] = this.oracle.output.key
												send['output.db.charset'] = this.oracle.output.charset
												this.$refs.output_oracle.$refs.oracle.validate(valid => {
														if (valid) {
																Api.getConfigInfo(send).then(data => {
																		console.log(data)
																})
														} else {
																return false
														}
												})
												break
								}
						}
				},
				created () {
						console.log(this.otherInput)
				},
				components: {
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
				}
		}
</script>

<style>
		.content-view {
				margin: 15px;
				padding-bottom: 200px;
		}

		.dash {
				border-bottom: 1px dashed #d8dce5;
				margin: 15px 0;
		}

		.btn-get {
				display: block;
				width: 100%;
				position: fixed;
				padding-bottom: 15px;
				bottom: 0;
				text-align: center;
				background: #fff;
		}

		.el-select {
				display: block;
		}

		.item-header {
				display: flex;
		}

		.item-body {
				flex: 1;
				text-align: center;
		}
</style>
