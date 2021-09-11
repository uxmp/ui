<template>
  <h1>Album</h1>
  <template v-if="album !== null">
    <div class="albumGrid">
      <div>
        <h2>{{ album.getName() }}</h2>
        <h4>
          by <router-link :to="'/artist/' + album.getArtistId()">{{ album.getArtistName() }}</router-link>
        </h4>
        <h4>
          Length: {{ formatLength(album.getLength()) }}
        </h4>
        <div class="album" v-for="disc in album.getDiscs()" :key="disc.getId()">
          <table>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Length</th>
            </tr>
            <tr v-for="song in disc.getSongList()" :key="song.getId()">
              <td>{{ song.getTracknumber() }}</td>
              <td>{{ song.getName() }}</td>
              <td>{{ formatLength(song.getLength()) }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <img class="cover_play" v-on:click="play(album)" v-bind:src="album.getCover()" />
      </div>
    </div>
  </template>
  <template v-else>Oh no 😢</template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'reflect-metadata';
import { Album } from '../../model/album';
import formatDurationLength from '../Lib/FormatDurationLength';
import EntityLoader from '../Lib/EntityLoader';
import { AlbumListItem } from '../../model/AlbumListItem';
import Player from '../Lib/Player';

export default defineComponent({
  name: 'AlbumView',
  data() {
    return { 
      album: null
    }
  },
  async created() {
    if (!this.$store.getters.isLogged) {
      this.$router.push('/login');
    }

    EntityLoader.loadAlbum(this.$route.params.albumId).then((album: Album) => this.album = album);
  },
  methods: {
    formatLength(length: number): string {
      return formatDurationLength(length);
    },
    play(item: AlbumListItem) {
      EntityLoader.loadAlbum(item.getAlbumId()).then(album => {
        this.$emit('updatePlaylist', album.getDiscs()[0].getSongList());
        Player.playAlbum(album, this);
      });
    }
  }
})
</script>

<style scoped>
div.albumGrid {
  display: grid;
  grid-template-columns: auto 600px;
  height: 100%;
  margin: auto;
}

img.cover_play {
  width: 300px;
  height: 300px;
}

table th,
table td {
  text-align: left;
}
</style>
