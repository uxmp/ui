<template>
  <h1>/ {{ $t("home.title") }}</h1>
  <h3>{{ $t("home.recent_albums_title") }}</h3>
  <div class="list scrollbar">
    <AlbumListItem v-if="recentAlbums !== null" :album="album" v-for="album in recentAlbums" :key="album.getId()" />
    <LoadingIcon v-else />
  </div>
  <div class="grid">
    <div>
      <PlaybackHistory />
    </div>
    <div>
      <GenreStatistics />
      <MostPlayed />
    </div>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios'
import { plainToInstance } from 'class-transformer'
import { defineComponent } from 'vue'
import Album from '../../model/Album'
import AlbumListItem from '../Album/Lib/AlbumListItem.vue'
import HttpRequest from '../Lib/HttpRequest'
import AlbumInterface from '../../model/AlbumInterface'
import PlaybackHistory from '../Lib/PlaybackHistory.vue'
import MostPlayed from '../Lib/MostPlayed.vue'
import GenreStatistics from './Lib/GenreStatistics.vue'
import LoadingIcon from "@/components/Lib/LoadingIcon.vue";

export default defineComponent({
  name: 'HomeView',
  data() {
    return { 
      recentAlbums: null as null|Array<AlbumInterface>,
    }
  },
  components: {
    LoadingIcon,
    AlbumListItem,
    PlaybackHistory,
    MostPlayed,
    GenreStatistics
  },
  beforeMount(): void {
    this.getNewestAlbums()
  },
  methods: {
    async getNewestAlbums(): Promise<void> {
      HttpRequest.get('albums/recent').then((response: AxiosResponse) => {
        this.recentAlbums = response.data.items.map((albumData: Object): AlbumInterface => {
          return plainToInstance(Album, albumData);
        });
      });
    },
  }
})
</script>

<style scoped lang="scss">
div.list {
  text-align: left;
  width: 100%;
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
