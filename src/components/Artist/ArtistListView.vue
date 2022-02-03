<template>
  <h1>Artists</h1>
  <template v-if="artistList !== null">
    <div class="artistInfo">
     Count: {{ quantity }}
    </div>
    <div class="artistList">
      <ArtistListItem v-for="artist in artistList" :key="artist.getId()" :artist="artist" />
    </div>
  </template>
  <template v-else>
    <LoadingIcon />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { plainToClass } from 'class-transformer';
import HttpRequest from '../Lib/HttpRequest';
import Artist from '../../model/Artist';
import ArtistInterface from '../../model/ArtistInterface';
import { AxiosResponse } from 'axios';
import LoadingIcon from '../Lib/LoadingIcon.vue'
import ArtistListItem from './Lib/ArtistListItem.vue'

export default defineComponent({
  name: 'ArtistList',
  data() {
    return { 
      artistList: null as null|Array<ArtistInterface>,
      quantity: 0
    }
  },
  components: {
    LoadingIcon,
    ArtistListItem
  },
  async created(): Promise<void> {
    HttpRequest.get('artists').then((response: AxiosResponse) => {
      this.quantity = response.data.items.length;
      this.artistList = response.data.items.map((artist_data: any): ArtistInterface => {
        return plainToClass(Artist, artist_data);
      });
    });
  },
})
</script>

<style scoped>
div.artistInfo {
  text-align: left;
}

div.artistList {
  margin-top: 10px;
  background-color: #0a0f14;
  border: 1px #446683 solid;
}
</style>
