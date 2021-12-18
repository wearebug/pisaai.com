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
    userExDate: null,
    showPriceModal: false,
    showLogin: false,
    showQrcode: false,
    curLang: { id: 'zhHans', name: '简体中文' },
    langIndex: 0,
    langs: [
      { id: 'zhHans', name: '简体中文' },
      { id: 'en', name: 'English' },
      { id: 'ja', name: '日本语' },
      { id: 'es', name: 'Español' },
      { id: 'fr', name: 'Français' },
    ],
    showMenuNav: false,
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
        let day = Math.floor((parseInt(info) - new Date().getTime() / 1000) / 86400)
        if (day < 1) {
          state.userExDate = '已过期'
        } else {
          state.userExDate = day + '天'
        }
        // let date = new Date(parseInt(info) * 1000)
        // let m = date.getMonth() + 1
        // state.userExDate = date.getFullYear() + '-' + m + '-' + date.getDate()
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
    save(state, { key, payload }) {
      state[key] = payload
    },
    changeMenuNavShow: (state) => {
      //this.save({ key: 'showMenuNav', payload: !this.showMenuNav })
      state.showMenuNav = !state.showMenuNav
    },
  },
  actions: {
    onLogout({ commit, state }) {
      commit('removeUserInfo')
      commit('removeSetNumew')
      commit('removeSetExDate')
    },
  },
})

export default store
