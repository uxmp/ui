<template>
  <h3>Songs</h3>
  <ul>
    <li>
      <router-link to="/songs">Songs</router-link>
    </li>
    <li>
      <router-link to="/random/songs">Random</router-link>
      <br />
      <span class="random_select">
        <router-link to="/random/songs/50">50</router-link> /
        <router-link to="/random/songs/250">250</router-link> /
        <router-link to="/random/songs/500">500</router-link>
      </span>
    </li>
  </ul>

  <h3>Albums</h3>
  <ul>
    <li>
      <router-link to="/">Albums</router-link>
    </li>
  </ul>

  <h3>Artiss</h3>
  <ul>
    <li>
      <router-link to="/artists">Artists</router-link>
    </li>
  </ul>

  <h3>User</h3>
  <ul>
    <li v-on:click="logout()">Logout</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthService from './../Auth/AuthService'

export default defineComponent({
  name: 'Sidebar',
  methods: {
    logout() {
      this.$emit('hidePlayer');
      
      AuthService.logout(() => {
        this.$store.dispatch('logout');
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
}

ul li {
  text-align: left;
  padding-bottom: 10px;
}

li span.random_select {
  font-size: 70%;
}
</style>
