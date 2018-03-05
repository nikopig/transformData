// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
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
    Autocomplete,
    Card,
    Menu,
    Submenu,
    MenuItem,
    DatePicker,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    MessageBox,
    Tooltip,
    Pagination,
    Tabs,
    TabPane
} from 'element-ui'
import './assets/css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './common/style/less/common.less'
import './common/style/less/respone.less'
import './common/style/icon.css'
import App from './App'

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
Vue.use(Card)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(DatePicker)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)

console.log(Submenu.name)
console.log(MenuItem.name)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$alert = (info) => {
    return MessageBox.alert(info, '提示')
}
Vue.prototype.$confirm = (info) => {
    return MessageBox.confirm(info, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
}

// 设置cookie
Vue.prototype.setCookie = function (cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires
}
// 获取cookie
Vue.prototype.getCookie = function (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1)
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
}
// 清除cookie
Vue.prototype.clearCookie = function () {
    if (arguments.length <= 0) return false
    Array.from(arguments).forEach((item) => {
        this.setCookie(item, '', -1)
    })
}

Vue.prototype.checkLogin = function () {
    let user = this.getCookie('user')
    let pwd = this.getCookie('pwd')
    if (user && pwd) {
        return true
        // let params = {
        //     userName: user,
        //     password: pwd
        // }
        // return Api.post('login', params)
    }
    return false
}

router.beforeEach((to, from, next) => {
    let isLogin = Vue.prototype.checkLogin()
    if (to.name === 'login') {
        if (!isLogin) {
            next()
        } else {
            next({name: 'seviceList'})
        }
    } else if (to.name === 'seviceList') {
        if (!isLogin) {
            next({name: 'login'})
        } else {
            next()
        }
    } else {
        if (!isLogin) {
            next({name: 'login'})
        } else {
            next()
        }
    }
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
