import { defineStore } from 'pinia'
import UserInterface from "../../model/UserInterface";
import AclEnum from "../Lib/Enum/AclEnum";

interface State {
  user: null|UserInterface,
  token: string,
  language: string,
  temporaryPlaylistId: null|string,
  acl: Array<number>,
}

export const useUserStore = defineStore('user', {
  persist: true,
  state: (): State => ({
    user: null,
    token: '',
    language: 'en',
    temporaryPlaylistId: null,
    acl: []
  }),
  getters: {
    getTemporaryPlaylistId: (state: State): string|null => state.temporaryPlaylistId,
    hasUserSession: (state: State): boolean => state.user !== null && state.token !== '',
    isAdmin: (state: State): boolean => {
      return state.acl.includes(AclEnum.USER_EDIT)
    }
  },
  actions: {
    login(token: string, user: UserInterface|null): void {
      this.token = token;
      this.user = user;
    },
    logout(): void {
      this.$reset()
    },
    setLanguage(language: string): void {
      this.language = language;
    },
    setTemporaryPlaylistId(temporaryPlaylistId: string): void {
      this.temporaryPlaylistId = temporaryPlaylistId;
    },
    setAcl(acl: Array<number>): void {
      this.acl = acl
    },
  },
})
