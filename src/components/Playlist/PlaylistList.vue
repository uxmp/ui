<template>
  <h1>/ {{ $t('playlists.title') }}</h1>
  <div class="create">
    <router-link :to="'/playlists/edit'">+ {{ $t('playlists.create_title') }}</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import Player from '../Lib/Player';
import LoadingIcon from '../Lib/LoadingIcon.vue'

export default defineComponent({
  name: 'PlaylistList',
  data() {
    return { 
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
    this.getRadioStations()
  },
  methods: {
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
