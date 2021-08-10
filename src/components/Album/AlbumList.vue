<template>
  <h1>Albums</h1>
  <div class="album" v-for="album in albumList" :key="album.getAlbumId()">
    <div class="album_inner">
      <img class="cover_play" v-on:click="play(album)" v-bind:src="album.getCover()" width="120" height="120" /><br />
      <div class="album_name">
        {{ album.getName() }}
      </div>
      <div class="album_artist">
        by <router-link :to="'/artist/' + album.getArtistId()">{{ album.getArtistName() }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { plainToClass } from 'class-transformer';
import { AlbumListItem } from '../../model/AlbumListItem';
import { loadAlbum } from './loadAlbum'
import { Player } from '../Player/player';;
import 'reflect-metadata';

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
        return plainToClass(AlbumListItem, album_data);
      });
    },

    play(item: AlbumListItem) {
      loadAlbum(item.getAlbumId()).then(album => {
        Player.playAlbum(album, this)
        this.$emit('updatePlaylist', album.getDiscs()[0].getSongList());
      });
    }
  }
})
</script>

<style scoped>
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
  padding-top: 5px;
}

div.album_artist {
  font-size: 80%;
}
</style>
