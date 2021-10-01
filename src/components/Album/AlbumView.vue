<template>
  <template v-if="album !== null">
    <h1>Album &bdquo;{{ album.getName() }}&rdquo;</h1>
    <div class="albumGrid">
      <div>
        <div class="playAlbum">
          <font-awesome-icon class="playButton" :icon="['fas', 'play']" v-on:click="playAlbum(album)" title="Play" /> Play
        </div>
        <h3>
          by <router-link :to="'/artist/' + album.getArtistId()">{{ album.getArtistName() }}</router-link>
        </h3>
        <div>
          Total length: {{ formatLength(album.getLength()) }}
        </div>
        <template v-if="albumDiscs !== null">
          <div class="album" v-for="disc in albumDiscs" :key="disc.getId()">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>#</th>
                  <th>Name</th>
                  <th>Length</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="song in disc.getSongList()" :key="song.getId()">
                  <td>
                    <font-awesome-icon class="playButton" :icon="['fas', 'play']" v-on:click="play(song)" title="Play" />
                  </td>
                  <td>{{ song.getTracknumber() }}</td>
                  <td>{{ song.getName() }}</td>
                  <td>{{ formatLength(song.getLength()) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        <template v-else>Oh no 😢</template>
      </div>
      <div>
        <AlbumCover :album="album" :size="500" />
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
import SongListItemInterface from '../../model/SongListItemInterface';
import Player from '../Lib/Player';

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
    },
    play(song: SongListItemInterface): void {
      Player.playSong(song, this);
    },
    playAlbum(album: Album) {
      Player.playAlbum(album.getId(), this);
    }
  }
})
</script>

<style scoped>
div {
  text-align: left;;
}

div.albumGrid {
  display: grid;
  grid-template-columns: auto 600px;
  margin: auto;
}

table th,
table td {
  text-align: left;
}

table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 100%;
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

.playButton {
  cursor: pointer;
}

.playButton:hover {
  color: rgb(85, 57, 5);
}

div.playAlbum {
  font-size: 150%;
  cursor: pointer;
}
</style>
