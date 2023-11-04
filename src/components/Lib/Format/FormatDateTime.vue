<template>
  <template v-if="date === undefined">
    -
  </template>
  <template v-else>
    {{ date.toLocaleDateString(this.$i18n.locale) }} {{ date.toLocaleTimeString(this.$i18n.locale) }}
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormatDateTime',
  props: {
    date: {
      type: Date,
    }
  },
})
</script>

<style scoped>

</style>
