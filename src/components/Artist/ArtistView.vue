<template>
  <h1>Artist</h1>
  <template v-if="artist !== null">
    <h2>
      {{ artist.getName() }}
    </h2>
  </template>
  <template v-if="albumList !== []">
    <div class="album-list">
      <h2>Albums</h2>
      <div v-for="album in albumList" :key="album.getAlbumId()" class="album-grid">
        <div>
          <AlbumCover :album="album" @updatePlaylist="updatePlaylist" @updateNowPlaying="updateNowPlaying"/>
        </div>
        <div>
          <div class="title">
            <router-link :to="'/album/' + album.getAlbumId()">{{ album.getName() }}</router-link>
          </div>
          <div class="meta">
            Length: {{ formatLength(album.getLength()) }}
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { plainToClass } from 'class-transformer';
import { defineComponent } from 'vue'
import AlbumListItem from '../../model/AlbumListItem';
import Artist from '../../model/Artist';
import EntityLoader from '../Lib/EntityLoader';
import ServerRequest from '../Lib/ServerRequest';
import formatDurationLength from '../Lib/FormatDurationLength';
import AlbumCover from './../Album/AlbumCover.vue';

export default defineComponent({
  name: 'ArtistView',
  data() {
    return { 
      artist: null,
      albumList: []
    }
  },
  emits: ['updatePlaylist', 'updateNowPlaying'],
  components: {
    AlbumCover
  },
  beforeMount() {
    this.getArtist();
    this.getAlbums();
  },
  async created() {
    if (!this.$store.getters.isLogged) {
      this.$router.push('/login');
    }
  },
  methods: {
    getArtist(): void {
      EntityLoader.loadArtist(this.$route.params.artistId).then((artist: Artist) => this.artist = artist);
    },
    async getAlbums(): Promise<void> {
      let data = await ServerRequest.request(
        'albums/' + this.$route.params.artistId
      ).then(response => response.json());

      this.albumList = data.items.map((album_data: any) => {
        return plainToClass(AlbumListItem, album_data);
      });
    },
    formatLength(length: number): string {
      return formatDurationLength(length);
    }
  }
})
</script>

<style scoped>
div.title {
  text-align: left;
  font-size:  110%;
  font-weight: bold;
}

div.album-grid {
  display: grid;
  grid-template-columns: 130px auto;
}

div.album-list {
  padding-top: 50px;
}

div.meta {
  padding-top: 10px;
  text-align: left;
}
</style>