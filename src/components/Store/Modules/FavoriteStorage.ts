const getDefaultState = () => {
  return {
    favorites: {
      albums: [],
      songs: [],
      artists: [],
    },
  };
};

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    getList: state => state.favorites,
    getAlbums: state => state.favorites.albums,
    getSongs: state => state.favorites.songs,
    getArtists: state => state.favorites.artists,
  },
  mutations: {
    INIT: (state, favorites) => {
      state.favorites = favorites;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    init: ({ commit }, { favorites }) => {
      commit('INIT', favorites)
    },
    reset: ({ commit }) => {
      commit('RESET');
    }
  }
}