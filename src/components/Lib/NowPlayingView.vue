<template>
  <div class="cover">
    <img data-amplitude-song-info="cover_art_url" style="width: 110px; height: 110px;" />
  </div>
  <div>
    <div class="title">
      <span data-amplitude-song-info="name" class="song-name"></span>
    </div>
    <div class="album">
      from <router-link :to="'/album/' + nowPlaying.albumId">{{ nowPlaying.albumName }}</router-link>
    </div>
    <div class="artist">
      by <router-link :to="'/artist/' + nowPlaying.artistId">{{ nowPlaying.artistName }}</router-link>
    </div>
  </div>
  <div class="state">
    <input type="range" class="amplitude-song-slider" step=".1"/>
    <span class="amplitude-current-minutes">00</span>:<span class="amplitude-current-seconds">00</span> /
    <span class="amplitude-duration">{{ formatLength(nowPlaying.length) }}</span>
    <div class="favIcon">
      <font-awesome-icon
        v-on:click="removeFavorite(nowPlaying.songId)"
        class="isFavorite"
        :icon="['fas', 'star']"
        v-if="isFavorite"
        title="Remove from favorites"
      />
      <font-awesome-icon
        v-on:click="addFavorite(nowPlaying.songId)"
        class="isNotFavorite"
        :icon="['far', 'star']"
        v-else title="Add as favorite"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NowPlaying from '../../model/NowPlaying'
import formatDurationLength from './FormatDurationLength';

export default defineComponent({
  name: 'NowPlayingView',
  props: {
    nowPlaying: {
      type: NowPlaying,
      required: true
    }
  },
  data() {
    return { 
      isFavorite: false
    }
  },
  watch: { 
   	nowPlaying: function(newVal: NowPlaying) {
      this.isFavorite = newVal.songId in this.$store.getters['favorites/getSongs'];
    }
  },
  methods: {
    addFavorite(songId: number): void {
      this.isFavorite = true;

      this.$store.dispatch('favorites/addSong', { songId });
    },
    removeFavorite(songId: number): void {
      this.isFavorite = false;

      this.$store.dispatch('favorites/removeSong', { songId });
    },
    formatLength(length: number): string {
      return formatDurationLength(length);
    },
  }
})
</script>

<style scoped>
div.cover {
  grid-row: 1 / span 2;
}

div.title {
  font-size: 110%;
  text-align: left;
}

div.album {
  font-size: 80%;
  text-align: left;
}

div.artist {
  font-size: 80%;
  text-align: left;
}

div.state {
  margin-top: 1%;
  text-align: left;
}

div.favIcon .isNotFavorite:hover,
div.favIcon .isFavorite {
  color: rgb(212, 212, 0);
}
div.favIcon .isNotFavorite,
div.favIcon .isFavorite:hover {
  color: white;
}
</style>
