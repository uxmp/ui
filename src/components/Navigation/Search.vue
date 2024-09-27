<template>
  <span class="glass">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" :title="$t('header.search')"/>
    </span>
  <input type="text" :placeholder="$t('header.search')" v-model="searchQuery" @keyup="search" class="searchInput"/>

  <Modal v-show="isVisible" @close="closeModal">
    <template v-slot:header>
            <span class="glass">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" :title="$t('header.search')"/>
            </span>
      <input
          type="text"
          ref="modalSearchInput"
          :placeholder="$t('header.search')"
          v-model="searchQuery"
          @keyup="search"
          v-on:keydown.esc="closeModal"
      />
    </template>

    <template v-slot:body>
      <div class="searchResults scrollbar">
        <template v-if="searchState">
          <LoadingIcon/>
        </template>
        <template v-else>
          <div v-if="searchResult.albums.length > 0">
            <div class="resultListHeader">Albums ({{ searchResult.albums.length }})</div>
            <div class="resultList" v-for="album in searchResult.albums" :key="album.getId()">
              <div>
                <AlbumCover :size="60" :album="album"/>
              </div>
              <div>
                <div>
                  <router-link :to="'/album/' + album.getId()" @click="closeModal()">{{ album.getName() }}</router-link>
                </div>
                <div>{{ $t("shared.by_artist") }}
                  <router-link @click.stop @click="closeModal()" :to="'/artist/' + album.getArtistId()">
                    {{ album.getArtistName() }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="searchResult.artists.length > 0">
            <div class="resultListHeader">Artists ({{ searchResult.artists.length }})</div>
            <div class="resultList" v-for="artist in searchResult.artists" :key="artist.getId()">
              <div>
                <ArtistCover :size="60" :artist="artist"/>
              </div>
              <div>
                <span><router-link :to="'/artist/' + artist.getId()" @click="closeModal()">{{
                    artist.getName()
                  }}</router-link></span>
              </div>
            </div>
          </div>
          <div v-if="searchResult.songs.length > 0">
            <div class="resultListHeader">Songs ({{ searchResult.songs.length }})</div>
            <div class="resultList" v-for="song in searchResult.songs" :key="song.getId()">
              <div>
                <SongCover :song="song" :size="60"/>
              </div>
              <div>
                <div>
                  <router-link :key="song.getId()" :to="'/song/' + song.getId()">
                    {{ song.getName() }}
                  </router-link>
                </div>
                <div class="artistName">
                  {{ $t("shared.by_artist") }}
                  <router-link :to="'/artist/' + song.getArtistId()" @click="closeModal()">{{
                      song.getArtistName()
                    }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import {defineComponent, useTemplateRef} from 'vue'
import Modal from "../Lib/Modal.vue";
import LoadingIcon from "../Lib/LoadingIcon.vue";
import SongListItemInterface from "../../model/SongListItemInterface";
import AlbumInterface from "../../model/AlbumInterface";
import ArtistInterface from "../../model/ArtistInterface";
import HttpRequest from "../Lib/HttpRequest";
import {plainToInstance} from "class-transformer";
import Album from "../../model/Album";
import Artist from "../../model/Artist";
import SongListItem from "../../model/SongListItem";
import AlbumCover from "../Album/Lib/AlbumCover.vue";
import ArtistCover from "../Artist/Lib/ArtistCover.vue";
import SongCover from "../Lib/SongCover.vue";

export default defineComponent({
  name: 'Search',
  data() {
    return {
      searchQuery: '',
      searchState: false,
      searchResult: {
        albums: [] as Array<AlbumInterface>,
        artists: [] as Array<ArtistInterface>,
        songs: [] as Array<SongListItemInterface>
      },
      isVisible: false
    }
  },
  components: {SongCover, ArtistCover, AlbumCover, LoadingIcon, Modal},
  methods: {
    async search(): Promise<void> {
      if (this.searchState) {
        return
      }

      if (this.searchQuery.length < 2) {
        return
      }

      useTemplateRef<HTMLInputElement>('modalSearchInput').value?.focus();

      this.searchState = true;

      await this.retrieveResult(this.searchQuery)
    },
    async retrieveResult(searchTerm: string): Promise<void> {
      HttpRequest.post(`search`, {searchTerm: searchTerm}).then(res => {
        this.searchResult.albums = res.data.items.albums.map((data: object): AlbumInterface => plainToInstance(Album, data));
        this.searchResult.songs = res.data.items.songs.map((data: object): SongListItemInterface => plainToInstance(SongListItem, data));
        this.searchResult.artists = res.data.items.artists.map((data: object): ArtistInterface => plainToInstance(Artist, data));
      });

      this.isVisible = true
      this.searchState = false
    },
    closeModal(): void {
      this.searchQuery = ''
      this.searchState = false
      this.isVisible = false
      this.searchResult = {
        albums: [],
        artists: [],
        songs: []
      }
    },
  },
})
</script>

<style scoped>
input[type=text], input[type=text]:hover {
  margin: 0 0 0 10px;
  border-bottom: 1px #446683 solid;
  width: 300px
}

div.searchResults {
  width: 700px;
  line-height: normal;
  overflow-y: scroll;
  max-height: 700px;
}

div.resultList {
  display: grid;
  grid-template-columns: 100px auto;
  width: 100%;
  height: 100%;
  margin-top: 15px;
}

div.resultListHeader {
  font-size: 80%;
  font-weight: bold;
  margin: 15px 0 15px 0;
}

span.glass {
  color: rgb(192, 140, 44);
}

div.artistName {
  margin-top: 3px;
}
</style>
