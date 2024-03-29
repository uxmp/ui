<template>
  <h1>/ {{ $t('playlists.title') }}</h1>
  <div class="create">
    <router-link :to="'/playlist/edit'">+ {{ $t('playlists.create') }}</router-link>
  </div>
  <template v-if="playlists !== null">
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>{{ $t('playlists.table.columns.name') }}</th>
            <th>{{ $t('playlists.table.columns.user_name') }}</th>
            <th>{{ $t('playlists.table.columns.song_count') }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="playlist in playlists" :key="playlist.getId()">
            <td>
              <font-awesome-icon class="playButton button" :icon="['fas', 'play']" v-on:click="play(playlist)" :title="$t('playlists.play_playlist')" />
            </td>
            <td>
              <router-link :to="'/playlist/' + playlist.getId()">{{ playlist.getName() }}</router-link>
            </td>
            <td>
              {{ playlist.getUserName() }}
            </td>
            <td>
              {{ playlist.getSongCount() }}
            </td>
            <td>
              <router-link :to="'/playlist/edit/' + playlist.getId()">
                <font-awesome-icon class="editButton button" :icon="['fas', 'tools']" :title="$t('playlists.edit_playlist')" />
              </router-link>
              <font-awesome-icon class="deleteButton button" :icon="['fas', 'minus-circle']" v-on:click="deletePlaylist(playlist)" :title="$t('playlists.delete_playlist')" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <template v-else>
    <LoadingIcon />
  </template>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import Player from '../Lib/Player';
import LoadingIcon from '../Lib/LoadingIcon.vue'
import PlaylistInterface from '../../model/PlaylistInterface'
import Playlist from '../../model/Playlist'
import HttpRequest from '../Lib/HttpRequest';
import { plainToInstance } from 'class-transformer';

export default defineComponent({
  name: 'PlaylistList',
  data() {
    return { 
      playlists: [] as Array<PlaylistInterface>
    }
  },
  setup() {
    const player = inject('ply') as Player;
    return {
      player,
    };
  },
  components: {
    LoadingIcon
  },
  async created(): Promise<void> {
    this.getPlaylists()
  },
  methods: {
    async getPlaylists(): Promise<void> {
      HttpRequest.get(`playlists`).then(res => {
        this.playlists = res.data.items.map((album_data: any): PlaylistInterface => {
          return plainToInstance(Playlist, album_data);
        });
      });
    },
    async deletePlaylist(deletePlaylist: PlaylistInterface): Promise<void> {
      HttpRequest.delete(`playlist/` + deletePlaylist.getId()).then(() => {
        this.playlists = this.playlists.filter((playlist: PlaylistInterface) => playlist.getId() !== deletePlaylist.getId() )
      });
    },
    async play(playlist: PlaylistInterface): Promise<void> {
      this.player.playPlaylist(playlist.getId(), this);
    }
  }
})
</script>

<style scoped>
div.create {
  text-align: left;
}

.playButton:hover {
  color: rgb(85, 57, 5);
}

.deleteButton:hover {
  color: rgb(107, 0, 0);
}

.editButton {
  margin-right: 20px;
  color: #ffffff;
}

.editButton:hover {
  color: rgb(85, 57, 5);
}
</style>
