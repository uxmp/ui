<template>
  <div class="maingrid">
    <div class="grid-sidebar">
      <Sidebar />
    </div>
    <div class="grid-main">
      <router-view />
    </div>
    <div class="grid-player">
      <div class="player">
        <div class="meta-container">
          <div class="song-title"></div>
          <div class="song-artist"></div>

          <div class="time-container">
            <div class="current-time">
              <span class="amplitude-current-minutes">00</span>:<span class="amplitude-current-seconds">00</span> /
              <span class="amplitude-duration-minutes">03</span>:<span class="amplitude-duration-seconds">16</span>
            </div>
          </div>
          <progress class="amplitude-buffered-progress" value="0"></progress>
          <input type="range" class="amplitude-song-slider" step=".1"/>
          <input type="range" class="amplitude-volume-slider"/>
          <div class="control-container">
            <div class="amplitude-prev">
              &lt;&lt;
            </div>
            <div class="amplitude-play-pause">
              |&gt;
            </div>
            <div class="amplitude-next">
              &gt;&gt;
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArtistList from './components/Artist/ArtistList.vue'
import Sidebar from './components/Navigation/Sidebar.vue'

export default defineComponent({
  name: 'App',
  components: {
    ArtistList,
    Sidebar
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  margin: 0;
  padding: 0;
}

div.maingrid {
  display: grid;
  grid-template-columns: 15% auto;
  grid-template-rows: auto 15%;
  height: 100%;
}

div.grid-sidebar {
  max-width: 300px;
}

div.grid-player {
  max-height: 150px;
  grid-column: 1 / span 2;
}
</style>
