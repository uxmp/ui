<template>
  <h1>Albums</h1>
  <div class="album" v-for="album in albumList" :key="album.getAlbumId()">
    <div class="album_inner">
      <AlbumCover :album="album" @updateNowPlaying="updateNowPlaying" @updatePlaylist="updatePlaylist" />
      <div class="album_name">
        <router-link :to="'/album/' + album.getAlbumId()">{{ album.getName() }}</router-link>
      </div>
      <div class="album_artist">
        by <router-link :to="'/artist/' + album.getArtistId()">{{ album.getArtistName() }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { plainToClass } from 'class-transformer';
import AlbumListItem from '../../model/AlbumListItem';
import Player from '../Lib/Player';
import ServerRequest from '../Lib/ServerRequest';
import EntityLoader from '../Lib/EntityLoader';
import AlbumCover from './AlbumCover.vue';

export default defineComponent({
  name: 'AlbumList',
  emits: ['updatePlaylist', 'updateNowPlaying'],
  data() {
    return { 
      albumList: []
    }
  },
  components: {
    AlbumCover
  },
  beforeMount() {
    this.getAlbums();
  },
  async created() {
    if (!this.$store.getters.isLogged) {
      this.$router.push('/login');
    }
  },
  methods: {
    async getAlbums() {
      let data = await ServerRequest.request(
        'albums'
      ).then(response => response.json());

      this.albumList = data.items.map((album_data: any) => {
        return plainToClass(AlbumListItem, album_data);
      });
    },

    play(item: AlbumListItem) {
      EntityLoader.loadAlbum(item.getAlbumId()).then(album => {
        this.emitter.emit('updatePlaylist', album.getDiscs()[0].getSongList());
        Player.playAlbum(album, this);
      });
    }
  }
})
</script>

<style scoped>
div.album {
  display: inline-flex;
  width: 300px;
  height: 180px;
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
