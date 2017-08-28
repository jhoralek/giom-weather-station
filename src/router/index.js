import Vue from 'vue'
import Router from 'vue-router'
import GiomCharts from '@/components/GiomCharts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'giomCharts',
      component: GiomCharts
    }
  ]
})
