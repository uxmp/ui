import { createWebHistory, createRouter } from "vue-router";
import ArtistList from "../Artist/ArtistList.vue";
import AlbumList from "../Album/AlbumList.vue";
import RandomSongs from "../Navigation/Random/RandomSongs.vue"
import Login from "../Auth/Login.vue"
import AlbumView from "../Album/AlbumView.vue"
import ArtistView from "../Artist/ArtistView.vue"

const routes = [
  {
    path: "/artists",
    name: "Artists",
    component: ArtistList,
  },
  {
    path: "/",
    name: "Albums",
    component: AlbumList,
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
  }
];

const Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default Router;