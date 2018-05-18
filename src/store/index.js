import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/modules/home'
import authentication from '@/store/modules/authentication'
import article from '@/store/modules/article'

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
    article
  }
})

export default store
