<template>
  <div class="album">
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
import Album from '../../../model/Album';

export default defineComponent({
  name: 'AlbumListItem',
  props: {
    album: {
      type: Album,
      required: true
    }
  },
  components: {
    AlbumCover
  }
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
