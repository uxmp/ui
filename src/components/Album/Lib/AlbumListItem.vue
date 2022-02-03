<template>
  <div class="album" v-on:click="showAlbum()">
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
import { defineComponent } from 'vue'
import AlbumCover from './AlbumCover.vue';
import AlbumInterface from '../../../model/AlbumInterface';

export default defineComponent({
  name: 'AlbumListItem',
  props: {
    album: {
      type: Object as () => AlbumInterface,
      required: true
    }
  },
  components: {
    AlbumCover
  },
  methods: {
    async showAlbum(): Promise<void> {
      this.$router.push('/album/' + this.album.getId());
    },
  },
})
</script>

<style scoped>
div.album {
  display: inline-flex;
  width: 300px;
  height: 180px;
  margin: 8px;
  padding: 8px;
  background-color: #11171d;
  border-radius: 5%;
  border: 1px #24303d solid;
}

div.album:hover {
  background-color: #29313a;
  cursor: pointer;
}

div.album_inner {
  display: block;
  width: 100%;
  height: 100%;
}

div.album_name {
  padding-top: 10px;
  font-size: 110%;
  text-align: center;
}

div.album_artist {
  font-size: 80%;
  text-align: center;
}
</style>
