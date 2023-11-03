<template>
  <div class="box">
    <div class="head">{{ $t("songs.title") }}</div>
    <router-link to="/random/songs/50">{{ $t("songs.random") }}</router-link>
    <span class="random_select">
      <router-link to="/random/songs/50">50</router-link> /
      <router-link to="/random/songs/250">250</router-link> /
      <router-link to="/random/songs/500">500</router-link>
    </span>
  </div>

  <div class="box">
    <div class="head">{{ $t("album_list.title") }}</div>
    <router-link to="/albums">{{ $t("album_list.title") }}</router-link>
    <router-link to="/albums/favorite">{{ $t("album_list.favorites") }}</router-link>
  </div>

  <div class="box">
    <div class="head">{{ $t("artist_list.title") }}</div>
    <router-link to="/artists">{{ $t("artist_list.title") }}</router-link>
  </div>

  <div class="box">
    <div class="head">{{ $t("playlists.title") }}</div>
    <router-link to="/playlists">{{ $t("playlists.title") }}</router-link>
  </div>

  <div class="box">
    <div class="head">{{ $t("radio_stations.title") }}</div>
    <router-link to="/radiostations">{{ $t("radio_stations.title") }}</router-link>
  </div>

  <div class="box" v-if="isAdmin()">
    <div class="head">{{ $t("settings.title") }}</div>
    <router-link to="/settings/user">{{ $t("settings.user.title") }}</router-link>
    <router-link to="/settings/catalogs">{{ $t("settings.catalogs.title") }}</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
  emits: ['hidePlayer'],
  methods: {
    isAdmin(): boolean {
      return this.$store.getters['authStorage/isAdmin'] == true;
    }
  },
})
</script>

<style scoped>
div.box:first-of-type {
  margin-top: 10px;
}

div.box {
  border: 1px #446683 solid;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #0a0f14;
  margin-right: 10px;
  margin-bottom: 15px;
  text-align: left;
}

div.box a {
  display: block;
  margin-left: 30px;
}

div.box div.head {
  font-size: 110%;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 15px;
}

div.box span.random_select a {
  font-size: 80%;
  display: inline;
  margin-left: 0;
}

div.box span.random_select a:first-of-type {
  margin-left: 30px;
}
</style>
