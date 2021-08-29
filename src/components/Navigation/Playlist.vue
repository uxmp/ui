<template>
  <div class="playlist scrollbar">
    <div
      style="width: 100%; margin-top: 10px"
      v-for="(songListItem, index) in elements"
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
import SongListItemInterface from '../../model/SongListItemInterface';
import { Player } from '../Player/player';
export default defineComponent({
  name: 'Playlist',
  props: {
    elements: {
      type: [] as PropType<Array<SongListItemInterface>>,
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
  