import {FOLLOW_USER, UNFOLLOW_USER, FETCH_PROFILE} from '@/store/actions.type'
import {SET_PROFILE} from '@/store/mutations.type'

const state = {
  user: {
    bio: null,
    createdAt: '',
    email: '',
    id: null,
    image: null,
    token: '',
    updatedAt: '',
    username: ''
  }
}

const getters = {

}

const actions = {
  [FETCH_PROFILE] ({commit}, username) {
    console.log(username)
  },
  [FOLLOW_USER] ({commit}, username) {
  },
  [UNFOLLOW_USER] ({commit}, username) {
  }
}

const mutations = {
  [SET_PROFILE] (state, payload) {
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
