<template>
  <template v-if="album !== null">
    <h1>Album &bdquo;{{ album.getName() }}&rdquo;</h1>
    <div class="albumGrid">
      <div>
        <div class="albumArtist">
          by <router-link :to="'/artist/' + album.getArtistId()">{{ album.getArtistName() }}</router-link>
        </div>
        <div class="playAlbum">
          <span v-on:click="playAlbum(album)" class="playButton">
            <font-awesome-icon :icon="['fas', 'play']" title="Play" /> Play
          </span>
        </div>
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
        <template v-else>
          <LoadingIcon />
        </template>
      </div>
      <div>
        <FavoriteStarView :itemId="album.getId()" itemType="album" />
        <AlbumCover :album="album" :size="500" />
      </div>
    </div>
  </template>
  <template v-else>
    <LoadingIcon />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'reflect-metadata';
import Album from '../../model/Album';
import formatDurationLength from '../Lib/FormatDurationLength';
import EntityLoader from '../Lib/EntityLoader';
import LoadingIcon from '../Lib/LoadingIcon.vue';
import AlbumCover from './Lib/AlbumCover.vue';
import { plainToClass } from 'class-transformer';
import Disc from '../../model/Disc';
import HttpRequest from '../Lib/HttpRequest';
import SongListItemInterface from '../../model/SongListItemInterface';
import Player from '../Lib/Player';
import { AxiosResponse } from 'axios';
import FavoriteStarView from '../Lib/FavoriteStarView.vue'

export default defineComponent({
  name: 'AlbumView',
  data() {
    return { 
      album: null,
      albumDiscs: null
    }
  },
  components: {
    AlbumCover,
    LoadingIcon,
    FavoriteStarView,
  },
  async created(): Promise<void> {
    EntityLoader.loadAlbum(+this.$route.params.albumId).then((album: Album) => this.album = album);

    HttpRequest.get(
      'album/' + this.$route.params.albumId + '/songs'
    ).then((response: AxiosResponse) => {
      this.albumDiscs = response.data.items.map((disc_raw: Object) => plainToClass(Disc, disc_raw));
    });
  },
  methods: {
    formatLength(length: number): string {
      return formatDurationLength(length);
    },
    async play(song: SongListItemInterface): Promise<void> {
      Player.playSong(song, this);
    },
    async playAlbum(album: Album): Promise<void> {
      Player.playAlbum(album.getId(), this);
    }
  }
})
</script>

<style scoped>
div {
  text-align: left;
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

.playButton {
  cursor: pointer;
}

.playButton:hover {
  color: rgb(85, 57, 5);
}

div.playAlbum {
  font-size: 150%;
  padding-bottom: 20px;
}

div.playAlbum span {
  cursor: pointer;
}

div.albumArtist {
  font-size: 130%;
  padding-bottom: 20px;
}
</style>
