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
        <div class="addToPlaylist">
          <AddToPlaylist :itemId="album.getId()" :itemType="'album'" :showTitle="true" />
        </div>
        <div>
          {{ $t("album.total_length_title") }}: <FormatLength :length="album.getLength()" />
        </div>
        <div v-if="album.getYear() !== null">
          {{ $t("album.year") }}: {{ album.getYear() }}
        </div>
        <template v-if="albumDiscs !== null">
          <div class="album" v-for="disc in albumDiscs" :key="disc.getId()">
            <h3 v-if="albumDiscs.length > 1">
              {{ $t('album.disc_title', { number: disc.getNumber() }) }}
            </h3>
            <table>
              <thead>
                <tr>
                  <th class="trackNumber">#</th>
                  <th class="buttons"></th>
                  <th>{{ $t("album.table.name_column_title") }}</th>
                  <th>{{ $t("album.table.length_column_title") }}</th>
                  <th>{{ $t("album.table.year_column_title") }}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="song in disc.getSongList()" :key="song.getId()">
                  <td>{{ song.getTracknumber() }}</td>
                  <td>
                    <PlaySongButton :song="song" />
                  </td>
                  <td>
                    <router-link :key="song.getId()" :to="'/song/' + song.getId()">
                      {{ song.getName() }}
                    </router-link>
                  </td>
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
        <div class="genres" v-if="album.getGenres().length > 0">
          <router-link :key="genre.getId()" v-for="genre in album.getGenres()" :to="'/albums/genre/' + genre.getId()">
            <span :key="genre.getId()">{{ genre.getTitle() }}</span>
          </router-link>
        </div>
        <div class="musicBrainz">
          <a :href="`https://musicbrainz.org/release/${album.getMbId()}`" target="_blank">Musicbrainz</a>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <LoadingIcon />
  </template>
</template>

<script lang="ts">
import {EventTypes} from "@/components/Lib/EventTypes";
import {Emitter} from "mitt";
import { defineComponent, inject } from 'vue'
import 'reflect-metadata';
import EntityLoader from '@/components/Lib/EntityLoader';
import LoadingIcon from '@/components/Lib/LoadingIcon.vue';
import AlbumCover from '@/components/Album/Lib/AlbumCover.vue';
import { plainToInstance } from 'class-transformer';
import Disc from '@/model/Disc';
import HttpRequest from '@/components/Lib/HttpRequest';
import Player from '@/components/Lib/Player';
import { AxiosResponse } from 'axios';
import PlaySongButton from '@/components/Lib/PlaySongButton.vue'
import AlbumInterface from '@/model/AlbumInterface';
import DiscInterface from '@/model/DiscInterface';
import AddToPlaylist from '@/components/Playlist/Lib/AddToPlaylist.vue'
import FormatLength from '@/components/Lib/Format/FormatLength.vue';
import FavoriteStarView from '@/components/Lib/FavoriteStarView.vue'

export default defineComponent({
  name: 'AlbumView',
  data() {
    return { 
      album: null as null|AlbumInterface,
      albumDiscs: null as null|Array<DiscInterface>,
    }
  },
  setup() {
    const player = inject('ply') as Player;
    const emitter = inject('emitter') as Emitter<EventTypes>;

    return {
      player,
      emitter,
    };
  },
  components: {
    AlbumCover,
    LoadingIcon,
    FavoriteStarView,
    PlaySongButton,
    FormatLength,
    AddToPlaylist,
  },
  async created(): Promise<void> {
    EntityLoader.loadAlbum(+this.$route.params.albumId).then((album: AlbumInterface) => this.album = album);

    HttpRequest.get(
      'album/' + this.$route.params.albumId + '/songs'
    ).then((response: AxiosResponse) => {
      this.albumDiscs = response.data.items.map((disc_raw: object): DiscInterface => plainToInstance(Disc, disc_raw));
    });
  },
  methods: {
    async playAlbum(): Promise<void> {
      if (this.album !== null) {
        this.player.playAlbum(this.album.getId(), this.emitter);
      }
    },
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
  font-size: 1rem;
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
  padding-bottom: 10px;
}
div.addToPlaylist {
  font-size: 110%;
  padding-bottom: 20px;
}

span.playButton {
  cursor: pointer;
}

span.playButton:hover {
  color: rgb(85, 57, 5);
}

div.albumArtist {
  font-size: 130%;
  padding-bottom: 20px;
}

div.genres {
  width: 100%;
  padding-top: 20px;
  text-align: center;
}

div.genres span {
  display:inline-block;
  background-color:rgb(85, 57, 5);
  border-radius: 5px;
  font-size: 80%;
  padding: 2px 6px 2px 6px;
  font-weight: bold;
  margin: 0 3px 0 3px;
  cursor: pointer;
  color: #ffffff;
}

div.musicBrainz {
  width: 100%;
  padding-top: 20px;
  text-align: center;
}

div.addToPlaylist {
  font-size: 110%;
  padding-bottom: 20px;
}

th.trackNumber {
  width: 10px;
}

th.buttons {
  width: 80px;
}
</style>
