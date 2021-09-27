<template>
  <h1>Random songs</h1>
  <div v-on:click="playAll()" class="playall">
    <font-awesome-icon :icon="['fas', 'play']" /> Play all
  </div><br />
  <div class="song" v-for="song in songList" :key="song.getId()">
    <div class="album_inner">
      <img class="cover_play" v-bind:src="song.getCover()" width="60" height="60" /><br />
      <div class="song_name">
        {{ song.getName() }}
      </div>
      <div class="album_artist">
        by <router-link :to="'/artist/' + song.getArtistId()">{{ song.getArtistName() }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { plainToClass } from 'class-transformer';
import { defineComponent } from 'vue'
import SongListItem from '../../model/SongListItem';
import Player from '../Lib/Player';
import ServerRequest from '../Lib/ServerRequest';

export default defineComponent({
  data() {
    return {
      songList: [] as Array<SongListItem>
    };
  },
  name: 'RandomSongs',
  beforeMount() {
    this.getSongs(100);
  },
  async beforeRouteUpdate(to, from) {
    this.getSongs(to.params.limit)
  },
  methods: {
    async getSongs(limit: number) {
      let data = await ServerRequest.request(
        'random/songs/' + limit
      ).then(response => response.json());

      this.songList = data.items.map((song_data: any) => {
        return plainToClass(SongListItem, song_data);
      });
    },
    playAll() {
      const list: Object[] = [];

      for (var song of this.songList) {
        list.push(Player.createSongListItem(song));
      }

      this.emitter.emit('updatePlaylist', this.songList);

      Player.init(this, list);
      Player.playIndex(0);
    }
  }
})
</script>

<style scoped>
img.cover_play {
  cursor: pointer;
}

div.playall {
  cursor: pointer;
}

div.song {
  display: inline-flex;
  width: 300px;
  height: 100px;
  background-color: #0a0f14;
  margin: 10px;
  padding: 15px;
  border: 1px #446683 solid;
}

div.album_inner {
  display: block;
  width: 100%;
  height: 100%;
}

div.album_name {
  padding-top: 5px;
}

div.album_artist {
  font-size: 80%;
}
</style>
  