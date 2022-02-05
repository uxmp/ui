<template>
  <div class="cover">
    <img data-amplitude-song-info="cover_art_url" style="width: 110px; height: 110px;" />
  </div>
  <div>
    <div class="title">
      <span data-amplitude-song-info="name" class="song-name"></span>
    </div>
    <div class="album" v-if="nowPlaying !== null">
      {{ $t("shared.from_album") }} <router-link :to="'/album/' + nowPlaying.albumId">{{ nowPlaying.albumName }}</router-link>
    </div>
    <div class="artist" v-if="nowPlaying !== null">
      {{ $t("shared.by_artist") }} <router-link :to="'/artist/' + nowPlaying.artistId">{{ nowPlaying.artistName }}</router-link>
    </div>
  </div>
  <div class="state" v-if="nowPlaying !== null">
    <input type="range" class="amplitude-song-slider" step=".1"/>
    <span class="amplitude-current-minutes">00</span>:<span class="amplitude-current-seconds">00</span> /
    <span class="amplitude-duration">
      <FormatLength :length="nowPlaying.length" />
    </span>
    <FavoriteStarView :itemId="nowPlaying.songId" itemType="song" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import NowPlaying from '../../model/NowPlaying'
import FavoriteStarView from './FavoriteStarView.vue'
import FormatLength from '../Lib/FormatLength.vue'

export default defineComponent({
  name: 'NowPlayingView',
  props: {
    nowPlaying: {
      type: null as unknown as PropType<NowPlaying | null>,
      required: true,
      validator: (v: any) => v instanceof NowPlaying || v === null,
    }
  },
  components: {
    FavoriteStarView,
    FormatLength,
  },
})
</script>

<style scoped>
div.cover {
  grid-row: 1 / span 2;
  height: 150px;
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
</style>
