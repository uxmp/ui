<template>
  <h3>{{ $t("home.most_played.title") }}</h3>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>{{ $t('home.most_played.table.column.song') }}</th>
        <th>{{ $t('home.most_played.table.column.number_played') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.getSong().getId()">
        <td>
          <SongCover :song="item.getSong()" :size="'40'" />
        </td>
        <td>
          <div class="songName">
            {{ item.getSong().getName() }}
          </div>
          <div class="artistName">
            <router-link :to="'/artist/' + item.getSong().getArtistId()">{{ item.getSong().getArtistName() }}</router-link>
          </div>
        </td>
        <td>{{ item.getCount() }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MostPlayedItemInterface from '../../model/MostPlayedItemInterface'
import PlaySongButton from './PlaySongButton.vue'
import SongCover from '../Lib/SongCover.vue'

export default defineComponent({
  name: 'MostPlayed',
  props: {
    items: {
      type: Array as PropType<Array<MostPlayedItemInterface>>,
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
  width: 70px;
}

td:nth-of-type(3),
th:nth-of-type(3) {
  text-align: center;
}

div.songName {
  font-size: 120%;
}

div.artistName {
  margin-top: 3px;
}
</style>

