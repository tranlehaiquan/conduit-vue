// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ApiService from '@/api'
import store from '@/store'

Vue.config.productionTip = false
ApiService.init()

store.dispatch('CHECK_AUTH')
  .then(() => {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      store,
      router,
      components: { App },
      template: '<App/>'
    })
  })
