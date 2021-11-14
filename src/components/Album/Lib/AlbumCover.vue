<template>
  <div class="cover_container" :style="{'height': size + 'px', 'width': size + 'px'}">
    <img class="cover_play" v-on:click="play(album)" v-bind:src="album.getCover()" />
    <div class="cover_overlay" v-on:click="play(album)">
      <font-awesome-icon class="coverPlaybutton" :icon="['fas', 'play']"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Player from '../../Lib/Player';
import Album from '../../../model/Album';

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
    async play(album: Album): Promise<void> {
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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.308);
}

img.cover_play {
  cursor: pointer;
  opacity: 1;
  display: block;
  transition: .2s ease;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
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

.coverPlaybutton {
  font-size: 200%;
  color: rgb(141, 102, 31);
}
</style>
