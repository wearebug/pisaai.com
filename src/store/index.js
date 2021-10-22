import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HILI',
      paths: ['userInfo'],
      storage: window.localStorage,
    }),
    createPersistedState({
      key: 'NUMI',
      paths: ['userNumews'],
      storage: window.localStorage,
    }),
  ],
  state: {
    userInfo: null,
    userNumews: null
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setNumew(state, info) {
      state.userNumews = info
    },
    removeUserInfo(state) {
      state.userInfo = null
    },
    removeSetNumew(state) {
      state.userNumews = 0
    },
  },
})

export default store
