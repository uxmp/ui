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
  },
  mutations: {
    INIT: (state, favorites) => {
      state.favorites = favorites;
    },
    ADD_ITEM: (state, { itemId, itemType} ) => {
      state.favorites[itemType][itemId] = + new Date();
    },
    REMOVE_SONG: (state, { itemId, itemType } ) => {
      if (itemId in state.favorites[itemType]) {
        delete state.favorites[itemType][itemId];
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
    addItem: ({ commit }, { itemId, itemType }) => {
      HttpRequest.post(
        'user/favorite/' + itemType + '/add',
        {
          'itemId': itemId
        }
      ).then((response: AxiosResponse) => {
        if (response.data.result === true) {
          commit('ADD_ITEM', { itemId, itemType })
        }
      })
    },
    removeItem: ({ commit }, { itemId, itemType }) => {
      HttpRequest.post(
        'user/favorite/' + itemType + '/remove',
        {
          'itemId': itemId
        }
      ).then((response: AxiosResponse) => {
        if (response.data.result === true) {
          commit('REMOVE_SONG', { itemId, itemType })
        }
      })
    },
    reset: ({ commit }) => {
      commit('RESET');
    }
  }
}