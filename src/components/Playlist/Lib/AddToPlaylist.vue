<template>
  <div class="addToPlaylist button">
    <span v-on:click="openModal()" class="playButton">
      <font-awesome-icon :icon="['fas', 'plus']" title="Add to playlist" /> {{ $t("add_to_playlists.title") }}
    </span>
  </div>
  <Modal
    v-show="isVisible"
    @close="closeModal"
  >
    <template v-slot:header>
      {{ $t("add_to_playlists.title") }}
    </template>

    <template v-slot:body>
      {{ $t('add_to_playlists.add_media') }}
      <div class="list">
        <template v-if="playlists !== null">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{{ $t('add_to_playlists.table.columns.name') }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="playlist in playlists" :key="playlist.getId()">
                <td>
                  <input type="checkbox" :id="'cb' + playlist.getId()" v-model="selectedPlaylists" :value="playlist.getId()">
                </td>
                <td>
                  <label :for="'cb' + playlist.getId()" >{{ playlist.getName() }}</label>
                </td>
                <td class="loading">
                  <LoadingIcon :size="15" :margin="4" :state="states.get(playlist.getId())"/>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            @click="addToPlaylists()"
          >
            Add
          </button>
        </template>
        <template v-else>
          <LoadingIcon />
        </template>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoadingIcon from '../../Lib/LoadingIcon.vue'
import PlaylistInterface from '../../../model/PlaylistInterface'
import Playlist from '../../../model/Playlist'
import HttpRequest from '../../Lib/HttpRequest';
import { plainToInstance } from 'class-transformer';
import Modal from '../../Lib/Modal.vue'
import LoadingState from '../../Lib/LoadingState'

export default defineComponent({
  name: 'AddToPlaylist',
  data() {
    return { 
      playlists: [] as Array<PlaylistInterface>,
      isVisible: false as boolean,
      selectedPlaylists: [] as Array<Number>,
      states: new Map() as Map<number, number>
    }
  },
  props: {
    itemId: {
      type: Number,
      default: 0
    },
    itemType: {
      type: String,
      default: ''
    }
  },
  components: {
    LoadingIcon,
    Modal,
  },
  async created(): Promise<void> {
    this.getPlaylists()
  },
  methods: {
    async getPlaylists(): Promise<void> {
      HttpRequest.get(`playlists/user`).then(res => {
        this.playlists = res.data.items.map((album_data: any): PlaylistInterface => {
          let playlist = plainToInstance(Playlist, album_data);
          this.states.set(playlist.getId(), LoadingState.NONE);
          return playlist;
        });
      });
    },
    openModal(): void {
      this.isVisible = true;
    },
    closeModal(): void {
      this.isVisible = false;
    },
    addToPlaylists(): void {
      this.selectedPlaylists.map((playlistId: Number): void => {
        this.states.set(playlistId, LoadingState.LOADING);

        HttpRequest.post(
          `playlists/songs`,
          {
            'itemType': this.itemType,
            'itemId': this.itemId
          }
        )
        .then(res => {
          this.states.set(playlistId, LoadingState.SUCCESS);
        })
        .catch(res => {
          this.states.set(playlistId, LoadingState.ERROR);
        });
      });
    }
  }
})
</script>

<style scoped>
div.list {
  width: 500px;
}

td.loading {
  width: 50px;
}

div.addToPlaylist {
  font-size: 110%;
  padding-bottom: 20px;
}

div.button span {
  cursor: pointer;
}

div.button span:hover {
  color: rgb(85, 57, 5);
}
</style>
