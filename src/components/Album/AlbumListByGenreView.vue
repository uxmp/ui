<template>
  <h1>/ <router-link :to='"/albums"'>{{ $t("album_list.title") }}</router-link> / {{ $t("album_list_by_genre.title") }}</h1>
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
import GenreInterface from '@/model/GenreInterface'

export default defineComponent({
  name: 'AlbumListByGenreView',
  data() {
    return { 
      albumList: [] as Array<AlbumInterface>,
      genre: Object as () => GenreInterface,
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
      let genreId = +this.$route.params.genreId
      HttpRequest.get(`albums/genre/` + genreId).then(res => {
        this.albumList = res.data.items.map((album_data: object): AlbumInterface => {
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
