const getDefaultState = () => {
  return {
    token: '',
    user: {},
    language: 'en'
  };
};

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    isLogged: state => state.token,
    getUser: state => state.user,
    getToken: state => state.token,
    getLanguage: state => state.language,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    },
    SET_LANGUAGE: (state, language: string) => {
      state.language = language
    }
  },
  actions: {
    login: ({ commit }, { token, user }) => {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    },
    setLanguage: ({ commit }, { language }) => {
      commit('SET_LANGUAGE', language)
    }
  }
}