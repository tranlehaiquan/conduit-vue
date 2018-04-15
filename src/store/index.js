import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articles: [],
    tags: []
  },
  mutations: {
    getMultipleArticle (state, articles) {
      state.articles = articles
    },
    getHomeTags (state, tags) {
      state.tags = tags
    }
  }
})

export default store
