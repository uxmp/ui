<template>
  <div class="favIcon">
    <font-awesome-icon
      v-on:click="removeFavorite()"
      class="isFavorite"
      :icon="['fas', 'star']"
      v-if="isFavorite"
      :title="$t('favorite_star_view.remove_favorite_title')"
    />
    <font-awesome-icon
      v-on:click="addFavorite()"
      class="isNotFavorite"
      :icon="['far', 'star']"
      v-else
      :title="$t('favorite_star_view.add_favorite_title')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {useFavoriteStore} from "@/components/Store/FavoriteStore";

export default defineComponent({
  setup() {
    const favoriteStore = useFavoriteStore();

    return {
      favoriteStore
    }
  },
  name: 'FavoriteStarView',
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
  beforeMount(): void {
    this.updateState()
  },
  watch: {
    itemId: function(): void {
      this.updateState()
    }
  },
  methods: {
    addFavorite(): void {
      this.isFavorite = true;

      this.favoriteStore.addItem(this.itemId, this.itemType);
    },
    removeFavorite(): void {
      this.isFavorite = false;

      this.favoriteStore.removeItem(this.itemId, this.itemType)
    },
    updateState(): void {
      if (this.itemId !== undefined) {
        this.isFavorite = this.favoriteStore.list.includes(this.itemType + '_' + this.itemId);
      }
    }
  }
})
</script>

<style scoped>
div.favIcon .isNotFavorite:hover,
div.favIcon .isFavorite {
  color: rgb(212, 212, 0);
  cursor: pointer;
}
div.favIcon .isNotFavorite,
div.favIcon .isFavorite:hover {
  color: white;
  cursor: pointer;
}
</style>
