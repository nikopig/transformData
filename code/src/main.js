// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import {
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Row,
  Col,
  Button,
  ButtonGroup,
  RadioGroup,
  Radio,
  Table,
  TableColumn,
  Checkbox,
  CheckboxGroup,
	Autocomplete
} from 'element-ui'
import './assets/css/normalize.css'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Autocomplete)

Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
