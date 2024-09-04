<template>
  <h3>{{ $t("home.genre_statistics.title") }}</h3>
  <div class="genres" v-if="items !== null">
    <router-link :key="genre.getId()" v-for="genre in items" :to="'/albums/genre/' + genre.getId()">
      <span :title="$t('home.genre_statistics.albumCount', {albumCount: genre.getAlbumCount()})">{{ genre.getName() }}</span>
    </router-link>
  </div>
  <div class="genres" v-else>
    <LoadingIcon />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GenreStatisticItemInterface from '@/model/GenreStatisticItemInterface'
import {AxiosResponse} from "axios";
import {plainToInstance} from "class-transformer";
import GenreStatisticItem from '@/model/GenreStatisticItem'
import HttpRequest from '@/components/Lib/HttpRequest'
import LoadingIcon from "@/components/Lib/LoadingIcon.vue";

export default defineComponent({
  name: 'GenreStatistics',
  data() {
    return {
      items: null as null|Array<GenreStatisticItemInterface>,
    }
  },
  components: {
    LoadingIcon
  },
  beforeMount(): void {
    this.getGenreStatistics()
  },
  methods: {
    async getGenreStatistics(): Promise<void> {
      HttpRequest.get('genres').then((response: AxiosResponse) => {
        this.items = response.data.items.map((data: Object): GenreStatisticItemInterface => {
          return plainToInstance(GenreStatisticItem, data);
        })
      })
    },
  }
})
</script>

<style scoped>
div.genres {
  width: 100%;
  padding-top: 20px;
  text-align: center;
}

div.genres span {
  display:inline-block;
  background-color:rgb(85, 57, 5);
  border-radius: 5px;
  font-size: 90%;
  padding: 2px 6px 2px 6px;
  margin: 6px 3px 0 3px;
  height: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #ffffff;
}
</style>

