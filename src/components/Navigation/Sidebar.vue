<template>
  <h1>Navigation</h1>
  <ul>
    <li>
      <router-link to="/">Albums</router-link>
    </li>
    <li>
      <router-link to="/artists">Artists</router-link>
    </li>
  </ul>

  <h3>Random</h3>
  <ul>
    <li>
      <router-link to="/random/songs">Songs</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Sidebar',
  methods: {
  }
})
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
