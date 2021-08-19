<template>
  <div class="playlist scrollbar">
    <div
      style="width: 100%; margin-top: 10px"
      v-for="(songListItem, index) in this.elements"
      :key="songListItem.getId()"
      class="song amplitude-song-container"
      :data-amplitude-song-index="index"
      v-on:click="playFromPlaylist(index)"
    >
      {{ songListItem.getTracknumber() }}
        {{ songListItem.getName() }}
      {{ songListItem.getArtistName() }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { SongListItem } from '../../model/SongListItem'
import { Player } from '../Player/player';
export default defineComponent({
  name: 'Playlist',
  props: {
    elements: {
      type: Array as PropType<Array<SongListItem>>,
      required: true
    }
  },
  methods: {
    playFromPlaylist(index: number) {
      Player.playIndex(index);
    }
  }
})
</script>

<style scoped>
</style>
  