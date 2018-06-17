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
  SET_TAGS,
  SET_ARTICLES,
  UPDATE_LIST_ARTICLE
} from '@/store/mutations.type'

const state = {
  articles: {
    data: [],
    articlesCount: 0,
    error: ''
  },
  tags: {
    data: [],
    error: ''
  }
}

const actions = {
  async [FETCH_TAGS] ({commit}) {
    const {data} = await TagsService.get()
    commit(SET_TAGS, data.tags)
  },
  async [FETCH_ARTICLES] ({commit}, params) {
    const {data} = await HomeArticles.get(params)
    const {articles, articlesCount} = data
    commit(SET_ARTICLES, {articles, articlesCount})
  },
  async [FETCH_FEED_ARTICLES] ({commit}, params) {
    const {data} = await HomeArticles.getFeed(params)
    const {articles, articlesCount} = data
    commit(SET_ARTICLES, {articles, articlesCount})
  }
}

const mutations = {
  [SET_TAGS] (state, tags) {
    state.tags = {
      data: tags,
      error: ''
    }
  },
  [SET_ARTICLES] (state, payload) {
    const {articles, articlesCount} = payload
    state.articles = {
      data: articles,
      articlesCount,
      error: ''
    }
  },
  [UPDATE_LIST_ARTICLE] (state, article) {
    state.articles.data = state.articles.data.map((articleIndex) => {
      if (articleIndex.slug !== article.slug) return articleIndex

      const {favorited, favoritesCount} = article
      return {favorited, favoritesCount}
    })
  }
}

export default {
  state,
  actions,
  mutations
}
