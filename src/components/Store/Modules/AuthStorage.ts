import UserInterface from "../../../model/UserInterface";

const getDefaultState = () => {
  return {
    token: '' as string,
    user: null as null|UserInterface,
    language: 'en' as string,
    temporaryPlaylistId: null as null|string,
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
    getTemporaryPlaylistId: state => state.temporaryPlaylistId,
  },
  mutations: {
    SET_TOKEN: (state, token: string) => {
      state.token = token;
    },
    SET_USER: (state, user: UserInterface) => {
      state.user = user;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    },
    SET_LANGUAGE: (state, language: string) => {
      state.language = language
    },
    SET_TEMPORARY_PLAYLIST_ID: (state, temporaryPlaylistId: null|string) => {
      state.temporaryPlaylistId = temporaryPlaylistId
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
    },
    setTemporaryPlaylistId: ({ commit }, {temporaryPlaylistId}) => {
      commit('SET_TEMPORARY_PLAYLIST_ID', temporaryPlaylistId)
    }
  }
}