<template>
  <h1>/ Albums</h1>
  <template v-if="albumList !== null">
    <div class="albumInfo">
     Count: {{ quantity }}
    </div>
    <div class="albumList">
      <AlbumListItem v-for="album in albumList" :key="album.getId()" :album="album" />
    </div>
  </template>
  <template v-else>
    <LoadingIcon />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { plainToClass } from 'class-transformer'
import Album from '../../model/Album'
import AlbumListItem from './Lib/AlbumListItem.vue'
import HttpRequest from '../Lib/HttpRequest'
import AlbumInterface from '../../model/AlbumInterface'
import LoadingIcon from '../Lib/LoadingIcon.vue'

export default defineComponent({
  name: 'AlbumList',
  data() {
    return { 
      albumList: null as null|Array<AlbumInterface>,
      quantity: 0,
    }
  },
  components: {
    AlbumListItem,
    LoadingIcon
  },
  beforeMount(): void {
    this.getAlbums();
  },
  methods: {
    async getAlbums(): Promise<void> {
      HttpRequest.get(`albums`).then(res => {
        this.quantity = res.data.items.length;
        this.albumList = res.data.items.map((album_data: any): AlbumInterface => {
          return plainToClass(Album, album_data);
        });
      });
    },
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
