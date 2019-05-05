const defaults = {
  logined: false,
  email: null,
}

const session = {
  namespaced: true,
  state: {
    auth: defaults
  }
  ,
  mutations: {
    update(state, data) {
      state.auth = data;
    },
    clear(state) {
      state.auth = defaults;
    }
  },
  actions: {
    updateSession({ commit }, data) {
      commit('update', data);
    },
    clearSession({ commit }) {
      commit('clear');
    }
  }
}

export default session;