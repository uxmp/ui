import {defineStore} from 'pinia'
import HttpRequest from "../Lib/HttpRequest";
import {AxiosResponse} from "axios";

interface State {
    favorites: {
        albums: {},
        songs: {},
        artists: {}
    },
}

export const useFavoriteStore = defineStore('favorites', {
    state: (): State => ({
        favorites: {
            albums: {},
            songs: {},
            artists: {}
        }
    }),
    getters: {
        list: (state: State): object => state.favorites
    },
    actions: {
        init(favorites: State): void {
            this.state = favorites;
        },
        addItem(itemId: number, itemType: string): void {
            HttpRequest.post(
                'user/favorite/' + itemType + '/add',
                {
                    'itemId': itemId
                }
            ).then((response: AxiosResponse) => {
                if (response.data.result === true) {
                    console.log(this.favorites)
                    this.favorites[itemType][itemId] = new Date();
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
                    console.log(this.favorites)
                    if (itemId in this.favorites[itemType]) {
                        delete this.favorites[itemType][itemId];
                    }
                }
            })
        },
        reset(): void {
          this.$reset()
        }
    }
})
