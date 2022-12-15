import { createStore } from 'vuex'

export default createStore({
  state: {
    token: sessionStorage.getItem('token')||'',
    isAuthenticated: false,
    userInfo:localStorage.getItem('currentItem')||{}

  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if (sessionStorage.getItem('token')) {
        state.token = sessionStorage.getItem('token')!
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    removeUserInfo(state) {
      state.userInfo = {}
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    }
  },
  actions: {
  },
  modules: {
  }
})
