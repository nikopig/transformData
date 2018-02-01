<template>
	<div class="mysql-view">
		<el-button-group>
			<el-button type="primary" @click="getDatabase">获取</el-button>
			<el-button type="primary" :disabled="mysql.dbFileds.length===0">新增字段</el-button>
			<el-button type="primary" :disabled="mysql.selectDbFileds.length===0">转换</el-button>
		</el-button-group>
		<div v-if="mysql.dbs.length>0">
			<h5>数据库:</h5>
			<el-radio-group v-model="mysql.selectDb" @change="changeDB">
				<el-row>
					<el-col :span="8" v-for="item in mysql.dbs" :key="item">
						<el-radio :label="item" v-for="item in mysql.dbs" :key="item">{{item}}</el-radio>
					</el-col>
				</el-row>
			</el-radio-group>
		</div>
		<div v-if="mysql.dbTables.length>0">
			<h5>表名:</h5>
			<el-radio-group v-model="mysql.selectTable" @change="changeTable">
				<el-row>
					<el-col :span="8" v-for="item in mysql.dbTables" :key="item">
						<el-radio :label="item">{{item}}</el-radio>
					</el-col>
				</el-row>
			</el-radio-group>
		</div>
		<el-row :gutter="10" v-if="mysql.dbFileds.length>0">
			<h5>字段名:</h5>
			<el-col :span="8" v-for="item in mysql.dbFileds" :key="item.input" style="margin-top:5px;">
				<item-filed @checkChange="checkChange" :filed.sync="item"></item-filed>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import ItemFiled from './common/ItemFiled'
import Api from '../utils/api'
export default {
  name: 'mysql-view',
  props: {
    mysql: Object
  },
  methods: {
    getDatabase () {
      this.mysql.dbs = []
      /* this.$refs.input_mysql.$refs.mysql.validate(valid => {
        if (valid) { */
      let input = {}
      input['input.type'] = 'mysql'
      input['input.username'] = this.mysql.input.username
      input['input.password'] = this.mysql.input.password
      input['input.url'] = this.mysql.input.url
      input['input.port'] = this.mysql.input.port
      Api.getDatabase(input).then(data => {
        this.mysql.dbs = data
        this.mysql.dbTables = []
        this.mysql.dbFileds = []
      })
      /*  } else {
          return false
        } */
      /* }) */
    },
    changeDB () {
      let input = {}
      input['input.type'] = 'mysql'
      input['input.username'] = this.mysql.input.username
      input['input.password'] = this.mysql.input.password
      input['input.url'] = this.mysql.input.url
      input['input.port'] = this.mysql.input.port
      input['input.database'] = this.mysql.selectDb
      Api.getTable(input).then(data => {
        this.mysql.dbTables = data
        this.mysql.dbFileds = []
      })
    },
    changeTable () {
      this.mysql.dbFileds = []
      let input = {}
      input['input.type'] = 'mysql'
      input['input.username'] = this.mysql.input.username
      input['input.password'] = this.mysql.input.password
      input['input.url'] = this.mysql.input.url
      input['input.port'] = this.mysql.input.port
      input['input.database'] = this.mysql.selectDb
      input['input.table'] = this.mysql.selectTable
      Api.getColumns(input).then(data => {
        data.forEach((item, index) => {
          let column = {}
          column.input = item
          column.output = item
          column.isdisabled = true
          column.checked = false
          this.mysql.dbFileds.push(column)
        })
      })
    },
    addColums () {
      this.mysql.dbFileds.push({
        input: '',
        output: '',
        isdisabled: true,
        checked: false
      })
    },
    comfirmTo () {
      let send = {}
      let inputArray = []
      let outputArray = []
      send['input.type'] = this.form.db.input
      send['input.username'] = this.mysql.input.username
      send['input.password'] = this.mysql.input.password
      send['input.url'] = this.mysql.input.url
      send['input.port'] = this.mysql.input.port
      send['input.database'] = this.mysql.selectDb
      send['input.table'] = this.mysql.selectTable
      send['output.type'] = this.form.db.output
      send['output.username'] = this.mysql.output.username
      send['output.password'] = this.mysql.output.password
      send['output.url'] = this.mysql.output.url
      send['output.port'] = this.mysql.output.port
      send['output.table'] = this.mysql.output.table
      send['output.database'] = this.mysql.output.database
      this.mysql.selectDbFileds.forEach(item => {
        outputArray.push(item.output)
        inputArray.push(item.input)
      })
      send['input.converter'] = inputArray.join(',')
      send['output.converter'] = outputArray.join(',')
      Api.getConfigInfo(send).then(data => {
        console.log(data)
      })
    }
  },
  components: {
    ItemFiled
  }
}
</script>
