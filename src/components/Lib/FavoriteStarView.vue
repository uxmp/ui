<template>
  <div class="favIcon">
    <font-awesome-icon
      v-on:click="removeFavorite()"
      class="isFavorite"
      :icon="['fas', 'star']"
      v-if="isFavorite"
      title="Remove from favorites"
    />
    <font-awesome-icon
      v-on:click="addFavorite()"
      class="isNotFavorite"
      :icon="['far', 'star']"
      v-else title="Add as favorite"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NowPlayingView',
  props: {
    itemId: {
      type: Number,
      required: true
    },
    itemType: {
      type: String,
      required: true
    }
  },
  data() {
    return { 
      isFavorite: false
    }
  },
  watch: { 
   	itemId: function(newVal: number): void {
      this.isFavorite = newVal.toString() in this.$store.getters['favorites/getSongs'];
    }
  },
  methods: {
    addFavorite(): void {
      this.isFavorite = true;
      const songId = this.itemId;

      this.$store.dispatch('favorites/addSong', { songId });
    },
    removeFavorite(): void {
      this.isFavorite = false;
      const songId = this.itemId;

      this.$store.dispatch('favorites/removeSong', { songId });
    },
  }
})
</script>

<style scoped>
div.favIcon .isNotFavorite:hover,
div.favIcon .isFavorite {
  color: rgb(212, 212, 0);
}
div.favIcon .isNotFavorite,
div.favIcon .isFavorite:hover {
  color: white;
}
</style>
