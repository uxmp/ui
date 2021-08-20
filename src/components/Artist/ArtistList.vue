<template>
  <h1>Artists</h1>
  <ul id="array-rendering">
    <li v-for="artist in artistList" :key="artist.getId()">
      <div>
        {{ artist.getName() }}
      </div>
      <br />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { plainToClass } from 'class-transformer';
import { Artist } from '../../model/artist';
export default defineComponent({
  name: 'ArtistList',
  data() {
    return { 
      artistList: []
    }
  },
  beforeMount() {
    this.getArtists();
  },
  methods: {
    async getArtists() {
      const res = await fetch(
        'http://localhost:8888/artists',
        {
          method: "GET",
          credentials: "include"
        }
      );
      const data = await res.json();

      this.artistList = data.items.map((artist_data: any) => {
        return plainToClass(Artist, artist_data);
      });
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
