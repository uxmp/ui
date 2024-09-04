<template>
  <div class="playall">
    <span v-on:click="playAll()">
      <font-awesome-icon :icon="['fas', 'play']"/> {{ $t("song_list.play_all_title") }}
    </span>
  </div>
  <div>
    {{ $t("song_list.length_title") }}
    <FormatLength :length="length"/>
  </div>
  <div class="songTable">
    <table>
      <thead>
      <tr>
        <th class="cover"></th>
        <th>{{ $t("song_list.table.column.name.title") }}</th>
        <th>{{ $t("song_list.table.column.artist.title") }}</th>
        <th>{{ $t("song_list.table.column.length.title") }}</th>
        <th>{{ $t("song_list.table.column.year.title") }}</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="song in songList" :key="song.getId()">
        <td>
          <SongCover :size="50" :song="song"/>
        </td>
        <td>
          <div class="songName">
            {{ song.getName() }}
          </div>
          <div class="albumName">
            {{ $t("shared.from_album") }}
            <router-link :to="'/album/' + song.getAlbumId()">{{ song.getAlbumName() }}</router-link>
          </div>
        </td>
        <td>
          <router-link :to="'/artist/' + song.getArtistId()">{{ song.getArtistName() }}</router-link>
        </td>
        <td>
          <FormatLength :length="song.getLength()"/>
        </td>
        <td>
          {{ song.getYear() }}
        </td>
        <td>
          <div class="button">
            <AddToPlaylist :itemId="song.getId()" :itemType="'song'"/>
          </div>
          <div class="button">
            <FavoriteStarView :itemId="song.getId()" itemType="song"/>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, PropType} from 'vue'
import SongListItemInterface from '@/model/SongListItemInterface';
import FavoriteStarView from './FavoriteStarView.vue'
import Player from '@/components/Lib/Player';
import SongCover from '@/components/Lib/SongCover.vue'
import LoadingIcon from '@/components/Lib/LoadingIcon.vue'
import AddToPlaylist from '@/components/Playlist/Lib/AddToPlaylist.vue'
import FormatLength from '@/components/Lib/Format/FormatLength.vue';

export default defineComponent({
  props: {
    songList: {
      type: Array as PropType<Array<SongListItemInterface>>,
      required: true
    }
  },
  setup() {
    const player = inject('ply') as Player;
    return {
      player,
      length: 0
    };
  },
  name: 'SongListView',
  components: {
    SongCover,
    LoadingIcon,
    FavoriteStarView,
    FormatLength,
    AddToPlaylist,
  },
  watch: {
    songList: function (songList) {
      this.length = songList.reduce((length: number, song: SongListItemInterface) => length + song.getLength(), 0);
    }
  },
  methods: {
    async playAll(): Promise<void> {
      if (this.songList) {
        this.emitter.emit('updatePlaylist', this.songList);

        this.player.init(
            this,
            this.songList.map((song: SongListItemInterface) => this.player.createSongListItem(song))
        );
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

th.cover {
  width: 60px;
}

div.button {
  display: inline-block;
  padding-left: 6px;
}
</style>
