<template>
  <h1>Random songs</h1>
  <img src="/src/assets/icons/play.svg" v-on:click="playAll()" /><br />
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
import { SongListItem } from '../../../model/SongListItem';
import { Player } from '../../Player/player';
import DefaultOptions from '../../Lib/DefaultOptions'

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
  async created() {
    if (!this.$store.getters.isLogged) {
      this.$router.push('/login');
    }
  },
  methods: {
    async getSongs(limit: number) {
      const res = await fetch(
        import.meta.env.VITE_API_URL + 'random/songs/' + limit,
        DefaultOptions
      );
      const data = await res.json();

      this.songList = data.items.map((song_data: any) => {
        return plainToClass(SongListItem, song_data);
      });
    },
    playAll() {
      const list: Object[] = [];

      for (var song of this.songList) {
        list.push(Player.createSongListItem(song));
      }

      Player.init(this, list);
      Player.playIndex(0);

      this.$emit('updatePlaylist', this.songList);
    }
  }
})
</script>

<style scoped>
img.cover_play {
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
  