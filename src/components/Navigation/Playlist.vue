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
      :title="$t('shared.play')"
    >
      {{ songListItem.getTracknumber() }}
      {{ songListItem.getName() }}
      {{ songListItem.getArtistName() }}
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue'
import SongListItemInterface from '../../model/SongListItemInterface';
import Player from '../Lib/Player';
export default defineComponent({
  name: 'Playlist',
  props: {
    elements: {
      type: Array as PropType<Array<SongListItemInterface>>,
      required: true
    }
  },
  setup() {
    const player = inject('ply') as Player;
    return {
      player,
    };
  },
  updated(): void {
    this.$nextTick(function (): void {
      this.player.init(this, this.elements.map((song: SongListItemInterface) => this.player.createSongListItem(song)));

      this.player.playIndex(0)
    })
  },
  methods: {
    async playFromPlaylist(index: number): Promise<void> {
      this.player.playIndex(index)
    }
  }
})
</script>

<style scoped>
section:hover {
  cursor: pointer;
  color: rgb(192, 140, 44);
}
</style>
  