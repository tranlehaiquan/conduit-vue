import Vue from 'vue'
import App from './App'
import router from './router'
import ApiService from '@/api'
import store from '@/store'
import './assets/styles/app.css'

Vue.config.productionTip = false
ApiService.init()

router.beforeEach((to, from, next) => {
  const { user } = store.state.authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user.username) {
      next({
        name: 'SignIn',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// Use Promise race to make sure
// If Check auth get to long than 500 ms
// Generate Vue instance
// Just avoid blank page
Promise.race([
  store.dispatch('CHECK_AUTH')
]).then(() => {
  /* eslint-disable no-new */
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
})
