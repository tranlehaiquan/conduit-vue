import {
  Article
} from '@/api'
import {
  FETCH_COMMENT,
  FETCH_ARTICLE
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
  [START_LOAD_ARTICLE] () {

  },
  [END_LOAD_ARTICLE] () {

  },
  [START_LOAD_COMMENT] () {

  }
}