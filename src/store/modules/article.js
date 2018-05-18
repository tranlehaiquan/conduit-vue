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
  END_LOAD_ARTICLE
} from '@/store/mutations.type'

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
  },
  [UNFAVORITE_ARTICLE] ({commit}, slug) {
    Article.unFavorite(slug)
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
