<template>
  <div class="artist" v-on:click="showArtist()">
    <div class="artist_inner">
      <ArtistCover :artist="artist" />
      <div class="artist_name">
        <router-link :to="'/artist/' + artist.getId()">{{ artist.getName() }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArtistCover from './ArtistCover.vue';
import ArtistInterface from '../../../model/ArtistInterface';

export default defineComponent({
  name: 'ArtistListItem',
  props: {
    artist: {
      type: Object as () => ArtistInterface,
      required: true
    }
  },
  components: {
    ArtistCover,
  },
  methods: {
    async showArtist(): Promise<void> {
      this.$router.push('/artist/' + this.artist.getId());
    },
  },
})
</script>

<style scoped>
div.artist {
  display: inline-flex;
  width: 300px;
  height: 150px;
  margin: 8px;
  padding: 8px;
  background-color: #11171d;
  border-radius: 5%;
  border: 1px #24303d solid;
}

div.artist:hover {
  background-color: #29313a;
  cursor: pointer;
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
