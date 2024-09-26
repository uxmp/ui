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
    <tbody v-if="items !== null">
      <tr v-for="item in items" :key="item.getSong().getId()">
        <td>
          <SongCover :song="item.getSong()" :size="40" />
        </td>
        <td>
          <div class="songName">
            <router-link :key="item.getSong().getId()" :to="'/song/' + item.getSong().getId()">
              {{ item.getSong().getName() }}
            </router-link>
          </div>
          <div class="artistName">
            {{ $t("shared.by_artist") }}
            <router-link :to="'/artist/' + item.getSong().getArtistId()">{{ item.getSong().getArtistName() }}</router-link>
          </div>
        </td>
        <td>{{ item.getCount() }}</td>
      </tr>
    </tbody>
    <tbody v-else>
    <tr>
      <td colspan="3">
        <LoadingIcon />
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MostPlayedItemInterface from '@/model/MostPlayedItemInterface'
import SongCover from '@/components/Lib/SongCover.vue'
import HttpRequest from '@/components/Lib/HttpRequest'
import {AxiosResponse} from 'axios';
import {plainToInstance} from 'class-transformer';
import MostPlayedItem from '@/model/MostPlayedItem'
import LoadingIcon from '@/components/Lib/LoadingIcon.vue';

export default defineComponent({
  name: 'MostPlayed',
  data() {
    return {
      items: null as null|Array<MostPlayedItemInterface>,
    }
  },
  components: {
    LoadingIcon,
    SongCover,
  },
  beforeMount(): void {
    this.getMostPlayed()
  },
  methods: {
    async getMostPlayed(): Promise<void> {
      HttpRequest.get('play/mostplayed').then((response: AxiosResponse) => {
        this.items = response.data.items.map((data: object): MostPlayedItemInterface => {
          return plainToInstance(MostPlayedItem, data);
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

