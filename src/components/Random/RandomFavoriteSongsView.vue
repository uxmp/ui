<template>
  <h1>/ {{ $t("random_favorite_songs.title") }}</h1>
  <SongListView :songList="songList" />
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router';
import SongListItem from '../../model/SongListItem';
import SongListItemInterface from '../../model/SongListItemInterface';
import HttpRequest from '../Lib/HttpRequest';
import SongListView from '../Lib/SongListView.vue'

export default defineComponent({
  data() {
    return {
      songList: [] as Array<SongListItemInterface>,
      limit: 100,
    };
  },
  name: 'RandomFavoriteSongs',
  components: {
    SongListView
  },
  beforeMount(): void {
    this.limit = +useRoute().params.limit;
  },
  async beforeRouteUpdate(to, from): Promise<void> {
    this.limit = +to.params.limit;
  },
  watch: {
    limit: function (): void {
      this.getSongs(this.limit);
    },
  },
  methods: {
    async getSongs(limit: number): Promise<void> {
      HttpRequest.get(
        'random/favorite/' + limit
      ).then((response: AxiosResponse): void => {
        this.songList = response.data.items.map((song_data: any): SongListItemInterface => {
          return plainToClass(SongListItem, song_data);
        });
      });
    },
  }
})
</script>

<style scoped>
</style>
  