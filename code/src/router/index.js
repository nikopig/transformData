import Vue from 'vue'
import Router from 'vue-router'
import ContentView from '@/components/ContentView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ContentView',
      component: ContentView
    }
  ]
})
