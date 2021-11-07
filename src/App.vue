<template>
  <div class="maingrid-noplayer" id="maingrid">
    <div class="grid-sidebar">
      <Sidebar @hidePlayer="hidePlayer" />
      <div class="versionString">
        <a href="https://github.com/uxmp/uxmp" target="_blank">uxmp</a> {{ versionString }}
      </div>
    </div>
    <div class="grid-content scrollbar">
      <router-view />
    </div>
    <div>
    </div>
    <div class="grid-player">
      <PlayerControl :playerState="playerState" />
    </div>
    <div class="grid-nowplaying">
      <div class="nowplaying-grid">
        <NowPlayingView :nowPlaying="nowPlaying" />
      </div>
    </div>
    <div class="grid-playlist">
      <Playlist :elements="playlist" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import Playlist from './components/Navigation/Playlist.vue'
import Sidebar from './components/Navigation/Sidebar.vue'
import NowPlayingView from './components/Lib/NowPlayingView.vue'
import NowPlaying from './model/NowPlaying'
import SongListItemInterface from './model/SongListItemInterface'
import PlayerControl from './components/Navigation/PlayerControl.vue'

export default defineComponent({
  data() {
    return {
      playlist: [] as SongListItemInterface[],
      nowPlaying: {} as NowPlaying,
      versionString: import.meta.env.VITE_VERSION,
      playerState: false as boolean,
    };
  },
  name: 'uXMP',
  components: {
    "ArtistList": defineAsyncComponent(() => import('./components/Artist/ArtistListView.vue')),
    Sidebar,
    Playlist,
    PlayerControl,
    NowPlayingView
  },
  mounted() { 
    this.emitter.on(
      "updatePlaylist",
      (songList: Array<SongListItemInterface>) => {
        document.getElementById('maingrid').className = 'maingrid';
        this.playlist = songList;
      }
    );
    this.emitter.on(
      "updateNowPlaying",
      (data: NowPlaying) => this.nowPlaying = data
    );
    this.emitter.on(
      "updatePlayerState",
      (data: boolean) => this.playerState = data
    );
  },
  methods: {
    hidePlayer(): void {
      document.getElementById('maingrid').className = 'maingrid-noplayer';
      this.playlist = [];
    },
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #121d27;
  overflow: hidden;
}

h2,
h3,
h4 {
  text-align: left;
}

a {
  color: rgb(141, 102, 31);
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  color: rgb(192, 140, 44);
  text-decoration: none;
}

body {
  padding: 0;
  margin: 0;
}

div.maingrid {
  display: grid;
  grid-template-columns: 10% 15% auto 40%;
  grid-template-rows: auto 10px minmax(150px, 15%);
  height: 100%;
}

div.maingrid-noplayer {
  display: grid;
  grid-template-columns: 10% 15% auto 40%;
  grid-template-rows: auto;
  height: 100%;
}

div.grid-content {
  overflow-y: auto;
  overflow-x: hidden;
  grid-column: 2 / span 3;
}

div.grid-sidebar {
  max-width: 300px;
}

div.grid-player {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  grid-column: 1 / span 2;
  background-color: #0b1116;
  border-top: 1px #446683 solid;
}

div.grid-playlist {
  height: 100%;
  background-color: #0b1116;
  border-top: 1px #446683 solid;
  font-size: 80%;
}

div.grid-playlist div.playlist {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

div.scrollbar::-webkit-scrollbar {
  width: 12px;
}

div.scrollbar::-webkit-scrollbar-track {
  background: rgb(85, 57, 5);
}

div.scrollbar::-webkit-scrollbar-thumb {
  background-color: #121d27;
  border-radius: 20px;
  border: 3px solid rgb(85, 57, 5);
}

div.nowplaying-grid {
  display: grid;
  grid-template-rows: 50% auto;
  grid-template-columns: 150px auto;
  max-width: 500px;
}

div.grid-nowplaying {
  max-height: minmax(15%, 150px);
  display: flex;
  align-items: center;
  height: 100%;
  background-color: #0b1116;
  border-top: 1px #446683 solid;
}

div.maingrid-noplayer div.grid-nowplaying {
  display: none;
}

div.maingrid-noplayer div.grid-player {
  display: none;
}

div.maingrid-noplayer div.grid-playlist {
  display: none;
}

.amplitude-active-song-container {
  background-color: #1c2c3a; 
}

input[type=button] {
  font-size: 100%;
  border: 0;
  color: #ffffff;
  background: transparent;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px #446683 solid;
}

input[type=button]:hover {
  background: #446683;
  cursor: pointer;
}

input[type=text],
input[type=password] {
  font-size: 100%;
  margin: 10px;
  outline: 0;
  border: 0;
  color: #ffffff;
  border-bottom: 1px solid rgb(85, 57, 5);
  background: transparent;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}

input[type=text]:hover,
input[type=password]:hover {
  border-bottom: 1px solid rgb(192, 140, 44);
}

div.versionString {
  opacity: 25%;
}
</style>
