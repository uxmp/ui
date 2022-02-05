<template>
  <h3>{{ $t("playback_history.title") }}</h3>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>{{ $t("playback_history.table.song_column_title") }}</th>
        <th>{{ $t("playback_history.table.album_column_title") }}</th>
        <th>{{ $t("playback_history.table.artist_column_title") }}</th>
        <th>{{ $t("playback_history.table.user_column_title") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="song in items" :key="song.getId()">
        <td>
          <PlaySongButton :song="song" />
        </td>
        <td>{{ song.getName() }}</td>
        <td><router-link :to="'/album/' + song.getAlbumId()">{{ song.getAlbumName() }}</router-link></td>
        <td><router-link :to="'/artist/' + song.getArtistId()">{{ song.getArtistName() }}</router-link></td>
        <td>{{ song.getUserName() }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import PlaybackHistoryItemInterface from '../../model/PlaybackHistoryItemInterface'
import PlaySongButton from '../Lib/PlaySongButton.vue'

export default defineComponent({
  name: 'PlaybackHistory',
  props: {
    items: {
      type: Array as PropType<Array<PlaybackHistoryItemInterface>>,
      required: true
    }
  },
  components: {
    PlaySongButton,
  },
})
</script>

<style scoped>

</style>

