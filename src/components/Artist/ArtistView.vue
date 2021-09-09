<template>
  <h1>Artist</h1>
  <div>
    {{ artist.getName() }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Artist } from '../../model/artist';
import EntityLoader from '../Lib/EntityLoader';

export default defineComponent({
  name: 'ArtistView',
  data() {
    return { 
      artist: undefined
    }
  },
  beforeMount() {
    this.getArtist();
  },
  async created() {
    if (!this.$store.getters.isLogged) {
      this.$router.push('/login');
    }
  },
  methods: {
    getArtist(): void {
      EntityLoader.loadArtist(this.$route.params.artistId).then((artist: Artist) => this.artist = artist);
    },
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

img.cover_play {
  cursor: pointer;
}
</style>
