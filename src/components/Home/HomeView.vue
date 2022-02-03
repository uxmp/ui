<template>
  <h1>/ {{ $t("home.title") }}</h1>
  <h3>{{ $t("home.recent_albums_title") }}</h3>
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
              <PlaySongButton :song="song" />
            </td>
            <td>{{ song.getName() }}</td>
            <td><router-link :to="'/album/' + song.getAlbumId()">{{ song.getAlbumName() }}</router-link></td>
            <td><router-link :to="'/artist/' + song.getArtistId()">{{ song.getArtistName() }}</router-link></td>
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
import { defineComponent } from 'vue'
import Album from '../../model/Album'
import AlbumListItem from '../Album/Lib/AlbumListItem.vue'
import PlaybackHistoryItem from '../../model/PlaybackHistoryItem'
import PlaybackHistoryItemInterface from '../../model/PlaybackHistoryItemInterface'
import HttpRequest from '../Lib/HttpRequest'
import PlaySongButton from '../Lib/PlaySongButton.vue'
import AlbumInterface from '../../model/AlbumInterface'

export default defineComponent({
  name: 'HomeView',
  data() {
    return { 
      recentAlbums: [] as Array<AlbumInterface>,
      playbackHistory: [] as Array<PlaybackHistoryItemInterface>,
    }
  },
  components: {
    AlbumListItem,
    PlaySongButton
  },
  beforeMount(): void {
    this.getNewestAlbums();
    this.getPlaybackHistory();
  },
  methods: {
    async getNewestAlbums(): Promise<void> {
      HttpRequest.get('albums/recent').then((response: AxiosResponse) => {
        this.recentAlbums = response.data.items.map((albumData: Object): AlbumInterface => {
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
