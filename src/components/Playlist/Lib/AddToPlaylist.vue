<template>
  <div class="addToPlaylist button">
    <span v-on:click="openModal()" class="playButton">
      <font-awesome-icon :icon="['fas', 'plus']" title="Add to playlist" /> {{ $t("shared.add_to_playlist") }}
    </span>
  </div>
  <Modal
    v-show="isVisible"
    @close="closeModal"
  >
    <template v-slot:header>
      {{ $t("shared.add_to_playlist") }}
    </template>

    <template v-slot:body>
      Fna
      <div class="list">
        <template v-if="playlists !== null">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>{{ $t('playlists.table.columns.name') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="playlist in playlists" :key="playlist.getId()">
                <td>
                  <input type="checkbox" :id="'cb' + playlist.getId()" v-model="checked">
                </td>
                <td>
                  <label :for="'cb' + playlist.getId()" >{{ playlist.getName() }}</label>
                </td>
              </tr>
            </tbody>
          </table>
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

export default defineComponent({
  name: 'AddToPlaylist',
  data() {
    return { 
      playlists: [] as Array<PlaylistInterface>,
      isVisible: false as boolean,
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
          return plainToInstance(Playlist, album_data);
        });
      });
    },
    openModal(): void {
      this.isVisible = true;
    },
    closeModal(): void {
      this.isVisible = false;
    },
  }
})
</script>

<style scoped>
div.list {
  width: 500px;
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
