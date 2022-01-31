<template>
  <div v-on:click="playAll()" class="playall">
    <span>
      <font-awesome-icon :icon="['fas', 'play']" /> Play all
    </span>
  </div>
  <div>
    Length: <FormatLength :length="length" />
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
            <th></th>
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
            <td>
              <FormatLength :length="song.getLength()" />
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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SongListItemInterface from '../../model/SongListItemInterface';
import Player from '../Lib/Player';
import SongCover from '../Lib/SongCover.vue'
import LoadingIcon from '../Lib/LoadingIcon.vue'
import FavoriteStarView from './FavoriteStarView.vue'
import FormatLength from '../Lib/FormatLength.vue'

export default defineComponent({
  props: {
    songList: {
      type: [Array, null] as PropType<Array<SongListItemInterface>>,
      required: true
    }
  },
  data() {
    return {
      length: 0
    };
  },
  name: 'SongListView',
  components: {
    SongCover,
    LoadingIcon,
    FavoriteStarView,
    FormatLength,
  },
  watch: {
    songList: function (songList) {
      this.length = songList.reduce((length: number, song: SongListItemInterface) => length + song.getLength(), 0);
    }
  },
  methods: {
    async playAll(): Promise<void> {
      if (this.songList) {
        let songList = this.songList.map((song: SongListItemInterface) => Player.createSongListItem(song));

        this.emitter.emit('updatePlaylist', this.songList);

        Player.init(this, songList);
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