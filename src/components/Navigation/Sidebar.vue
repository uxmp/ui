<template>
  <h3>Home</h3>
  <ul>
    <li>
      <router-link to="/">Home</router-link>
    </li>
  </ul>

  <h3>Songs</h3>
  <ul>
    <li>
      <router-link to="/random/songs/50">Random</router-link>
      <br />
      <span class="random_select">
        <router-link to="/random/songs/50">50</router-link> /
        <router-link to="/random/songs/250">250</router-link> /
        <router-link to="/random/songs/500">500</router-link>
      </span>
    </li>
    <li>
      <router-link to="/random/favorite/50">Random favorites</router-link>
      <br />
      <span class="random_select">
        <router-link to="/random/favorite/50">50</router-link> /
        <router-link to="/random/favorite/250">250</router-link> /
        <router-link to="/random/favorite/500">500</router-link>
      </span>
    </li>
  </ul>

  <h3>Albums</h3>
  <ul>
    <li>
      <router-link to="/albums">List</router-link>
    </li>
    <li>
      <router-link to="/albums/favorite">Favorites</router-link>
    </li>
  </ul>

  <h3>Artists</h3>
  <ul>
    <li>
      <router-link to="/artists">List</router-link>
    </li>
  </ul>

  <h3>Radio stations</h3>
  <ul>
    <li>
      <router-link to="/radiostations">List</router-link>
    </li>
  </ul>

  <h3>User</h3>
  <ul>
    <li><a v-on:click="logout()">Logout</a></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HttpRequest from '../Lib/HttpRequest';

export default defineComponent({
  name: 'Sidebar',
  emits: ['hidePlayer'],
  methods: {
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
