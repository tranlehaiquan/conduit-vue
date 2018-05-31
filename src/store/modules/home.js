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
  SET_ARTICLES,
  UPDATE_LIST_ARTICLE
} from '@/store/mutations.type'

const state = {
  articles: {
    data: [],
    articlesCount: 0,
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
    return HomeArticles.get(params)
      .then(({data}) => {
        const {articles, articlesCount} = data
        commit(SET_ARTICLES, {articles, articlesCount})
      })
  },
  [FETCH_FEED_ARTICLES] ({commit}, params) {
    commit(START_FETCH_ARTICLES)
    return HomeArticles.getFeed(params)
      .then(({data}) => {
        const {articles, articlesCount} = data
        commit(SET_ARTICLES, {articles, articlesCount})
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
  [SET_ARTICLES] (state, payload) {
    const {articles, articlesCount} = payload
    state.articles = {
      data: articles,
      articlesCount,
      error: '',
      isLoading: false
    }
  },
  [UPDATE_LIST_ARTICLE] (state, article) {
    state.articles.data = state.articles.data.map((articleIndex) => {
      if (articleIndex.slug !== article.slug) return articleIndex

      articleIndex.favorited = article.favorited
      articleIndex.favoritesCount = article.favoritesCount
      return articleIndex
    })
  }
}

export default {
  state,
  actions,
  mutations
}
