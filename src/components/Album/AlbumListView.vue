<template>
  <h1>Albums</h1>
  <div class="album" v-for="album in albumList" :key="album.getId()">
    <div class="album_inner">
      <AlbumCover :album="album" />
      <div class="album_name">
        <router-link :to="'/album/' + album.getId()">{{ album.getName() }}</router-link>
      </div>
      <div class="album_artist">
        by <router-link :to="'/artist/' + album.getArtistId()">{{ album.getArtistName() }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { plainToClass } from 'class-transformer';
import Player from '../Lib/Player';
import AlbumCover from '../Lib/AlbumCover.vue';
import Album from '../../model/Album';
import HttpRequest from '../Lib/HttpRequest';

export default defineComponent({
  name: 'AlbumList',
  data() {
    return { 
      albumList: [] as PropType<Array<Album>>
    }
  },
  components: {
    AlbumCover
  },
  beforeMount(): void {
    this.getAlbums();
  },
  methods: {
    async getAlbums(): Promise<void> {
      HttpRequest.get(`albums`).then(res => {
        this.albumList = res.data.items.map((album_data: any): Album => {
          return plainToClass(Album, album_data);
        });
      });
    },

    play(item: Album): void {
      Player.playAlbum(item.getId(), this);
    }
  }
})
</script>

<style scoped>
div.album {
  display: inline-flex;
  width: 300px;
  height: 180px;
  background-color: #0a0f14;
  margin: 10px;
  padding: 15px;
  border: 1px #446683 solid;
}

div.album_inner {
  display: block;
  width: 100%;
  height: 100%;
}

div.album_name {
  padding-top: 10px;
  font-size: 110%;
}

div.album_artist {
  font-size: 80%;
}
</style>
