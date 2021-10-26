<template>
  <h1>Artists</h1>
  <div class="artist" v-for="artist in artistList" :key="artist.getId()">
    <div class="artist_inner">
      <div class="cover_container">
        <img class="cover_play" v-on:click="play(artist)" v-bind:src="artist.getCover()" />
        <div class="cover_overlay" v-on:click="play(artist)">
          <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M20 33l12-9-12-9v18zm4-29C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z" class="overlay_play_button"  /></svg>
        </div>
      </div>
      <div class="artist_name">
        <router-link :to="'/artist/' + artist.getId()">{{ artist.getName() }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { plainToClass } from 'class-transformer';
import HttpRequest from '../Lib/HttpRequest';
import Artist from '../../model/Artist';
import Player from '../Lib/Player';
import { AxiosResponse } from 'axios';

export default defineComponent({
  name: 'ArtistList',
  data() {
    return { 
      artistList: [] as PropType<Array<Artist>>
    }
  },
  async created(): Promise<void> {
    HttpRequest.get('artists').then((response: AxiosResponse) => {
      this.artistList = response.data.items.map((artist_data: any) => {
        return plainToClass(Artist, artist_data);
      });
    });
  },
  methods: {
    async play(artist: Artist): Promise<void> {
      Player.playArtist(artist, this);
    }
  }
})
</script>

<style scoped>
div.cover_container {
  display: flex;
  position: relative;
  width: 120px;
  height: 120px;
  margin: auto;
}

img.cover_play {
  cursor: pointer;
  opacity: 1;
  display: block;
  width: 120px;
  height: 120px;
  transition: .2s ease;
  backface-visibility: hidden;
}

div.cover_overlay {
  transition: .2s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  cursor: pointer;
}

path.overlay_play_button {
  fill: rgb(141, 102, 31);
}

div.cover_container:hover .cover_play {
  opacity: 0.3;
}

div.cover_container:hover .cover_overlay {
  opacity: 1;
}

div.artist {
  display: inline-flex;
  width: 300px;
  height: 160px;
  background-color: #0a0f14;
  margin: 10px;
  padding: 15px;
  border: 1px #446683 solid;
}

div.artist_inner {
  display: block;
  width: 100%;
  height: 100%;
}

div.artist_name {
  padding-top: 10px;
  font-size: 110%;;
}
</style>
