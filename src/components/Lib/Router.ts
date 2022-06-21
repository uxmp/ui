import { createWebHistory, createRouter } from "vue-router";
import ArtistList from "../Artist/ArtistListView.vue";
import AlbumList from "../Album/AlbumListView.vue";
import RandomSongs from "../Random/RandomSongsView.vue"
import Login from "../Home/LoginView.vue"
import AlbumView from "../Album/AlbumView.vue"
import AlbumFavoriteView from "../Album/AlbumFavoriteView.vue"
import AlbumListByGenreView from "../Album/AlbumListByGenreView.vue"
import ArtistView from "../Artist/ArtistView.vue"
import HomeView from "../Home/HomeView.vue"
import Store from "../Store/Store";
import RadioStationList from "../RadioStation/RadioStationList.vue"
import RadioStationEdit from "../RadioStation/RadioStationEdit.vue"
import UserSettingsView from "../User/UserSettingsView.vue"
import PlaylistList from "../Playlist/PlaylistList.vue"
import PlaylistEdit from "../Playlist/PlaylistEdit.vue"
import PlaylistView from "../Playlist/PlaylistView.vue"

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/artists",
    component: ArtistList,
  },
  {
    path: "/albums",
    component: AlbumList,
  },
  {
    path: "/albums/genre/:genreId",
    component: AlbumListByGenreView,
  },
  {
    path: "/albums/favorite",
    component: AlbumFavoriteView
  },
  {
    path: "/album/:albumId",
    component: AlbumView,
  },
  {
    path: "/artist/:artistId",
    component: ArtistView,
  },
  {
    path: "/random/songs/:limit?",
    component: RandomSongs
  },
  {
    path: "/radiostations",
    component: RadioStationList
  },
  {
    path: "/radiostation/edit/:stationId?",
    component: RadioStationEdit,
  },
  {
    name: "Login",
    path: "/login",
    component: Login
  },
  {
    path: "/usersettings",
    component: UserSettingsView
  },
  {
    path: "/playlists",
    component: PlaylistList
  },
  {
    path: "/playlist/edit/:playlistId?",
    component: PlaylistEdit,
  },
  {
    path: "/playlist/:playlistId?",
    component: PlaylistView,
  },
];

const Router = createRouter({
  history: createWebHistory(),
  routes,
});

Router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !Store.getters['authStorage/isLogged']) next({ path: 'Login' })
  else next()
})

export default Router;