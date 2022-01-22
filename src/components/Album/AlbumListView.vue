<template>
  <h1>Albums</h1>
  <template v-if="albumList !== []">
    <div class="albumInfo">
    Count: {{ quantity }}
    </div>
  </template>
  <div class="albumList">
    <AlbumListItem v-for="album in albumList" :key="album.getId()" :album="album" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { plainToClass } from 'class-transformer'
import Album from '../../model/Album'
import AlbumListItem from './Lib/AlbumListItem.vue'
import HttpRequest from '../Lib/HttpRequest'
import formatDurationLength from '../Lib/FormatDurationLength'
import AlbumInterface from '../../model/AlbumInterface'

export default defineComponent({
  name: 'AlbumList',
  data() {
    return { 
      albumList: [] as Array<AlbumInterface>,
      quantity: 0,
    }
  },
  components: {
    AlbumListItem,
  },
  beforeMount(): void {
    this.getAlbums();
  },
  methods: {
    async getAlbums(): Promise<void> {
      HttpRequest.get(`albums`).then(res => {
        this.quantity = res.data.items.length;
        this.albumList = res.data.items.map((album_data: any): Album => {
          return plainToClass(Album, album_data);
        });
      });
    },
    formatLength(length: number): string {
      return formatDurationLength(length);
    }
  }
})
</script>

<style scoped>
div.albumInfo {
  text-align: left;
}

div.albumList {
  margin-top: 10px;
  background-color: #0a0f14;
  border: 1px #446683 solid;
}
</style>
