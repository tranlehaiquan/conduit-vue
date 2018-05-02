import {
  TagsService,
  HomeArticles
} from '@/api'
import {
  FETCH_TAGS,
  FETCH_ARTICLES
} from '@/store/actions.type'
import {
  SET_TAGS,
  SET_ARTICLES,
  SET_ARTICLES_LOADING
} from '@/store/mutations.type'

const state = {
  articles: [],
  tags: [],
  articlesIsLoading: false
}

const actions = {
  [FETCH_TAGS] (context) {
    TagsService.get()
      .then(({data}) => {
        context.commit(SET_TAGS, data.tags)
      })
  },
  [FETCH_ARTICLES] (context, slug) {
    HomeArticles.get(slug)
      .then(({data}) => {
        context.commit(SET_ARTICLES, data.articles)
      })
  }
}

const mutations = {
  [SET_TAGS] (state, playload) {
    state.tags = playload
  },
  [SET_ARTICLES] (state, playload) {
    state.articles = playload
  },
  [SET_ARTICLES_LOADING] (state, isloading) {
    state.articlesIsLoading = isloading
  }
}

export default {
  state,
  actions,
  mutations
}
