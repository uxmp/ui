import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const getDefaultState = () => {
  return {
    token: '',
    user: {}
  };
};

// Create a new store instance.
const store = createStore({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isLogged: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    }
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
    }
  },
  actions: {
    login: ({ commit, dispatch }, { token, user }) => {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    }
  }
})

export default store;