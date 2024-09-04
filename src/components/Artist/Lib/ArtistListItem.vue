<template>
  <div class="artist" v-on:click="showArtist()">
    <div class="artist_inner">
      <ArtistCover :artist="artist" :displayMetadata="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArtistCover from './ArtistCover.vue';
import ArtistInterface from '@/model/ArtistInterface';

export default defineComponent({
  name: 'ArtistListItem',
  props: {
    artist: {
      type: Object as () => ArtistInterface,
      required: true
    },
    displayMetadata: {
      type: Boolean,
      default: false
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
  color: rgb(141, 102, 31);
  display: inline-flex;
  width: 260px;
  height: 260px;
  margin: 6px;
  padding: 10px;
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
</style>
