import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/modules/home'
import authentication from '@/store/modules/authentication'
import article from '@/store/modules/article'
import profile from '@/store/modules/profile'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  actions: {
  },
  mutations: {
  },
  modules: {
    home,
    authentication,
    article,
    profile
  }
})

export default store
