<template>
  <h1>/ {{ $t("album_list.title") }}</h1>
  <template v-if="!loading">
    <AlbumSelector :albumList="albumList" />
  </template>
  <template v-else>
    <LoadingIcon />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { plainToInstance } from 'class-transformer'
import Album from '@/model/Album'
import HttpRequest from '@/components/Lib/HttpRequest'
import AlbumInterface from '@/model/AlbumInterface'
import LoadingIcon from '@/components/Lib/LoadingIcon.vue'
import AlbumSelector from '@/components/Album/Lib/AlbumSelector.vue'

export default defineComponent({
  name: 'AlbumListView',
  data() {
    return { 
      albumList: [] as Array<AlbumInterface>,
      loading: true
    }
  },
  components: {
    LoadingIcon,
    AlbumSelector
  },
  beforeMount(): void {
    this.getAlbums();
  },
  methods: {
    async getAlbums(): Promise<void> {
      HttpRequest.get(`albums`).then(res => {
        this.albumList = res.data.items.map((album_data: Object): AlbumInterface => {
          return plainToInstance(Album, album_data);
        });
        this.loading = false
      });
    },
  }
})
</script>

<style scoped>
</style>
