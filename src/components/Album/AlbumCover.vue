<template>
  <div class="cover_container" :style="{'height': size + 'px', 'width': size + 'px'}">
    <img class="cover_play" v-on:click="play(album)" v-bind:src="album.getCover()" />
    <div class="cover_overlay" v-on:click="play(album)">
      <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M20 33l12-9-12-9v18zm4-29C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z" class="overlay_play_button"  /></svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Player from '../Lib/Player';
import Album from '../../model/Album';

export default defineComponent({
  name: 'AlbumCover',
  props: {
    album: {
      type: Album,
      required: true
    },
    size: {
      type: Number,
      default: 120
    }
  },
  methods: {
    play(album: Album) {
      Player.playAlbum(album.getId(), this);
    }
  }
})
</script>

<style scoped>
div.cover_container {
  display: flex;
  position: relative;
  margin: auto;
}

img.cover_play {
  cursor: pointer;
  opacity: 1;
  display: block;
  transition: .2s ease;
  backface-visibility: hidden;
  width: 100%;
  height: 100%
}

div.cover_overlay {
  transition: .2s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  cursor: pointer;
}

path.overlay_play_button {
  fill: rgb(141, 102, 31);
}

div.cover_container:hover .cover_play {
  opacity: 0.3;
}

div.cover_container:hover .cover_overlay {
  opacity: 1;
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
</style>
