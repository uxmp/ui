<template>
  <div class="playlist scrollbar">
    <section
      style="width: 100%; margin-top: 10px"
      v-for="(songListItem, index) in elements"
      :key="songListItem.getId()"
      class="song amplitude-song-container"
      :data-amplitude-song-index="index"
      :id="'playlist-item-' + index"
      v-on:click="playFromPlaylist(index)"
    >
      {{ songListItem.getTracknumber() }}
        {{ songListItem.getName() }}
      {{ songListItem.getArtistName() }}
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SongListItem from '../../model/SongListItem';
import SongListItemInterface from '../../model/SongListItemInterface';
import Player from '../Lib/Player';
export default defineComponent({
  name: 'Playlist',
  props: {
    elements: {
      type: [] as PropType<Array<SongListItemInterface>>,
      required: true
    }
  },
  updated(): void {
    this.$nextTick(function (): void {
      Player.init(this, this.elements.map((song: SongListItem) => Player.createSongListItem(song)));
      Player.playIndex(0);
    })
  },
  methods: {
    async playFromPlaylist(index: number): Promise<void> {
      Player.playIndex(index);
    }
  }
})
</script>

<style scoped>
</style>
  