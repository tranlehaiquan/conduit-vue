import { Profile } from '@/api'
import {FOLLOW_USER, UNFOLLOW_USER, FETCH_PROFILE, COPY_PROFILE} from '@/store/actions.type'
import {SET_PROFILE} from '@/store/mutations.type'

const state = {
  user: {
    bio: null,
    image: null,
    username: '',
    following: false
  },
  isLoading: false
}

const getters = {

}

const actions = {
  [FETCH_PROFILE] ({commit}, username) {
    commit(SET_PROFILE, {user: {}, isLoading: true})
    return Profile.get(username)
      .then(({data}) => {
        commit(SET_PROFILE, {user: data.profile, isLoading: false})
      })
  },
  [COPY_PROFILE] ({commit}, user) {
    commit(SET_PROFILE, {user, isLoading: false})
  },
  [FOLLOW_USER] ({commit}, username) {
    Profile.follow(username)
      .then(({data}) => {
        commit(SET_PROFILE, {user: data.profile, isLoading: false})
      })
  },
  [UNFOLLOW_USER] ({commit}, username) {
    Profile.unFollow(username)
      .then(({data}) => {
        commit(SET_PROFILE, {user: data.profile, isLoading: false})
      })
  }
}

const mutations = {
  [SET_PROFILE] (state, payload) {
    const {user, isLoading} = payload
    state.user = user
    state.isLoading = isLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
