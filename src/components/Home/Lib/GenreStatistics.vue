<template>
  <h3>{{ $t("home.genre_statistics.title") }}</h3>
  <div class="genres">
    <router-link :key="genre.getId()" v-for="genre in items" :to="'/albums/genre/' + genre.getId()">
      <span :title="$t('home.genre_statistics.albumCount', {albumCount: genre.getAlbumCount()})">{{ genre.getName() }}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import GenreStatisticItemInterface from '../../../model/GenreStatisticItemInterface'

export default defineComponent({
  name: 'GenreStatistics',
  props: {
    items: {
      type: Array as PropType<Array<GenreStatisticItemInterface>>,
      required: true
    }
  },
  components: {
  },
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

