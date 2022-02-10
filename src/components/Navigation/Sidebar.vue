<template>
  <h3>{{ $t("home.title") }}</h3>
  <ul>
    <li>
      <router-link to="/">{{ $t("home.title") }}</router-link>
    </li>
  </ul>

  <h3>{{ $t("songs.title") }}</h3>
  <ul>
    <li>
      <router-link to="/random/songs/50">{{ $t("songs.random") }}</router-link>
      <br />
      <span class="random_select">
        <router-link to="/random/songs/50">50</router-link> /
        <router-link to="/random/songs/250">250</router-link> /
        <router-link to="/random/songs/500">500</router-link>
      </span>
    </li>
    <li>
      <router-link to="/random/favorite/50">{{ $t("songs.random_favorites") }}</router-link>
      <br />
      <span class="random_select">
        <router-link to="/random/favorite/50">50</router-link> /
        <router-link to="/random/favorite/250">250</router-link> /
        <router-link to="/random/favorite/500">500</router-link>
      </span>
    </li>
  </ul>

  <h3>{{ $t("album_list.title") }}</h3>
  <ul>
    <li>
      <router-link to="/albums">{{ $t("album_list.title") }}</router-link>
    </li>
    <li>
      <router-link to="/albums/favorite">{{ $t("album_list.favorites") }}</router-link>
    </li>
  </ul>

  <h3>{{ $t("artist_list.title") }}</h3>
  <ul>
    <li>
      <router-link to="/artists">{{ $t("artist_list.title") }}</router-link>
    </li>
  </ul>

  <h3>{{ $t("radio_stations.title") }}</h3>
  <ul>
    <li>
      <router-link to="/radiostations">{{ $t("radio_stations.title") }}</router-link>
    </li>
  </ul>

  <h3>{{ $t("user.title") }}</h3>
  <ul>
    <li>
      <span v-on:click="lang('de')">de</span> / <span v-on:click="lang('en')">en</span>
    </li>
    <li><a v-on:click="logout()">{{ $t("user.logout") }}</a></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HttpRequest from '../Lib/HttpRequest';

export default defineComponent({
  name: 'Sidebar',
  emits: ['hidePlayer'],
  methods: {
    async lang(locale: string): Promise<void> {
      this.$i18n.locale = locale;
    },
    async logout(): Promise<void> {
      this.$emit('hidePlayer');

      HttpRequest.post(
        'common/logout',
      ).then(() => {
        this.$store.dispatch('authStorage/logout');
        this.$store.dispatch('favorites/reset');

        this.$router.push('/login')
      });
    }
  }
})
</script>

<style scoped>
h3 {
  text-align: left;
  margin-left: 30px
}

ul {
  list-style-type: none;
  border: 1px #446683 solid;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #0a0f14;
  margin-left: 10px;
  margin-right: 10px;
}

ul li {
  text-align: left;
}

li span.random_select {
  font-size: 70%;
}
</style>
