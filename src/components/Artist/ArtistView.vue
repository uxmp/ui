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
          <div class="cover_container">
            <img class="cover_play" v-on:click="play(album)" v-bind:src="album.getCover()" />
            <div class="cover_overlay" v-on:click="play(album)">
              <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M20 33l12-9-12-9v18zm4-29C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z" class="overlay_play_button"  /></svg>
            </div>
          </div>
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
import Player from '../Lib/Player';
import formatDurationLength from '../Lib/FormatDurationLength';

export default defineComponent({
  name: 'ArtistView',
  data() {
    return { 
      artist: null,
      albumList: []
    }
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
    play(item: AlbumListItem) {
      EntityLoader.loadAlbum(item.getAlbumId()).then(album => {
        this.$emit('updatePlaylist', album.getDiscs()[0].getSongList());
        Player.playAlbum(album, this);
      });
    },
    formatLength(length: number): string {
      return formatDurationLength(length);
    }
  }
})
</script>

<style scoped>
div.cover_container {
  display: flex;
  position: relative;
  width: 100px;
  height: 100px;
  margin: auto;
}

path.overlay_play_button {
  fill: rgb(141, 102, 31);
}

div.cover_container:hover .cover_play {
  opacity: 0.3;
}

div.cover_container:hover .cover_overlay {
  opacity: 1;
}

img.cover_play {
  cursor: pointer;
  opacity: 1;
  display: block;
  width: 100px;
  height: 100px;
  transition: .2s ease;
  backface-visibility: hidden;
}

div.cover_overlay {
  transition: .2s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  cursor: pointer;
}

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
