import {
  TagsService,
  HomeArticles
} from '@/api'
import {
  FETCH_TAGS,
  FETCH_ARTICLES,
  FETCH_FEED_ARTICLES
} from '@/store/actions.type'
import {
  START_FETCH_TAGS,
  SET_TAGS,
  START_FETCH_ARTICLES,
  SET_ARTICLES
} from '@/store/mutations.type'

const state = {
  articles: {
    data: [],
    isLoading: false,
    error: ''
  },
  tags: {
    data: [],
    isLoading: false,
    error: ''
  }
}

const actions = {
  [FETCH_TAGS] ({commit}) {
    commit(START_FETCH_TAGS)
    TagsService.get()
      .then(({data}) => {
        commit(SET_TAGS, data.tags)
      })
      .catch(({response}) => {

      })
  },
  [FETCH_ARTICLES] ({commit}, params) {
    commit(START_FETCH_ARTICLES)
    HomeArticles.get(params)
      .then(({data}) => {
        commit(SET_ARTICLES, data.articles)
      })
      .catch(({response}) => {
      })
  },
  [FETCH_FEED_ARTICLES] ({commit}, params) {
    commit(START_FETCH_ARTICLES)
    HomeArticles.getFeed(params)
      .then(({data}) => {
        commit(SET_ARTICLES, data.articles)
      })
      .catch(({response}) => {
      })
  }
}

const mutations = {
  [START_FETCH_TAGS] (state) {
    state.tags = {
      isLoading: true,
      data: [],
      error: ''
    }
  },
  [SET_TAGS] (state, tags) {
    state.tags = {
      isLoading: false,
      data: tags,
      error: ''
    }
  },
  [START_FETCH_ARTICLES] () {
    state.articles = {
      data: [],
      error: '',
      isLoading: true
    }
  },
  [SET_ARTICLES] (state, articles) {
    state.articles = {
      data: articles,
      error: '',
      isLoading: false
    }
  }
}

export default {
  state,
  actions,
  mutations
}
