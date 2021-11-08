import { AxiosResponse } from "axios";
import HttpRequest from "../../Lib/HttpRequest";

const getDefaultState = () => {
  return {
    favorites: {
      album: {},
      song: {},
      artist: {},
    },
  };
};

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    getList: state => state.favorites,
    getAlbums: state => state.favorites.album,
    getSongs: state => state.favorites.song,
    getArtists: state => state.favorites.artist,
  },
  mutations: {
    INIT: (state, favorites) => {
      state.favorites = favorites;
    },
    ADD_SONG: (state, songId: number) => {
      state.favorites.song[songId.toString()] = + new Date();
    },
    REMOVE_SONG: (state, songId: number) => {
      if (songId.toString() in state.favorites.songs) {
        delete state.favorites.song[songId.toString()];
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
      HttpRequest.post(
        'user/favorite/song/add',
        {
          'itemId': songId
        }
      ).then((response: AxiosResponse) => {
        if (response.data.result === true) {
          commit('ADD_SONG', songId)
        }
      })
    },
    removeSong: ({ commit }, { songId }) => {
      HttpRequest.post(
        'user/favorite/song/remove',
        {
          'itemId': songId
        }
      ).then((response: AxiosResponse) => {
        if (response.data.result === true) {
          commit('REMOVE_SONG', songId)
        }
      })
    },
    reset: ({ commit }) => {
      commit('RESET');
    }
  }
}