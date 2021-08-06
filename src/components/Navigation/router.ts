import { createWebHistory, createRouter } from "vue-router";
import ArtistList from "../Artist/ArtistList.vue";
import AlbumList from "../Album/AlbumList.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;