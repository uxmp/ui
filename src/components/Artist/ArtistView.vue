<template>
  <template v-if="artist !== null">
    <h1>Artist &bdquo;{{ artist.getName() }}&rdquo;</h1>
  </template>
  <template v-if="albumList !== []">
    <div class="album-list">
      <h2>Albums</h2>
      <div v-for="album in albumList" :key="album.getId()" class="album-grid">
        <div>
          <AlbumCover :album="album" />
        </div>
        <div>
          <div class="title">
            <router-link :to="'/album/' + album.getId()">{{ album.getName() }}</router-link>
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
import Artist from '../../model/Artist';
import EntityLoader from '../Lib/EntityLoader';
import ServerRequest from '../Lib/ServerRequest';
import formatDurationLength from '../Lib/FormatDurationLength';
import AlbumCover from './../Album/AlbumCover.vue';
import Album from '../../model/Album';

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
  methods: {
    getArtist(): void {
      EntityLoader.loadArtist(this.$route.params.artistId).then((artist: Artist) => this.artist = artist);
    },
    async getAlbums(): Promise<void> {
      let data = await ServerRequest.request(
        'albums/' + this.$route.params.artistId
      ).then(response => response.json());

      this.albumList = data.items.map((album_data: any) => {
        return plainToClass(Album, album_data);
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

div.meta {
  padding-top: 10px;
  text-align: left;
}
</style>