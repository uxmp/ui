<template>
  <div class="cover_container" :style="{'height': size + 'px', 'width': size + 'px'}">
    <img class="cover_play" v-bind:src="artist.getCover()" />
    <div class="cover_overlay" v-on:click.stop="play(artist)">
      <font-awesome-icon class="coverPlayButton" :icon="['fas', 'play']"/>
    </div>
    <div class="meta_container" v-if="displayMetadata">
      <div class="cover_meta_separator"></div>
      <div class="artist_info">
        <router-link @click.stop :to="'/artist/' + artist.getId()">{{ artist.getName() }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import Player from '@/components/Lib/Player';
import ArtistInterface from '@/model/ArtistInterface';

export default defineComponent({
  name: 'ArtistCover',
  setup() {
    const player = inject('ply') as Player;
    return {
      player,
    };
  },
  props: {
    artist: {
      type: Object as () => ArtistInterface,
      required: true
    },
    size: {
      type: Number,
      default: 260
    },
    displayMetadata: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async play(artist: ArtistInterface): Promise<void> {
      this.player.playArtist(artist, this);
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

div.cover_container:hover .cover_overlay {
  opacity: 1;
  width: 35%;
  height: 35%;
  background: rgba(36, 48, 61, 0.6);
}

.coverPlayButton {
  font-size: 200%;
  color: rgb(141, 102, 31);
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 100%;
}

div.cover_container {
  display: flex;
  position: relative;
  margin: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.308);
  background-size: cover;
  background-position: center center;
}

div.cover_meta_separator {
  width: 100%;
  height: 25px;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(17,23,29,0.8) 100%);
}

div.meta_container {
  position: absolute;
  width: 100%;
  bottom: 0;
  min-height: 30px;
  text-align: left;
}

div.artist_info {
  height: 100%;
  background-color: rgba(17,23,29,0.8);
  padding-left: 5px;
  padding-right: 5px;
}
</style>
