<template>
  <h1>Random starred songs</h1>
  <div v-on:click="playAll()" class="playall">
    <span>
      <font-awesome-icon :icon="['fas', 'play']" /> Play all
    </span>
  </div>
  <div>
    Length: {{ formatLength(length) }}
  </div>
  <template v-if="songList !== null">
    <div class="songTable">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Artist</th>
            <th>Length</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="song in songList" :key="song.getId()">
            <td>
              <SongCover size="60" :song="song" />
            </td>
            <td>
              <div class="songName">
                {{ song.getName() }}
              </div>
              <div class="albumeName">
                from <router-link :to="'/album/' + song.getAlbumId()">{{ song.getAlbumName() }}</router-link>
              </div>
            </td>
            <td>
              <router-link :to="'/artist/' + song.getArtistId()">{{ song.getArtistName() }}</router-link>
            </td>
            <td>{{ formatLength(song.getLength()) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <template v-else>
    <LoadingIcon />
  </template>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router';
import SongListItem from '../../model/SongListItem';
import SongListItemInterface from '../../model/SongListItemInterface';
import formatDurationLength from '../Lib/FormatDurationLength';
import HttpRequest from '../Lib/HttpRequest';
import Player from '../Lib/Player';
import SongCover from '../Lib/SongCover.vue'
import LoadingIcon from '../Lib/LoadingIcon.vue'

export default defineComponent({
  data() {
    return {
      songList: null as Array<SongListItemInterface>|null,
      limit: 100,
      length: 0
    };
  },
  name: 'RandomFavoriteSongs',
  components: {
    SongCover,
    LoadingIcon
  },
  beforeMount(): void {
    this.limit = +useRoute().params.limit;
  },
  async beforeRouteUpdate(to, from): Promise<void> {
    this.limit = +to.params.limit;
  },
  watch: {
    limit: function () {
      this.getSongs(this.limit);
    },
    songList: function (songList) {
      this.length = songList.reduce((length: number, song: SongListItemInterface) => length + song.getLength(), 0);
    }
  },
  methods: {
    formatLength(length: number): string {
      return formatDurationLength(length);
    },
    async getSongs(limit: number): Promise<void> {
      HttpRequest.get(
        'random/favorite/' + limit
      ).then((response: AxiosResponse) => {
        this.songList = response.data.items.map((song_data: any): SongListItemInterface => {
          return plainToClass(SongListItem, song_data);
        });
      });
    },
    async playAll(): Promise<void> {
      if (this.songList) {
        let songList = this.songList.map((song: SongListItemInterface) => Player.createSongListItem(song));

        this.emitter.emit('updatePlaylist', this.songList);

        Player.init(this, songList);
        Player.playIndex(0);
      }
    }
  }
})
</script>

<style scoped>
div.playall span {
  cursor: pointer;
}

div.playall span:hover {
  color: rgb(85, 57, 5);
}

div.playall {
  font-size: 150%;
  padding-bottom: 20px;
}

div.songName {
  font-size: 130%;
}

div {
  text-align: left;
}

div.songTable {
  margin-right: 15px;
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
</style>
  