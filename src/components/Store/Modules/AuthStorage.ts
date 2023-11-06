import UserInterface from "../../../model/UserInterface";
import AclEnum from "../../Lib/Enum/AclEnum";

export interface AuthStorageState {
  token: string,
  user: UserInterface|null,
  language: string,
  temporaryPlaylistId: string|null,
  acl: Array<Number>,
}

const getDefaultState = () => {
  return {
    token: '' as string,
    user: null as null|UserInterface,
    language: 'en' as string,
    temporaryPlaylistId: null as null|string,
    acl: [] as Array<number>,
  };
};

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    isLogged: (state: AuthStorageState): boolean => state.token !== '',
    getUser: (state: AuthStorageState): null|UserInterface => state.user,
    getToken: (state: AuthStorageState): string => state.token,
    getLanguage: (state: AuthStorageState): string => state.language,
    getTemporaryPlaylistId: (state: AuthStorageState): null|string => state.temporaryPlaylistId,
    getAcl: (state: AuthStorageState): Array<Number> => state.acl,
    isAdmin: (state: AuthStorageState): boolean => {
      return state.acl.includes(AclEnum.USER_EDIT)
    }
  },
  mutations: {
    SET_TOKEN: (state: AuthStorageState, token: string): void => {
      state.token = token;
    },
    SET_USER: (state: AuthStorageState, user: UserInterface): void => {
      state.user = user;
    },
    RESET: (state: AuthStorageState): void => {
      Object.assign(state, getDefaultState());
    },
    SET_LANGUAGE: (state: AuthStorageState, language: string): void => {
      state.language = language
    },
    SET_TEMPORARY_PLAYLIST_ID: (state: AuthStorageState, temporaryPlaylistId: null|string): void => {
      state.temporaryPlaylistId = temporaryPlaylistId
    },
    SET_ACL: (state: AuthStorageState, acl: Array<number>): void => {
      state.acl = acl
    }
  },
  actions: {
    login: ({ commit }, { token, user }): void => {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
    },
    logout: ({ commit }): void => {
      commit('RESET', '');
    },
    setLanguage: ({ commit }, { language } ): void => {
      commit('SET_LANGUAGE', language)
    },
    setTemporaryPlaylistId: ({ commit }, {temporaryPlaylistId}): void => {
      commit('SET_TEMPORARY_PLAYLIST_ID', temporaryPlaylistId)
    },
    setAcl: ({commit}, {acl}): void => {
      commit('SET_ACL', acl)
    },
  }
}
