<template>
  <template v-if="album !== null">
    <h1>/ <router-link :to="'/albums'">{{ $t("album_list.title") }}</router-link> / &bdquo;{{ album.getName() }}&rdquo;</h1>
    <div class="albumGrid">
      <div>
        <div class="albumArtist">
          {{ $t("shared.by_artist") }} <router-link :to="'/artist/' + album.getArtistId()">{{ album.getArtistName() }}</router-link>
        </div>
        <div class="playAlbum">
          <span v-on:click="playAlbum()" class="playButton">
            <font-awesome-icon :icon="['fas', 'play']" title="Play" /> {{ $t("shared.play") }}
          </span>
        </div>
        <div>
          {{ $t("album.total_length_title") }}: <FormatLength :length="album.getLength()" />
        </div>
        <template v-if="albumDiscs !== null">
          <div class="album" v-for="disc in albumDiscs" :key="disc.getId()">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>#</th>
                  <th>{{ $t("album.table.name_column_title") }}</th>
                  <th>{{ $t("album.table.length_column_title") }}</th>
                  <th>{{ $t("album.table.year_column_title") }}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="song in disc.getSongList()" :key="song.getId()">
                  <td>
                    <PlaySongButton :song="song" />
                  </td>
                  <td>{{ song.getTracknumber() }}</td>
                  <td>{{ song.getName() }}</td>
                  <td>
                    <FormatLength :length="song.getLength()" />
                  </td>
                  <td>
                    {{ song.getYear() }}
                  </td>
                  <td>
                    <FavoriteStarView :itemId="song.getId()" itemType="song" />
                  </td>
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
import { defineComponent, inject } from 'vue'
import 'reflect-metadata';
import EntityLoader from '../Lib/EntityLoader';
import LoadingIcon from '../Lib/LoadingIcon.vue';
import AlbumCover from './Lib/AlbumCover.vue';
import { plainToClass } from 'class-transformer';
import Disc from '../../model/Disc';
import HttpRequest from '../Lib/HttpRequest';
import Player from '../Lib/Player';
import { AxiosResponse } from 'axios';
import FavoriteStarView from '../Lib/FavoriteStarView.vue'
import PlaySongButton from '../Lib/PlaySongButton.vue'
import AlbumInterface from '../../model/AlbumInterface';
import DiscInterface from '../../model/DiscInterface';
import FormatLength from '../Lib/FormatLength.vue'

export default defineComponent({
  name: 'AlbumView',
  data() {
    return { 
      album: null as null|AlbumInterface,
      albumDiscs: null as null|Array<DiscInterface>
    }
  },
  setup() {
    const player = inject('ply') as Player;
    return {
      player,
    };
  },
  components: {
    AlbumCover,
    LoadingIcon,
    FavoriteStarView,
    PlaySongButton,
    FormatLength
  },
  async created(): Promise<void> {
    EntityLoader.loadAlbum(+this.$route.params.albumId).then((album: AlbumInterface) => this.album = album);

    HttpRequest.get(
      'album/' + this.$route.params.albumId + '/songs'
    ).then((response: AxiosResponse) => {
      this.albumDiscs = response.data.items.map((disc_raw: Object): DiscInterface => plainToClass(Disc, disc_raw));
    });
  },
  methods: {
    async playAlbum(): Promise<void> {
      if (this.album !== null) {
        this.player.playAlbum(this.album.getId(), this);
      }
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

div.playAlbum {
  font-size: 150%;
  padding-bottom: 20px;
}

div.playAlbum span {
  cursor: pointer;
}

div.playAlbum span:hover {
  color: rgb(85, 57, 5);
}

div.albumArtist {
  font-size: 130%;
  padding-bottom: 20px;
}
</style>
