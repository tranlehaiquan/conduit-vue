import {
  Article
} from '@/api'
import {
  FETCH_COMMENT,
  FETCH_ARTICLE,
  FAVORITE_ARTICLE,
  UNFAVORITE_ARTICLE,
  ADD_COMMENT,
  REMOVE_COMMENT,
  DELETE_ARTICLE,
  UPDATE_ARTICLE,
  CREATE_ARTICLE,
  SET_AUTHOR_ARTICLE
} from '@/store/actions.type'
import {
  START_LOAD_ARTICLE,
  END_LOAD_ARTICLE,
  SET_ARTICLE,
  UPDATE_LIST_ARTICLE,
  UPDATE_COMMENT
} from '@/store/mutations.type'

const state = {
  article: {
    isLoading: false,
    data: {
      author: {},
      body: '',
      createdAt: '',
      description: '',
      favorited: false,
      favoritesCount: 0,
      slug: '',
      tagList: [],
      title: '',
      updatedAt: ''
    }
  },
  comments: {
    isLoading: false,
    data: []
  }
}

const actions = {
  [FETCH_ARTICLE] ({ commit }, slug) {
    commit(START_LOAD_ARTICLE)
    return Article.get(slug)
      .then(({ data }) => {
        commit(END_LOAD_ARTICLE, data.article)
      })
  },
  async [FAVORITE_ARTICLE] ({ commit }, slug) {
    try {
      const { data } = await Article.favorite(slug)
      commit(UPDATE_LIST_ARTICLE, data.article, { root: true })
      commit(SET_ARTICLE, data.article)
    } catch (errors) {
      return Promise.reject(errors)
    }
  },
  async [UNFAVORITE_ARTICLE] ({ commit }, slug) {
    try {
      const { data } = await Article.unFavorite(slug)
      commit(UPDATE_LIST_ARTICLE, data.article, { root: true })
      commit(SET_ARTICLE, data.article)
    } catch (errors) {
      return Promise.reject(errors)
    }
  },
  [FETCH_COMMENT] ({ commit }, slug) {
    commit(UPDATE_COMMENT, { data: [], isLoading: true })
    Article.getComment(slug)
      .then(({ data }) => {
        commit(UPDATE_COMMENT, {
          data: data.comments,
          isLoading: false
        })
      })
      .catch(({ response }) => {
      })
  },
  [ADD_COMMENT] ({ commit, state }, payload) {
    const { slug, comment } = payload
    Article.addComment(slug, comment)
      .then(({ data }) => {
        state.comments.data.unshift(data.comment)
        commit(UPDATE_COMMENT, {
          data: state.comments.data,
          isLoading: false
        })
      })
      .catch(({ response }) => {
      })
  },
  [REMOVE_COMMENT] ({ commit, state }, payload) {
    const { slug, id } = payload
    Article.removeComment(slug, id)
      .then(({ data }) => {
        const comments = state.comments.data.filter((comment) => comment.id !== id)
        commit(UPDATE_COMMENT, {
          data: comments,
          isLoading: false
        })
      })
      .catch(({ response }) => {
      })
  },
  [DELETE_ARTICLE] ({ commit }, slug) {
    return Article.deleteArticle(slug)
  },
  [UPDATE_ARTICLE] ({ commit }, payload) {
    const { slug, article } = payload
    return Article.updateArticle(slug, article)
  },
  [CREATE_ARTICLE] ({ commit }, article) {
    return Article.createArticle(article)
  },
  [SET_AUTHOR_ARTICLE] ({ commit, state }, author) {
    const article = Object.assign({}, state.article.data, { author })
    commit(SET_ARTICLE, article)
  }
}

const getters = {
}

const mutations = {
  [START_LOAD_ARTICLE] (state) {
    state.article = {
      isLoading: true,
      data: {}
    }
  },
  [END_LOAD_ARTICLE] (state, article) {
    state.article = {
      isLoading: false,
      data: article
    }
  },
  [SET_ARTICLE] (state, article) {
    state.article.data = article
  },
  [UPDATE_COMMENT] (state, comments) {
    state.comments = comments
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
