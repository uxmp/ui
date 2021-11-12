import { createWebHistory, createRouter } from "vue-router";
import ArtistList from "../Artist/ArtistListView.vue";
import AlbumList from "../Album/AlbumListView.vue";
import RandomSongs from "../Random/RandomSongsView.vue"
import Login from "../Home/LoginView.vue"
import AlbumView from "../Album/AlbumView.vue"
import AlbumFavoriteView from "../Album/AlbumFavoriteView.vue"
import ArtistView from "../Artist/ArtistView.vue"
import HomeView from "../Home/HomeView.vue"
import Store from "../Store/Store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/artists",
    name: "Artists",
    component: ArtistList,
  },
  {
    path: "/albums",
    name: "Albums",
    component: AlbumList,
  },
  {
    path: "/albums/favorite",
    name: "Starred Albums",
    component: AlbumFavoriteView
  },
  {
    path: "/album/:albumId",
    name: "Album",
    component: AlbumView,
  },
  {
    path: "/artist/:artistId",
    name: "ArtistView",
    component: ArtistView,
  },
  {
    path: "/random/songs/:limit?",
    name: "Random songs",
    component: RandomSongs
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
];

const Router = createRouter({
  history: createWebHistory(),
  routes,
});

Router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !Store.getters['authStorage/isLogged']) next({ name: 'Login' })
  else next()
})

export default Router;