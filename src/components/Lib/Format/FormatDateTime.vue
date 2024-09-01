<template>
  <template v-if="date === undefined">
    -
  </template>
  <template v-else>
    {{ $d(date, 'datetime') }}
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
