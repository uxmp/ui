<template>
  <template v-if="song !== null">
    <h1>&bdquo;{{ song.getName() }}&rdquo;</h1>
    <div class="songArtist">
      {{ $t("shared.by_artist") }} <router-link :to="'/artist/' + song.getArtistId()">{{ song.getArtistName() }}</router-link>
    </div>
    <div class="playSong">
      <span v-on:click="playSong()" class="playButton">
        <font-awesome-icon :icon="['fas', 'play']" title="Play" /> {{ $t("shared.play") }}
      </span>
    </div>
    <div class="addToPlaylist">
      <AddToPlaylist :itemId="song.getId()" :itemType="'song'" :showTitle="true" />
    </div>
    <div>
      {{ $t("album.total_length_title") }}: <FormatLength :length="song.getLength()" />
    </div>
  </template>
  <template v-else>
    <LoadingIcon />
  </template>
</template>

<script lang="ts">
import EntityLoader from "@/components/Lib/EntityLoader";
import {EventTypes} from "@/components/Lib/EventTypes";
import FormatLength from "@/components/Lib/Format/FormatLength.vue";
import LoadingIcon from "@/components/Lib/LoadingIcon.vue";
import Player from '@/components/Lib/Player';
import AddToPlaylist from "@/components/Playlist/Lib/AddToPlaylist.vue";
import SongListItemInterface from "@/model/SongListItemInterface";
import {Emitter} from "mitt";
import {defineComponent, inject} from 'vue'
import 'reflect-metadata';

export default defineComponent({
  name: 'SongView',
  data() {
    return {
      song: null as null|SongListItemInterface,
    }
  },
  setup() {
    const player = inject('ply') as Player;
    const emitter = inject('emitter') as Emitter<EventTypes>;

    return {
      player,
      emitter,
    };
  },
  components: {
    AddToPlaylist, FormatLength,
    LoadingIcon
  },
  async created(): Promise<void> {
    EntityLoader.loadSong(+this.$route.params.songId).then((song: SongListItemInterface) => this.song = song);
  },
  methods: {
    async playSong(): Promise<void> {
      if (this.song !== null) {
        this.player.playSong(this.song, this.emitter);
      }
    },
  }
})
</script>

<style scoped>
div {
  text-align: left;
}

table th,
table td {
  text-align: left;
}

table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 1rem;
  font-family: sans-serif;
  min-width: 100%;
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

div.songArtist {
  font-size: 130%;
  padding-bottom: 20px;
}

div.addToPlaylist {
  font-size: 110%;
  padding-bottom: 20px;
}

div.playSong {
  font-size: 150%;
  padding-bottom: 10px;
}

span.playButton {
  cursor: pointer;
}

span.playButton:hover {
  color: rgb(85, 57, 5);
}
</style>
