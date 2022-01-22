<template>
  <h1>Starred albums</h1>
  <div class="albumList">
    <AlbumListItem v-for="album in albumList" :key="album.getId()" :album="album" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { plainToClass } from 'class-transformer'
import AlbumCover from './Lib/AlbumCover.vue'
import AlbumListItem from './Lib/AlbumListItem.vue'
import Album from '../../model/Album'
import HttpRequest from '../Lib/HttpRequest'
import AlbumInterface from '../../model/AlbumInterface'

export default defineComponent({
  name: 'AlbumFavoriteView',
  data() {
    return { 
      albumList: [] as Array<AlbumInterface>
    }
  },
  components: {
    AlbumCover,
    AlbumListItem,
  },
  beforeMount(): void {
    this.getAlbums();
  },
  methods: {
    async getAlbums(): Promise<void> {
      HttpRequest.get(`albums/favorite`).then(res => {
        this.albumList = res.data.items.map((album_data: Object): Album => {
          return plainToClass(Album, album_data);
        });
      });
    }
  }
})
</script>

<style scoped>
div.albumList {
  margin-top: 10px;
  background-color: #0a0f14;
  border: 1px #446683 solid;
}
</style>
