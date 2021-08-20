import { createWebHistory, createRouter } from "vue-router";
import ArtistList from "../Artist/ArtistList.vue";
import AlbumList from "../Album/AlbumList.vue";
import RandomSongs from "../Navigation/Random/RandomSongs.vue"

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
    path: "/random/songs/:limit?",
    name: "Random songs",
    component: RandomSongs
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;