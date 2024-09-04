<template>
  <div class="albumInfo">
    {{ $t('shared.quantity', { quantity: albumList.length }) }}
  </div>
  <div class="albumList">
    <AlbumListItem v-for="album in albumList" :key="album.getId()" :album="album" :displayMetadata="true"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AlbumListItem from './AlbumListItem.vue'
import AlbumInterface from '@/model/AlbumInterface'

export default defineComponent({
  name: 'AlbumSelector',
  props: {
    albumList: {
      type: Array as PropType<Array<AlbumInterface>>,
      required: true,
    }
  },
  components: {
    AlbumListItem,
  }
})
</script>

<style scoped>
div.albumInfo {
  text-align: left;
}

div.albumList {
  margin-top: 10px;
  background-color: #0a0f14;
  border: 1px #446683 solid;
}
</style>
