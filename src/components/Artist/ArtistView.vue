<template>
  <template v-if="artist !== null">
    <h1>/ <router-link :to="'/artists'">{{ $t("artist.artist_list_title") }}</router-link> / &bdquo;{{ artist.getName() }}&rdquo;</h1>
    <div class="action">
      <AddToPlaylist :itemId="artist.getId()" :itemType="'artist'" />
    </div>
    <h2>{{ $t("artist.albums_info") }}</h2>
    <div class="info">
      <a :href="`https://musicbrainz.org/artist/${artist.getMbId()}`" target="_blank">Musicbrainz</a>
    </div>
  </template>
  <template v-if="albumList !== null">
    <div style="display: flex">
      <div style="flex: 2">
        <h2>{{ $t("artist.albums_title") }}</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{{ $t("artist.table.column.name.title") }}</th>
              <th>{{ $t("artist.table.column.length.title") }}</th>
              <th>{{ $t("artist.table.column.year.title") }}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="album in albumList" :key="album.getId()">
              <td>
                <AlbumCover :album="album" :size="120"/>
              </td>
              <td>
                <router-link :to="'/album/' + album.getId()">{{ album.getName() }}</router-link>
              </td>
              <td>
                <FormatLength :length="album.getLength()" />
              </td>
              <td>
                {{ album.getYear() }}
              </td>
              <td>
                <FavoriteStarView :itemId="album.getId()" itemType="album" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="flex: 1; margin-left: 10px">
        <h2>{{ $t("artist.top_songs") }}</h2>
        <template v-if="topSongs !== null">
          <table>
            <thead>
              <tr>
                <th class="play_button"></th>
                <th>{{ $t("artist.table.column.song.title") }}</th>
                <th class="fav_button"></th>
              </tr>
            </thead>
            <tbody v-if="topSongs.length == 0">
              <tr>
                <td colspan="3" class="no_top_songs">{{ $t("artist.table.no_top_songs") }}</td>
              </tr>
            </tbody>
            <tbody v-if="topSongs.length > 0">
              <tr v-for="song in topSongs" :key="song.getId()">
                <td>
                    <PlaySongButton :song="song" />
                </td>
                <td>{{ song.getName() }}</td>
                <td>
                  <FavoriteStarView :itemId="song.getId()" itemType="song" />
                </td>
              </tr>
            </tbody>
          </table>
        </template>
        <template v-else>
          <LoadingIcon />
        </template>
      </div>
    </div>
  </template>
  <template v-else>
    <LoadingIcon />
  </template>
</template>

<script lang="ts">
import { plainToInstance } from 'class-transformer';
import { defineComponent } from 'vue'
import EntityLoader from '@/components/Lib/EntityLoader';
import LoadingIcon from '@/components/Lib/LoadingIcon.vue';
import AlbumCover from '@/components/Album/Lib/AlbumCover.vue';
import Album from '@/model/Album';
import HttpRequest from '@/components/Lib/HttpRequest';
import { AxiosResponse } from 'axios';
import AlbumInterface from '@/model/AlbumInterface';
import ArtistInterface from '@/model/ArtistInterface';
import FavoriteStarView from '@/components/Lib/FavoriteStarView.vue'
import AddToPlaylist from '@/components/Playlist/Lib/AddToPlaylist.vue'
import SongListItemInterface from '@/model/SongListItemInterface';
import SongListItem from '@/model/SongListItem';
import PlaySongButton from '@/components/Lib/PlaySongButton.vue';
import FormatLength from "@/components/Lib/Format/FormatLength.vue";

export default defineComponent({
  name: 'ArtistView',
  data() {
    return { 
      artist: null as null|ArtistInterface,
      albumList: null as null|Array<AlbumInterface>,
      topSongs: null as null|Array<SongListItemInterface>
    }
  },
  emits: ['updatePlaylist', 'updateNowPlaying'],
  components: {
    AlbumCover,
    LoadingIcon,
    FavoriteStarView,
    FormatLength,
    AddToPlaylist,
    PlaySongButton
  },
  beforeMount(): void {
    this.getArtist();
    this.getAlbums();
    this.getTopSongs();
  },
  methods: {
    getArtist(): void {
      EntityLoader.loadArtist(this.$route.params.artistId).then((artist: ArtistInterface): ArtistInterface => this.artist = artist);
    },
    async getAlbums(): Promise<void> {
      HttpRequest.get(
        'albums/' + this.$route.params.artistId
      ).then((response: AxiosResponse) => {
        this.albumList = response.data.items.map((album_data: any): AlbumInterface => {
          return plainToInstance(Album, album_data);
        });
      });
    },
    async getTopSongs(): Promise<void> {
      HttpRequest.get(
        'artist/' + this.$route.params.artistId + '/top_songs'
      ).then((response: AxiosResponse) => {
        this.topSongs = response.data.items.map((song_data: any): SongListItemInterface => {
          return plainToInstance(SongListItem, song_data);
        });
      });
    },
  }
})
</script>

<style scoped>
table th,
table td {
  text-align: left;
}

table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 1rem;
  font-family: sans-serif;
  width: 90%;
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

td.no_top_songs {
  text-align: center;
}

th.play_button {
  width: 50px;
}

th.fav_button {
  width: 30px;
}

div.info,
div.action {
  text-align: left
}
</style>
