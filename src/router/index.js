import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import GiomCharts from '@/components/GiomCharts'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/',
      name: 'giomCharts',
      component: GiomCharts
    }
  ]
})
