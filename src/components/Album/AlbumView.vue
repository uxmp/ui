<template>
  <h1>Album</h1>
  <template v-if="album !== null">
    <div class="albumGrid">
      <div>
        <h2>{{ album.getName() }}</h2>
        <h4>
          by <router-link :to="'/artist/' + album.getArtistId()">{{ album.getArtistName() }}</router-link>
        </h4>
        <h4>
          Length: {{ formatLength(album.getLength()) }}
        </h4>
        <template v-if="albumDiscs !== null">
          <div class="album" v-for="disc in albumDiscs" :key="disc.getId()">
            <table>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Length</th>
              </tr>
              <tr v-for="song in disc.getSongList()" :key="song.getId()">
                <td>{{ song.getTracknumber() }}</td>
                <td>{{ song.getName() }}</td>
                <td>{{ formatLength(song.getLength()) }}</td>
              </tr>
            </table>
          </div>
        </template>
        <template v-else>Oh no 😢</template>
      </div>
      <div>
        <AlbumCover :album="album" />
      </div>
    </div>
  </template>
  <template v-else>Oh no 😢</template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'reflect-metadata';
import Album from '../../model/Album';
import formatDurationLength from '../Lib/FormatDurationLength';
import EntityLoader from '../Lib/EntityLoader';
import AlbumCover from './AlbumCover.vue';
import { plainToClass } from 'class-transformer';
import Disc from '../../model/Disc';
import ServerRequest from '../Lib/ServerRequest';

export default defineComponent({
  name: 'AlbumView',
  data() {
    return { 
      album: null,
      albumDiscs: null
    }
  },
  components: {
    AlbumCover
  },
  async created() {
    EntityLoader.loadAlbum(+this.$route.params.albumId).then((album: Album) => this.album = album);

    ServerRequest.request(
      'album/' + this.$route.params.albumId + '/songs'
    ).then(async (response: Response) => {
      this.albumDiscs = (await response.json()).items.map((disc_raw: Object) => plainToClass(Disc, disc_raw));
    });
  },
  methods: {
    formatLength(length: number): string {
      return formatDurationLength(length);
    }
  }
})
</script>

<style scoped>
div.albumGrid {
  display: grid;
  grid-template-columns: auto 600px;
  height: 100%;
  margin: auto;
}

table th,
table td {
  text-align: left;
}
</style>
