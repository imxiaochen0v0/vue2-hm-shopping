export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      userInfo: {
        token: '',
        userId: ''
      }
    }
  },
  getters: {
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
  }
}
