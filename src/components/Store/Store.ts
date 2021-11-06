import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import AuthStorage from './Modules/AuthStorage';
import FavoriteStorage from './Modules/FavoriteStorage';

// Create a new store instance.
const Store = createStore({
  strict: true,
  plugins: [createPersistedState()],
  modules: {
    authStorage: AuthStorage,
    favorites: FavoriteStorage,
  }
})

export default Store;