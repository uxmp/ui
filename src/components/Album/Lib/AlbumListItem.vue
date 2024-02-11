<template>
  <div class="album" v-on:click="showAlbum()">
    <div class="album_inner">
      <AlbumCover :album="album" :displayMetadata="displayMetadata" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AlbumCover from './AlbumCover.vue';
import AlbumInterface from '../../../model/AlbumInterface';

export default defineComponent({
  name: 'AlbumListItem',
  props: {
    album: {
      type: Object as () => AlbumInterface,
      required: true
    },
    displayMetadata: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AlbumCover
  },
  methods: {
    async showAlbum(): Promise<void> {
      this.$router.push('/album/' + this.album.getId());
    },
  },
})
</script>

<style scoped>
div.album {
  color: rgb(141, 102, 31);
  display: inline-flex;
  width: 260px;
  height: 260px;
  margin: 6px;
  padding: 10px;
  background-color: #11171d;
  border-radius: 5%;
  border: 1px #24303d solid;
}

div.album:hover {
  background-color: #29313a;
  cursor: pointer;
}

div.album_inner {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
