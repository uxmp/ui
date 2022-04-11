<template>
  <h1>/ <router-link :to="'/playlists'">{{ $t('playlists.title') }}</router-link> / {{ $t('playlists_edit.title') }}</h1>
  <div class="creationBox">
    <div class="errorMessage">
      {{ msg }}
    </div>
    <div>
      <form @submit="create()" v-on:keyup.enter="create()">
        <div>
          <input type="text" class="textInput" :placeholder="$t('playlists_edit.input.name_placeholder')" v-model="name" required />
        </div>
        <div v-if="isNewPlaylist()">
          <select v-model="selectedPlaylistType">
            <option v-for="option in playlistTypes" :value="option.value" v-bind:key="option.value">
                  {{ $t(option.label) }}
            </option>
          </select>
        </div>
        <div>
          <input type="button" class="button" @click="save()" :value="$t('playlists_edit.save')" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { defineComponent } from 'vue'
import Playlist from '../../model/Playlist';
import PlaylistInterface from '../../model/PlaylistInterface';
import EntityLoader from '../Lib/EntityLoader';
import HttpRequest from '../Lib/HttpRequest';
import LoadingIcon from '../Lib/LoadingIcon.vue'

export default defineComponent({
  name: 'PlaylistEdit',
  data() {
    return { 
      playlist: new Playlist(),
      msg: '',
      playlistTypes: null as Array<{value: string, label: string}>|null,
      selectedPlaylistType: 1 as number
    }
  },
  components: {
    LoadingIcon
  },
  computed: {
    name: {
      set: function(val: string): void {
        this.playlist.setName(val.trim());
      },
      get: function(): string {
        return this.playlist.getName();
      }
    },
  },
  async created(): Promise<void> {
    let playlistId = +this.$route.params.playlistId;
    if (playlistId !== 0) {
      EntityLoader.loadPlaylist(playlistId).then((playlist: PlaylistInterface) => this.playlist = playlist);
    } else {
      HttpRequest.get(
        'playlist_types'
      ).then((response: AxiosResponse): void => {
        this.playlistTypes = response.data.items.map((typeId: number): object => {
          return {
            'value': typeId,
            'label': 'playlist_type.' + typeId
          };
        });
      });
    }
  },
  methods: {
    async save(): Promise<void> {
      if (this.isNewPlaylist()) {
        this.create();
      } else {
        this.persist();
      }
    },
    isNewPlaylist(): boolean {
      return this.playlist.getId() === 0
    },
    async create(): Promise<void> {
      HttpRequest.post(
        'playlist',
        {
          name: this.playlist.getName(),
          typeId: this.selectedPlaylistType,
        }
      ).then((response: AxiosResponse): void => {
        let data = response.data;
        if (data.msg) {
          this.msg = data.msg;
        } else {
          this.$router.push('/playlists');
        }
      });
    },
    async persist(): Promise<void> {
      HttpRequest.put(
        '/playlist/' + this.playlist.getId(),
        {
          name: this.playlist.getName(),
        }
      ).then((response: AxiosResponse): void => {
        let data = response.data;
        if (data.msg) {
          this.msg = data.msg;
        } else {
          this.$router.push('/playlists');
        }
      });
    },
  }
})
</script>

<style scoped>
div.creationBox {
  width: 500px;
  margin: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.308);
  border: 1px #446683 solid;
  padding: 5px;
}

div.creationBox form div {
  display: block;
  margin: auto;
  width: 100%;
}

input[type=text],
input[type=password],
select {
  width: 80%;
}

input[type=button] {
  width: 80%;
}
</style>
