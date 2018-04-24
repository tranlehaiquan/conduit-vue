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
  SET_ARTICLES
} from '@/store/mutations.type'

const state = {
  articles: [],
  tags: []
}

const actions = {
  [FETCH_TAGS] (context) {
    TagsService.get()
      .then(({data}) => {
        context.commit(SET_TAGS, data.tags)
      })
  },
  [FETCH_ARTICLES] (context) {
    HomeArticles.get()
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
  }
}

export default {
  state,
  actions,
  mutations
}
