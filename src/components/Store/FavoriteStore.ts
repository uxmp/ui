import {defineStore} from 'pinia'
import HttpRequest from "../Lib/HttpRequest";
import {AxiosResponse} from "axios";

interface State {
    favorites: Array<string>,
}

export const useFavoriteStore = defineStore('favorites', {
    persist: true,
    state: (): State => ({
        favorites: []
    }),
    getters: {
        list: (state: State): Array<string> => state.favorites
    },
    actions: {
        init(favorites: Array<string>): void {
            this.favorites = favorites;
        },
        addItem(itemId: number, itemType: string): void {
            HttpRequest.post(
                'user/favorite/' + itemType + '/add',
                {
                    'itemId': itemId
                }
            ).then((response: AxiosResponse): void => {
                if (response.data.result === true) {
                    this.favorites.push(itemType + '_' + itemId)
                }
            })
        },
        removeItem(itemId: number, itemType: string): void {
            HttpRequest.post(
                'user/favorite/' + itemType + '/remove',
                {
                    'itemId': itemId
                }
            ).then((response: AxiosResponse) => {
                if (response.data.result === true) {
                    const key = itemType + '_' + itemId;

                    this.favorites = this.favorites.filter((item: string): boolean => item !== key)
                }
            })
        },
        reset(): void {
          this.$reset()
        }
    }
})
