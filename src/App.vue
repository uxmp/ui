<template>
  <div class="maingrid-noplayer" id="maingrid">
    <div class="grid-sidebar">
      <Sidebar />
    </div>
    <div class="grid-content scrollbar">
      <router-view @updatePlaylist="updatePlaylist" @updateNowPlaying="updateNowPlaying" />
    </div>
    <div>
    </div>
    <div class="grid-player">
      <div style="width: 100%">
        <input type="range" class="amplitude-volume-slider"/>
        <div class="control-container">
          <span class="amplitude-prev" style="background-color: rgb(85, 57, 5); height: 50px; display: inline-block; color: #ffffff">
            <img src="./assets/icons/previous.svg" />
          </span>
          <span class="amplitude-play-pause" style="background-color: rgb(85, 57, 5); height: 50px; display: inline-block;">
            <img src="./assets/icons/play.svg" />
          </span>
          <span class="amplitude-next" style="background-color: rgb(85, 57, 5); height: 50px; display: inline-block;">
            <img src="./assets/icons/next.svg" />
          </span>
        </div>
      </div>
    </div>
    <div class="grid-nowplaying">
      <div class="nowplaying-grid">
        <div class="nowplaying-cover">
          <img data-amplitude-song-info="cover_art_url" style="width: 110px; height: 110px;" />
        </div>
        <div>
          <div class="nowplaying-title">
            <span data-amplitude-song-info="name" class="song-name"></span>
          </div>
          <div class="nowplaying-album">
            from <router-link :to="'/album/' + this.nowPlaying.albumId">{{ this.nowPlaying.albumName }}</router-link>
          </div>
          <div class="nowplaying-artist">
            by <router-link :to="'/artist/' + this.nowPlaying.artistId">{{ this.nowPlaying.artistName }}</router-link>
          </div>
        </div>
        <div class="nowplaying-state">
          <input type="range" class="amplitude-song-slider" step=".1"/>
          <span class="amplitude-current-minutes">00</span>:<span class="amplitude-current-seconds">00</span> /
          <span class="amplitude-duration-minutes">03</span>:<span class="amplitude-duration-seconds">16</span>
        </div>
      </div>
    </div>
    <div class="grid-playlist">
      <Playlist :elements="this.playlist" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArtistList from './components/Artist/ArtistList.vue'
import Playlist from './components/Navigation/Playlist.vue';
import Sidebar from './components/Navigation/Sidebar.vue'
import { SongListItem } from './model/SongListItem';

export default defineComponent({
  data() {
    return {
      playlist: [] as SongListItem[],
      nowPlaying: {},
    };
  },
  name: 'uXMP',
  components: {
    ArtistList,
    Sidebar,
    Playlist
  },
  methods: {
    updatePlaylist(songList: Array<SongListItem>): void {
      document.getElementById('maingrid').className = 'maingrid';
      this.playlist = songList;
    },
    updateNowPlaying(data: object): void {
      this.nowPlaying = data;
    }
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

a {
  color: rgb(141, 102, 31);
  text-decoration: none;;
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
  grid-template-rows: auto 10px 15%;
  height: 100%;
}

div.maingrid-noplayer {
  display: grid;
  grid-template-columns: 10% 15% auto 40%;
  grid-template-rows: auto;
  height: 100%;
}

div.grid-content {
  overflow-y: scroll;
  overflow-x: hidden;
  grid-column: 2 / span 3;
}

div.grid-sidebar {
  max-width: 300px;
}

div.grid-player {
  max-height: 150px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  grid-column: 1 / span 2;
  background-color: #0b1116;
  border-top: 1px #446683 solid;
}

div.grid-playlist {
  background-color: #0b1116;
  border-top: 1px #446683 solid;
  font-size: 80%;
}

div.grid-playlist div.playlist {
  max-height: 150px;
  overflow-y: scroll;
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

div.nowplaying-cover {
  grid-row: 1 / span 2;
}

div.nowplaying-title {
  font-size: 110%;
  text-align: left;
}

div.nowplaying-album {
  font-size: 80%;
  text-align: left;
}

div.nowplaying-artist {
  font-size: 80%;
  text-align: left;
}

div.nowplaying-state {
  margin-top: 1%;
  text-align: left;
}

div.grid-nowplaying {
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
</style>
