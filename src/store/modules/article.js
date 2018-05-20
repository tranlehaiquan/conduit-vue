import {
  Article
} from '@/api'
import {
  FETCH_COMMENT,
  FETCH_ARTICLE,
  FAVORITE_ARTICLE,
  UNFAVORITE_ARTICLE
} from '@/store/actions.type'
import {
  START_LOAD_COMMENT,
  END_LOAD_COMMENT,
  START_LOAD_ARTICLE,
  END_LOAD_ARTICLE,
  UPDATE_ARTICLE
} from '@/store/mutations.type'
import { UPDATE_LIST_ARTICLE } from '../mutations.type'

const state = {
  article: {
    isLoading: false,
    data: {}
  },
  comments: {
    isLoading: false,
    data: []
  }
}

const actions = {
  [FETCH_ARTICLE] () {
  },
  [FETCH_COMMENT] () {
  },
  [FAVORITE_ARTICLE] ({commit}, slug) {
    Article.favorite(slug)
      .then(({data}) => {
        commit(UPDATE_LIST_ARTICLE, data.article, {root: true})
        commit(UPDATE_ARTICLE, data.article)
      })
      .catch(({response}) => {

      })
  },
  [UNFAVORITE_ARTICLE] ({commit}, slug) {
    Article.unFavorite(slug)
      .then(({data}) => {
        commit(UPDATE_LIST_ARTICLE, data.article, {root: true})
        commit(UPDATE_ARTICLE, data.article)
      })
      .catch(({response}) => {
      })
  }
}

const getters = {
}

const mutations = {
  [START_LOAD_ARTICLE] () {
  },
  [END_LOAD_ARTICLE] () {
  },
  [START_LOAD_COMMENT] () {
  },
  [END_LOAD_COMMENT] () {
  },
  [UPDATE_ARTICLE] (state, article) {
    state.article.data = article
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
