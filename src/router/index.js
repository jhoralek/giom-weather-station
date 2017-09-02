import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Today from '@/components/Today'
import TodayDetail from '@/components/TodayDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/today',
      name: 'today',
      component: Today
    },
    {
      path: '/today/detail',
      name: 'today-detail',
      component: TodayDetail
    }
  ]
})
