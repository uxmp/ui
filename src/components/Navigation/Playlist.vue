<template>
  <template v-if="playlistConfig !== null">
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
  </template>
</template>

<script lang="ts">
import {EventTypes} from "@/components/Lib/EventTypes";
import {Emitter} from "mitt";
import {defineComponent, inject, PropType} from 'vue'
import PlaylistConfigInterface from '../../model/PlaylistConfigInterface';
import SongListItemInterface from '../../model/SongListItemInterface';
import Player from '../Lib/Player';

export default defineComponent({
  name: 'Playlist',
  props: {
    playlistConfig: {
      type: null as unknown as PropType<PlaylistConfigInterface | null>,
      required: true,
    }
  },
  setup() {
    const player = inject('ply') as Player;
    const emitter = inject('emitter') as Emitter<EventTypes>

    return {
      player,
      emitter,
    };
  },
  updated(): void {
    this.$nextTick(function (): void {
      if (this.playlistConfig) {
        this.player.init(
            this.emitter,
            this.playlistConfig.getSongList().map((song: SongListItemInterface) => this.player.createSongListItem(song)),
            this.playlistConfig.getOffset()
        );

        if (this.playlistConfig.isAutoPlay()) {
          this.player.playIndex(this.playlistConfig.getOffset())
        }
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
