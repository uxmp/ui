<template>
  <h3>{{ $t("home.playback_history.title") }}</h3>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>{{ $t("home.playback_history.table.song_column_title") }}</th>
        <th>{{ $t("home.playback_history.table.user_column_title") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="song in items" :key="song.getId()">
        <td>
          <SongCover :song="song" :size="'40'" />
        </td>
        <td>
          <div class="songName">
            {{ song.getName() }}
          </div>
          <div class="artistName">
            <router-link :to="'/artist/' + song.getArtistId()">{{ song.getArtistName() }}</router-link>
          </div>
        </td>
        <td>{{ song.getUserName() }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import PlaybackHistoryItemInterface from '../../model/PlaybackHistoryItemInterface'
import PlaySongButton from '../Lib/PlaySongButton.vue'
import SongCover from '../Lib/SongCover.vue'

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
    SongCover,
  },
})
</script>

<style scoped>
tr {
  height: 60px;
}

th:first-of-type {
  width: 50px;
}

div.songName {
  font-size: 120%;
}

div.artistName {
  margin-top: 3px;
}

td:nth-of-type(3),
th:nth-of-type(3) {
  text-align: center;
}
</style>

