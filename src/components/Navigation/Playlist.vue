<template>
  <div class="playlist scrollbar" v-if="playlistConfig !== null">
    <section
      style="width: 100%; margin-top: 10px"
      v-for="(songListItem, index) in playlistConfig.getSongList()"
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
import PlaylistConfig from '../../model/PlaylistConfig';
import PlaylistConfigInterface from '../../model/PlaylistConfigInterface';
import SongListItemInterface from '../../model/SongListItemInterface';
import Player from '../Lib/Player';
export default defineComponent({
  name: 'Playlist',
  props: {
    playlistConfig: {
      type: null as unknown as PropType<PlaylistConfigInterface | null>,
      required: true,
      validator: (v: any) => v instanceof PlaylistConfig || v === null,
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
      this.player.init(
        this,
        this.playlistConfig.getSongList().map((song: SongListItemInterface) => this.player.createSongListItem(song))
      );

      if (this.playlistConfig.isAutoPlay()) {
        this.player.playIndex(this.playlistConfig.getOffset())
      }
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
  