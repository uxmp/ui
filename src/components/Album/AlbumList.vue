<template>
  <h1>Albums</h1>
  <div class="album" v-for="album in albumList" :key="album.getId()">
    <img class="cover_play" v-on:click="play(album)" v-bind:src="album.getCover()" width="120" height="120" /><br />
    <div class="album_name">
      {{ album.getName() }}
    </div>
    <div class="album_artist">
      by {{ album.getArtistName() }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { plainToClass } from 'class-transformer';
import { Album } from '../../model/album';
import { Player } from '../Player/player'
export default defineComponent({
  name: 'AlbumList',
  data() {
    return { 
      albumList: []
    }
  },
  beforeMount() {
    this.getAlbums();
  },
  methods: {
    async getAlbums() {
      const res = await fetch('http://localhost:8888/albums');
      const data = await res.json();

      this.albumList = data.items.map((album_data: any) => {
        return plainToClass(Album, album_data);
      });
    },

    play(album: Album) {
      Player.playAlbum(album);
    }
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

img.cover_play {
  cursor: pointer;
}

div.album {
  display: inline-block;
  width: 300px;
  height: 160px;
  background-color: #0a0f14;
  margin: 20px;
  border: 1px #0a0f14 solid;
  padding: 15px;
}

div.album_name {
  padding-top: 5px;
}

div.album_artist {
  font-size: 80%;
}
</style>
