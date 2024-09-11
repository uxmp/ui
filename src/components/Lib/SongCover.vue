<template>
  <div class="cover_container" :style="{'height': size + 'px', 'width': size + 'px'}">
    <img class="cover_play" v-on:click="play(song)" v-bind:src="song.getCover()"/>
    <div class="cover_overlay" v-on:click="play(song)">
      <font-awesome-icon class="coverPlaybutton" :icon="['fas', 'play']"/>
    </div>
  </div>
</template>

<script lang="ts">
import {EventTypes} from "@/components/Lib/EventTypes";
import {Emitter} from "mitt";
import {defineComponent, inject, PropType} from 'vue'
import Player from './Player';
import SongListItemInterface from '@/model/SongListItemInterface';

export default defineComponent({
  name: 'SongCover',
  setup() {
    const player = inject('ply') as Player;
    const emitter = inject('emitter') as Emitter<EventTypes>;

    return {
      player,
      emitter,
    };
  },
  props: {
    song: {
      type: Object as PropType<SongListItemInterface>,
      required: true
    },
    size: {
      type: Number,
      default: 60
    }
  },
  methods: {
    play(song: SongListItemInterface): void {
      this.player.playSong(song, this.emitter);
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

div.cover_container:hover .cover_play {
  opacity: 0.3;
}

div.cover_container:hover .cover_overlay {
  opacity: 1;
}

.coverPlaybutton {
  font-size: 200%;
  color: rgb(141, 102, 31);
}
</style>
