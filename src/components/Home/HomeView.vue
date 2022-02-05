<template>
  <h1>/ {{ $t("home.title") }}</h1>
  <h3>{{ $t("home.recent_albums_title") }}</h3>
  <div class="list scrollbar">
    <AlbumListItem :album="album" v-for="album in recentAlbums" :key="album.getId()" />
  </div>
  <div class="grid">
    <div>
      <PlaybackHistory :items="playbackHistory" />
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
import AlbumInterface from '../../model/AlbumInterface'
import PlaybackHistory from '../Lib/PlaybackHistory.vue'

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
    PlaybackHistory
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
