<template>
  <h1>Home</h1>
  <h3>Recent albums</h3>
  <div class="list scrollbar">
    <AlbumListItem :album="album" v-for="album in recentAlbums" :key="album.getId()" />
  </div>
  <div class="grid">
    <div>
      <h3>Playback history</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Song</th>
            <th>Album</th>
            <th>Artist</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="song in playbackHistory" :key="song.getId()">
            <td>
              <font-awesome-icon class="playButton" :icon="['fas', 'play']" v-on:click="playSong(song)" title="Play" />
            </td>
            <td>{{ song.getName() }}</td>
            <td>{{ song.getAlbumName() }}</td>
            <td>{{ song.getArtistName() }}</td>
            <td>{{ song.getUserName() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios'
import { plainToClass } from 'class-transformer'
import { defineComponent, PropType } from 'vue'
import Album from '../../model/Album'
import AlbumListItem from '../Album/Lib/AlbumListItem.vue'
import PlaybackHistoryItem from '../../model/PlaybackHistoryItem'
import PlaybackHistoryItemInterface from '../../model/PlaybackHistoryItemInterface'
import HttpRequest from '../Lib/HttpRequest'
import Player from '../Lib/Player'

export default defineComponent({
  name: 'HomeView',
  data() {
    return { 
      recentAlbums: [],
      playbackHistory: [],
    }
  },
  components: {
    AlbumListItem,
  },
  beforeMount(): void {
    this.getNewestAlbums();
    this.getPlaybackHistory();
  },
  methods: {
    async getNewestAlbums(): Promise<void> {
      HttpRequest.get('albums/recent').then((response: AxiosResponse) => {
        this.recentAlbums = response.data.items.map((albumData: Object): Album => {
          return plainToClass(Album, albumData);
        });
      });
    },
    async getPlaybackHistory(): Promise<void> {
      HttpRequest.get('play/history').then((response: AxiosResponse) => {
        this.playbackHistory = response.data.items.map((historyData: Object): PlaybackHistoryItemInterface => {
          return plainToClass(PlaybackHistoryItem, historyData);
        })
      })
    },
    async playSong(song: PlaybackHistoryItemInterface): Promise<void> {
      Player.playSong(song, this);
    },
  }
})
</script>

<style scoped>
div.list {
  text-align: left;
  width: 98%;
  height: 220px;
  overflow-y: hidden;
  overflow-x: auto;
  background-color: #0a0f14;
  border: 1px #446683 solid;
  padding: 10px;
  white-space: nowrap;
}
div.grid {
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
