import ApiService, { Auth } from '@/api'
import {getJWTFromStorage, removeJWTFromStorage, saveJWTToStorage} from '@/api/localStorage'
import {
  REGISTER_ACCOUNT,
  LOGIN_ACCOUNT,
  LOGOUT_ACCOUNT,
  CHECK_AUTH,
  SET_ERROR,
  UPDATE_PROFILE
} from '@/store/actions.type'
import {
  SET_ACCOUNT,
  REMOVE_ACCOUNT
} from '@/store/mutations.type'

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
  },
  isLogin: false,
  errors: {}
}

const actions = {
  [REGISTER_ACCOUNT] ({commit}, user) {
  },
  [LOGIN_ACCOUNT] ({commit}, user) {
    return Auth.login(user)
      .then(({data}) => {
        commit(SET_ACCOUNT, data.user)
        saveJWTToStorage(data.user.token)
        ApiService.setHeader()
      })
  },
  [LOGOUT_ACCOUNT] ({commit}) {
    removeJWTFromStorage()
    ApiService.setHeader()
    commit(REMOVE_ACCOUNT)
  },
  [CHECK_AUTH] ({commit}) {
    return new Promise((resolve, reject) => {
      if (!getJWTFromStorage()) return resolve()
      ApiService.setHeader()
      Auth.get()
        .then(({data}) => {
          commit(SET_ACCOUNT, {
            ...data.user
          })
          resolve()
        })
    })
  },
  [REGISTER_ACCOUNT] ({commit}, user) {
    return new Promise((resolve, reject) => {
      Auth.register(user)
        .then(({data}) => {
          commit(SET_ACCOUNT, data.user)
          saveJWTToStorage(data.user.token)
          ApiService.setHeader()
          resolve()
        })
        .catch(({response}) => {
          commit(SET_ERROR, response.data.errors)
        })
    })
  },
  [UPDATE_PROFILE] ({commit, state}, user) {
    let {email, username, password, image, bio} = user
    if (!password) password = state.user.password
    return Auth.updateProfile({email, username, password, image, bio})
      .then(({data}) => {
        commit(SET_ACCOUNT, data.user)
      })
  }
}

const mutations = {
  [SET_ACCOUNT] (state, user) {
    state.user = user
    state.isLogin = true
  },
  [REMOVE_ACCOUNT] () {
    state.user = {}
    state.isLogin = false
    state.errors = {}
  },
  [SET_ERROR] (state, errors) {
    state.errors = errors
  }
}

const gets = {
}

export default {
  state,
  actions,
  mutations,
  gets
}
