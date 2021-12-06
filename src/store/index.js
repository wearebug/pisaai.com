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
    userNumews: null,
    userExDate: null
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setNumew(state, info) {
      state.userNumews = info
    },
    setExDate(state, info) {
      if (info == 0) {
        state.userExDate = '无'
      } else {
        let date = new Date(parseInt(info) * 1000)
        let m = date.getMonth() + 1
        state.userExDate = date.getFullYear() + '-' + m + '-' + date.getDate()
      }
    },
    removeUserInfo(state) {
      state.userInfo = null
    },
    removeSetNumew(state) {
      state.userNumews = 0
    },
    removeSetExDate(state) {
      state.userExDate = 0
    },
  },
})

export default store
