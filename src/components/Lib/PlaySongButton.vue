<template>
  <font-awesome-icon class="playButton button" :icon="['fas', 'play']" v-on:click="play(song)"
                     :title="$t('play_song_button.play_song_title')"/>
  <span class="addToPlaylistButton">
    <AddToPlaylist :itemId="song.getId()" :itemType="'song'"/>
  </span>
</template>

<script lang="ts">
import {defineComponent, inject, PropType} from 'vue'
import Player from './Player';
import SongListItemInterface from '@/model/SongListItemInterface';
import AddToPlaylist from '@/components/Playlist/Lib/AddToPlaylist.vue'

export default defineComponent({
  name: 'PlaySongButton',
  props: {
    song: {
      type: Object as PropType<SongListItemInterface>,
      required: true
    }
  },
  setup() {
    const player = inject('ply') as Player;
    return {
      player,
    };
  },
  components: {
    AddToPlaylist,
  },
  methods: {
    async play(song: SongListItemInterface): Promise<void> {
      this.player.playSong(song, this);
    },
  }
})
</script>

<style scoped>
.button {
  cursor: pointer;
}

.button :hover {
  color: rgb(85, 57, 5);
}

.addToPlaylistButton {
  padding-left: 15px;
}
</style>
