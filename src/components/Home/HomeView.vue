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
    <div>
      <MostPlayed :items="mostPlayed" />
    </div>
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
import MostPlayedItem from '../../model/MostPlayedItem'
import MostPlayedItemInterface from '../../model/MostPlayedItemInterface'
import HttpRequest from '../Lib/HttpRequest'
import AlbumInterface from '../../model/AlbumInterface'
import PlaybackHistory from '../Lib/PlaybackHistory.vue'
import MostPlayed from '../Lib/MostPlayed.vue'

export default defineComponent({
  name: 'HomeView',
  data() {
    return { 
      recentAlbums: [] as Array<AlbumInterface>,
      playbackHistory: [] as Array<PlaybackHistoryItemInterface>,
      mostPlayed: [] as Array<MostPlayedItemInterface>,
    }
  },
  components: {
    AlbumListItem,
    PlaybackHistory,
    MostPlayed,
  },
  beforeMount(): void {
    this.getNewestAlbums()
    this.getPlaybackHistory()
    this.getMostPlayed()
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
    async getMostPlayed(): Promise<void> {
      HttpRequest.get('play/mostplayed').then((response: AxiosResponse) => {
        this.mostPlayed = response.data.items.map((data: Object): MostPlayedItemInterface => {
          return plainToClass(MostPlayedItem, data);
        })
      })
    },
  }
})
</script>

<style scoped>
div.list {
  text-align: left;
  width: 100%;
  height: 230px;
  overflow-y: hidden;
  overflow-x: auto;
  background-color: #0a0f14;
  border: 1px #446683 solid;
  white-space: nowrap;
  margin-right: 20px;
}
div.grid {
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 20px;
  margin-right: 20px;
}
</style>
