<template>
  <notifications position="top center" group="error" />
  <notifications position="bottom right" group="app" />
  <div class="maingrid-noplayer" id="maingrid">
    <div class="grid-sidebar scrollbar">
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
      <Playlist :playlistConfig="playlist" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Playlist from './components/Navigation/Playlist.vue'
import Sidebar from './components/Navigation/Sidebar.vue'
import NowPlayingView from './components/Lib/NowPlayingView.vue'
import NowPlaying from './model/NowPlaying'
import SongListItemInterface from './model/SongListItemInterface'
import PlayerControl from './components/Navigation/PlayerControl.vue'
import ArtistList from './components/Artist/ArtistListView.vue'
import HttpRequest from './components/Lib/HttpRequest'
import { AxiosResponse } from 'axios'
import { plainToClass } from 'class-transformer'
import SongListItem from './model/SongListItem'
import PlaylistConfig from './model/PlaylistConfig'
import PlaylistConfigInterface from './model/PlaylistConfigInterface'

export default defineComponent({
  data() {
    return {
      playlist: null as null|PlaylistConfigInterface,
      nowPlaying: null as null|NowPlaying,
      versionString: import.meta.env.VITE_VERSION,
      playerState: false as boolean,
      timer: '',
    };
  },
  name: 'uxMP',
  components: {
    ArtistList,
    Sidebar,
    Playlist,
    PlayerControl,
    NowPlayingView,
  },
  mounted(): void { 
    this.emitter.on(
      "updatePlaylist",
      (songList: Array<SongListItemInterface>) => {
        this.showPlayer()

        let temporaryPlaylistSongIds = songList
          .map((item: SongListItemInterface): number => item.getId())
          .filter((songId: number): boolean => songId > 0)
        
        if (temporaryPlaylistSongIds.length > 0) {
          let temporaryPlaylistId = this.$store.getters['authStorage/getTemporaryPlaylistId'];
          if (temporaryPlaylistId === null) {
            temporaryPlaylistId = this.$uuid.v4()

            // save temporary playlist id
            this.$store.dispatch('authStorage/setTemporaryPlaylistId', {
              temporaryPlaylistId: temporaryPlaylistId
            });
          }

          HttpRequest.post(
            'temporary_playlist',
            {
              playlistId: temporaryPlaylistId,
              songIds: temporaryPlaylistSongIds,
            }
          );
        }

        this.playlist = new PlaylistConfig(
          songList
        )
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
  created(): void {
    this.timer = setInterval(this.fetchFavorites, 300000); // every 5 minutes
  },
  beforeMount(): void {
    let temporaryPlaylistId = this.$store.getters['authStorage/getTemporaryPlaylistId'];
    if (temporaryPlaylistId !== null) {
      HttpRequest.get(
        'temporary_playlist/' + temporaryPlaylistId
      ).then((response: AxiosResponse) => {
        this.showPlayer()

        let data = response.data;

        this.playlist = new PlaylistConfig(
          data.songs.map((song_raw: Object): SongListItemInterface => plainToClass(SongListItem, song_raw)),
          data.offset,
          false
        )
      });
    }
  },
  beforeDestroy(): void {
    this.cancelAutoUpdate();
  },
  methods: {
    showPlayer(): void {
        let element = document.getElementById('maingrid');
        if (element !== null) {
          element.className = 'maingrid';
        }
    },
    hidePlayer(): void {
      let element = document.getElementById('maingrid');
      if (element !== null) {
        element.className = 'maingrid-noplayer';
      }
      this.playlist = null;
      this.nowPlaying = null;
    },
    cancelAutoUpdate(): void {
      clearInterval(this.timer);
    },
    fetchFavorites(): void {
      if (this.$store.getters['authStorage/isLogged']) {
        HttpRequest.get(
          'user/favorite'
        ).then((response: AxiosResponse) => {
          this.$store.dispatch('favorites/init', {
            favorites: response.data
          });
        });
      }
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
  overflow: hidden;
}

h1,
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
  background-color: #121d27;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%231b3e5a' fill-opacity='0.1' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

div.maingrid {
  display: grid;
  grid-template-columns: minmax(150px, 12%) 15% auto 40%;
  grid-template-rows: auto 10px minmax(170px, 15%);
  height: 100%;
}

div.maingrid-noplayer {
  display: grid;
  grid-template-columns: minmax(150px, 12%) 15% auto 40%;
  grid-template-rows: auto;
  height: 100%;
}

div.grid-content {
  overflow-y: auto;
  overflow-x: hidden;
  grid-column: 2 / span 3;
  margin-left: 20px;
  padding-right: 20px;
}

div.grid-sidebar {
  max-width: 300px;
  overflow-y: auto;
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

button,
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

button:hover,
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

select {
  appearance: none;
  border: none;
  margin: 0;
  width: 100%;
  font-family: inherit;
  border-bottom: 1px solid rgb(85, 57, 5);
  padding: 0.25em 0.5em;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
  background: transparent;
  color: inherit;
}

select option {
  color: #000;
}

input[type=text]:hover,
input[type=password]:hover {
  border-bottom: 1px solid rgb(192, 140, 44);
}

div.versionString {
  opacity: 25%;
}

table th,
table td {
  text-align: left;
}

table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.308);
  border: 1px #446683 solid;
}

table thead tr {
  background-color: #11171d;;
  border-bottom: 1px solid #11171d;;
  color: #ffffff;
  text-align: left;
}

th,
td {
  padding: 12px 15px;
}

tbody tr {
  border-bottom: 1px solid #11171d;;
}

tbody tr:hover {
  background-color: #1c2c3a ! important;
}

tbody tr:nth-of-type(even) {
  background-color: #11171d;
}

table tbody tr:last-of-type {
  border-bottom: 2px #446683 solid;
}

.button {
  cursor: pointer;
}
</style>
