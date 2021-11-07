const getDefaultState = () => {
  return {
    favorites: {
      albums: {},
      songs: {},
      artists: {},
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
    ADD_SONG: (state, songId: number) => {
      state.favorites.songs[songId] = + new Date();
    },
    REMOVE_SONG: (state, songId: number) => {
      if (songId in state.favorites.songs) {
        delete state.favorites.songs[songId];
      }
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    init: ({ commit }, { favorites }) => {
      commit('INIT', favorites)
    },
    addSong: ({ commit }, { songId }) => {
      commit('ADD_SONG', songId)
    },
    removeSong: ({ commit }, { songId }) => {
      commit('REMOVE_SONG', songId)
    },
    reset: ({ commit }) => {
      commit('RESET');
    }
  }
}