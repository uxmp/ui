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
    <tbody v-if="items !== null">
    <tr v-for="song in items" :key="song.getId()">
      <td>
        <SongCover :song="song" :size="40"/>
      </td>
      <td>
        <div class="songName">
          <router-link :key="song.getId()" :to="'/song/' + song.getId()">
            {{ song.getName() }}
          </router-link>
        </div>
        <div class="artistName">
          {{ $t("shared.by_artist") }}
          <router-link :to="'/artist/' + song.getArtistId()">{{ song.getArtistName() }}</router-link>
        </div>
      </td>
      <td>{{ song.getUserName() }}</td>
    </tr>
    </tbody>
    <tbody v-else>
    <tr>
      <td colspan="3">
        <LoadingIcon/>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import PlaybackHistoryItemInterface from '@/model/PlaybackHistoryItemInterface'
import PlaybackHistoryItem from '@/model/PlaybackHistoryItem'
import SongCover from '@/components/Lib/SongCover.vue'
import LoadingIcon from '@/components/Lib/LoadingIcon.vue';
import HttpRequest from '@/components/Lib/HttpRequest'
import {AxiosResponse} from 'axios';
import {plainToInstance} from 'class-transformer';

export default defineComponent({
  name: 'PlaybackHistory',
  data() {
    return {
      items: null as null | Array<PlaybackHistoryItemInterface>,
    }
  },
  components: {
    LoadingIcon,
    SongCover,
  },
  beforeMount() {
    this.getPlaybackHistory();
  },
  methods: {
    async getPlaybackHistory(): Promise<void> {
      HttpRequest.get('play/history').then((response: AxiosResponse) => {
        this.items = response.data.items.map((historyData: object): PlaybackHistoryItemInterface => {
          return plainToInstance(PlaybackHistoryItem, historyData);
        })
      })
    },
  }
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

