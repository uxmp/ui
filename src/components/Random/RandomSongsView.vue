<template>
  <h1>Random songs</h1>
  <div v-on:click="playAll()" class="playall">
    <font-awesome-icon :icon="['fas', 'play']" /> Play all
  </div><br />
  <div class="song" v-for="song in songList" :key="song.getId()">
    <div class="album_inner">
      <SongCover size="80" :song="song" />
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
import { defineComponent, PropType } from 'vue'
import SongListItem from '../../model/SongListItem';
import SongListItemInterface from '../../model/SongListItemInterface';
import Player from '../Lib/Player';
import ServerRequest from '../Lib/ServerRequest';
import SongCover from '../Lib/SongCover.vue'

export default defineComponent({
  data() {
    return {
      songList: [] as PropType<Array<SongListItemInterface>>
    };
  },
  name: 'RandomSongs',
  components: {
    SongCover
  },
  beforeMount(): void {
    this.getSongs(100);
  },
  async beforeRouteUpdate(to, from): Promise<void> {
    this.getSongs(to.params.limit)
  },
  methods: {
    async getSongs(limit: number): Promise<void> {
      let data = await ServerRequest.request(
        'random/songs/' + limit
      ).then(response => response.json());

      this.songList = data.items.map((song_data: any): SongListItemInterface => {
        return plainToClass(SongListItem, song_data);
      });
    },
    async playAll(): Promise<void> {
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
div.playall {
  cursor: pointer;
}

div.song {
  display: inline-flex;
  width: 300px;
  height: 120px;
  background-color: #0a0f14;
  margin: 10px;
  padding: 15px;
  border: 1px #446683 solid;
}

div.song_name {
  font-size: 90%;
  white-space: nowrap;
  overflow: hidden;
  padding-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
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
  