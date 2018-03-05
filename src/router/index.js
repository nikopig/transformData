import Vue from 'vue'
import Router from 'vue-router'
// import ContentView from '@/components/ContentView'
// import seviceList from '@/pages/seviceList'
// import exceptionInfo from '@/pages/exceptionInfo'
// import failRecord from '@/pages/failRecord'
// import login from '@/pages/login'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: resolve => require(['../pages/login'], resolve)
        },
        {
            path: '/ContentView',
            name: 'ContentView',
            component: resolve => require(['../pages/ContentView'], resolve)
        },
        {
            path: '/seviceList',
            name: 'seviceList',
            component: resolve => require(['../pages/seviceList'], resolve)
        },
        {
            path: '/log',
            name: 'log',
            component: resolve => require(['../pages/log'], resolve)
        }
    ]
})
