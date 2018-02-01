import Vue from 'vue'
import Router from 'vue-router'
import ContentView from '@/components/ContentView'
import seviceList from '@/pages/seviceList'
import exceptionInfo from '@/pages/exceptionInfo'
import failRecord from '@/pages/failRecord'
import login from '@/pages/login'
Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '/',
			name: 'login',
			component: login
		},
    {
			path: '/ContentView',
			name: 'ContentView',
			component: ContentView
		},
		{
			path: '/seviceList',
			name: 'seviceList',
			component: seviceList
		},
		{
			path: '/exceptionInfo',
			name: 'exceptionInfo',
			component: exceptionInfo
		},
		{
			path: '/failRecord',
			name: 'failRecord',
			component: failRecord
		}
  ]
})
