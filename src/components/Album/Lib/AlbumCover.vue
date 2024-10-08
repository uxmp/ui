<template>
  <div
      class="cover_container"
      :style="{'height': size + 'px', 'width': size + 'px', 'background-image': 'url(\'' + album.getCover() + '\')'}"
  >
    <div class="cover_overlay" v-on:click.stop="play(album)">
      <font-awesome-icon class="coverPlayButton" :icon="['fas', 'play']"/>
    </div>
    <div class="meta_container" v-if="displayMetadata">
      <div class="cover_meta_separator"></div>
      <div class="artist_info">
        <div class="album_name" :title="album.getName()">
          <router-link @click.stop :to="'/album/' + album.getId()">{{ album.getName() }}</router-link>
        </div>
        <div class="album_artist">
          <router-link @click.stop :to="'/artist/' + album.getArtistId()">{{ album.getArtistName() }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {EventTypes} from "@/components/Lib/EventTypes";
import {Emitter} from "mitt";
import { defineComponent, inject } from 'vue'
import Player from '@/components/Lib/Player';
import AlbumInterface from '@/model/AlbumInterface';

export default defineComponent({
  name: 'AlbumCover',
  setup() {
    const player = inject('ply') as Player;
    const emitter = inject('emitter') as Emitter<EventTypes>;

    return {
      player,
      emitter,
    };
  },
  props: {
    album: {
      type: Object as () => AlbumInterface,
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
    async play(album: AlbumInterface): Promise<void> {
      this.player.playAlbum(album.getId(), this.emitter)
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
  min-height: 40px;
  text-align: left;
}

div.artist_info {
  background-color: rgba(17,23,29,0.8);
}

div.album_name {
  padding-top: 10px;
  font-size: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-left: 5px;
  margin-right: 5px;
}

div.album_artist {
  font-size: 80%;
  margin-left: 5px;
  margin-right: 5px;
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
</style>
