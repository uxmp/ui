<template>
  <template v-if="artist !== null">
    <h1>Artist &bdquo;{{ artist.getName() }}&rdquo;</h1>
  </template>
  <template v-if="albumList !== []">
    <h2>Albums</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="album in albumList" :key="album.getId()">
          <td>
            <AlbumCover :album="album" />
          </td>
          <td>
            <router-link :to="'/album/' + album.getId()">{{ album.getName() }}</router-link>
          </td>
          <td>
            {{ formatLength(album.getLength()) }}
          </td>
        </tr>
      </tbody>
    </table>
  </template>
</template>

<script lang="ts">
import { plainToClass } from 'class-transformer';
import { defineComponent } from 'vue'
import Artist from '../../model/Artist';
import EntityLoader from '../Lib/EntityLoader';
import ServerRequest from '../Lib/ServerRequest';
import formatDurationLength from '../Lib/FormatDurationLength';
import AlbumCover from './../Album/AlbumCover.vue';
import Album from '../../model/Album';

export default defineComponent({
  name: 'ArtistView',
  data() {
    return { 
      artist: null,
      albumList: []
    }
  },
  emits: ['updatePlaylist', 'updateNowPlaying'],
  components: {
    AlbumCover
  },
  beforeMount(): void {
    this.getArtist();
    this.getAlbums();
  },
  methods: {
    getArtist(): void {
      EntityLoader.loadArtist(this.$route.params.artistId).then((artist: Artist) => this.artist = artist);
    },
    async getAlbums(): Promise<void> {
      let data = await ServerRequest.request(
        'albums/' + this.$route.params.artistId
      ).then(response => response.json());

      this.albumList = data.items.map((album_data: any): Album => {
        return plainToClass(Album, album_data);
      });
    },
    formatLength(length: number): string {
      return formatDurationLength(length);
    }
  }
})
</script>

<style scoped>
table th,
table td {
  text-align: left;
}

table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 90%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.308);
}

table thead tr {
  background-color: rgb(85, 57, 5);
  color: #ffffff;
  text-align: left;
}

th,
td {
  padding: 12px 15px;
}

tbody tr {
  border-bottom: 1px solid #11171d;;
}

tbody tr:hover {
  background-color: #1c2c3a ! important;
}

tbody tr:nth-of-type(even) {
  background-color: #11171d;
}

table tbody tr:last-of-type {
  border-bottom: 2px solid rgb(85, 57, 5);
}
</style>