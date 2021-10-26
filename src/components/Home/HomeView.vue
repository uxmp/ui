<template>
  <h1>Home</h1>
  <h3>Recent albums</h3>
  <div class="albumList scrollbar">
    <div class="album" v-for="album in recentAlbums" :key="album.getId()">
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
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { defineComponent } from 'vue'
import Album from '../../model/Album';
import AlbumCover from '../Lib/AlbumCover.vue';
import HttpRequest from '../Lib/HttpRequest';

export default defineComponent({
  name: 'HomeView',
  data() {
    return { 
      recentAlbums: []
    }
  },
  components: {
    AlbumCover
  },
  beforeMount(): void {
    this.getNewestAlbums();
  },
  methods: {
    async getNewestAlbums(): Promise<void> {
      HttpRequest.get('albums/recent').then((response: AxiosResponse) => {
        this.recentAlbums = response.data.items.map((album_data: any) => {
          return plainToClass(Album, album_data);
        });
      });
    },
  }
})
</script>

<style scoped>
div.albumList {
  text-align: left;
  width: 98%;
  height: 200px;
  overflow-y: hidden;
  overflow-x: auto;
  background-color: #0a0f14;
  border: 1px #446683 solid;
  padding: 10px;
  white-space: nowrap;
}

div.album {
  display: inline-block;
  width: 250px;
  height: 180px;
}

div.album_inner {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;
}

div.album_name {
  padding-top: 10px;
  font-size: 110%
}

div.album_artist {
  font-size: 80%;
}
</style>
