<template>
  <template v-if="artist !== null">
    <h1>Artist &bdquo;{{ artist.getName() }}&rdquo;</h1>
  </template>
  <h2>Albums</h2>
  <template v-if="albumList !== null">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Length</th>
          <th></th>
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
            <FormatLength :length="album.getLength()" />
          </td>
          <td>
            <FavoriteStarView :itemId="album.getId()" itemType="album" />
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  <template v-else>
    <LoadingIcon />
  </template>
</template>

<script lang="ts">
import { plainToClass } from 'class-transformer';
import { defineComponent } from 'vue'
import Artist from '../../model/Artist';
import EntityLoader from '../Lib/EntityLoader';
import LoadingIcon from '../Lib/LoadingIcon.vue';
import AlbumCover from '../Album/Lib/AlbumCover.vue';
import Album from '../../model/Album';
import HttpRequest from '../Lib/HttpRequest';
import { AxiosResponse } from 'axios';
import AlbumInterface from '../../model/AlbumInterface';
import ArtistInterface from '../../model/ArtistInterface';
import FavoriteStarView from '../Lib/FavoriteStarView.vue'
import FormatLength from '../Lib/FormatLength.vue'

export default defineComponent({
  name: 'ArtistView',
  data() {
    return { 
      artist: null as null|ArtistInterface,
      albumList: null as null|Array<AlbumInterface>
    }
  },
  emits: ['updatePlaylist', 'updateNowPlaying'],
  components: {
    AlbumCover,
    LoadingIcon,
    FavoriteStarView,
    FormatLength
  },
  beforeMount(): void {
    this.getArtist();
    this.getAlbums();
  },
  methods: {
    getArtist(): void {
      EntityLoader.loadArtist(this.$route.params.artistId).then((artist: Artist): ArtistInterface => this.artist = artist);
    },
    async getAlbums(): Promise<void> {
      HttpRequest.get(
        'albums/' + this.$route.params.artistId
      ).then((response: AxiosResponse) => {
        this.albumList = response.data.items.map((album_data: any): AlbumInterface => {
          return plainToClass(Album, album_data);
        });
      });

    },
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
  border: 1px #446683 solid;
}

table thead tr {
  background-color: #11171d;;
  border-bottom: 1px solid #11171d;;
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
  border-bottom: 2px #446683 solid;
}
</style>