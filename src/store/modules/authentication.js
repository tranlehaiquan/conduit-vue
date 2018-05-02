import ApiService, { Auth } from '@/api'
import {getJWTFromStorage, removeJWTFromStorage} from '@/api/localStorage'
import {
  REGISTER_ACCOUNT,
  LOGIN_ACCOUNT,
  LOGOUT_ACCOUNT,
  CHECK_AUTH
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
  isLogin: false
}

const actions = {
  [REGISTER_ACCOUNT] ({commit}, user) {

  },
  [LOGIN_ACCOUNT] ({commit}, user) {
    return new Promise((resolve, reject) => {
      Auth.login(user)
        .then(({data}) => {
          commit(SET_ACCOUNT, {
            ...data.user
          })
          resolve(data)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  },
  [LOGOUT_ACCOUNT] ({commit}) {
    removeJWTFromStorage()
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
