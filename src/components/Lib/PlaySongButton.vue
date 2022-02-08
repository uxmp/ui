<template>
  <font-awesome-icon class="playButton" :icon="['fas', 'play']" v-on:click="play(song)" :title="$t('play_song_button.play_song_title')" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Player from './Player';
import SongListItemInterface from '../../model/SongListItemInterface';

export default defineComponent({
  name: 'PlaySongButton',
  props: {
    song: {
      type: Object as PropType<SongListItemInterface>,
      required: true
    }
  },
  methods: {
    play(song: SongListItemInterface): void {
      Player.playSong(song, this);
    }
  }
})
</script>

<style scoped>
.playButton {
  cursor: pointer;
}

.playButton:hover {
  color: rgb(85, 57, 5);
}
</style>
