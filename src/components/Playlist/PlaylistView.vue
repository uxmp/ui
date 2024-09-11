<template>
  <template v-if="playlist !== null">
    <h1>/ <router-link :to="'/playlists'">{{ $t("playlist.title") }}</router-link> / &bdquo;{{ playlist.getName() }}&rdquo;</h1>
    <SongListView :songList="songList" />
  </template>
  <template v-else>
    <LoadingIcon />
  </template>
</template>

<script lang="ts">
import {EventTypes} from "@/components/Lib/EventTypes";
import {Emitter} from "mitt";
import { defineComponent, inject } from 'vue'
import Player from '../Lib/Player';
import LoadingIcon from '../Lib/LoadingIcon.vue'
import PlaylistInterface from '../../model/PlaylistInterface'
import HttpRequest from '../Lib/HttpRequest';
import { plainToInstance } from 'class-transformer';
import EntityLoader from '../Lib/EntityLoader';
import { AxiosResponse } from 'axios';
import SongListItemInterface from '../../model/SongListItemInterface';
import SongListItem from '../../model/SongListItem';
import SongListView from '../Lib/SongListView.vue'

export default defineComponent({
  name: 'PlaylistView',
  data() {
    return { 
      playlist: null as null|PlaylistInterface,
      songList: [] as Array<SongListItemInterface>,
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
    LoadingIcon,
    SongListView,
  },
  async created(): Promise<void> {
    EntityLoader.loadPlaylist(+this.$route.params.playlistId).then((playlist: PlaylistInterface) => this.playlist = playlist);

    HttpRequest.get(
      'playlist/' + this.$route.params.playlistId + '/songs'
    ).then((response: AxiosResponse) => {
      this.songList = response.data.items.map((data: object): SongListItemInterface => plainToInstance(SongListItem, data));
    });
  },
  methods: {
    async play(playlist: PlaylistInterface): Promise<void> {
      this.player.playPlaylist(playlist.getId(), this.emitter);
    }
  }
})
</script>

<style scoped>
</style>
