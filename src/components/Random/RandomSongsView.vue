<template>
  <h1>/ {{ $t("random_songs.title") }}</h1>
  <SongListView :songList="songList" />
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { plainToInstance } from 'class-transformer';
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router';
import SongListItem from '../../model/SongListItem';
import SongListItemInterface from '../../model/SongListItemInterface';
import SongListView from '../Lib/SongListView.vue'
import HttpRequest from '../Lib/HttpRequest';

export default defineComponent({
  data() {
    return {
      songList: [] as Array<SongListItemInterface>,
      limit: 100,
      length: 0
    };
  },
  name: 'RandomSongs',
  components: {
    SongListView
  },
  beforeMount(): void {
    this.limit = +useRoute().params.limit;
  },
  async beforeRouteUpdate(to): Promise<void> {
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
        'random/songs/' + limit
      ).then((response: AxiosResponse): void => {
        this.songList = response.data.items.map((song_data: object): SongListItemInterface => {
          return plainToInstance(SongListItem, song_data);
        });
      });
    },
  }
})
</script>

<style scoped>
</style>
