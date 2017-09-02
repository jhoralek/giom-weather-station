// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import VuewMomentJS from 'vue-momentjs'
import Buefy from 'buefy'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import 'buefy/lib/buefy.css'

moment.locale('cs')

Vue.config.productionTip = false
Vue.use(VuewMomentJS, moment)
Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultTooltipType: 'is-dark'
})
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
