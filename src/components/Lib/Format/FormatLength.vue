<template>
  {{ formatLength() }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import formatDurationLength from "./FormatDurationLength";

export default defineComponent({
  name: 'FormatLength',
  props: {
    length: {
      type: Number,
      required: true
    }
  },
  methods: {
    formatLength(): string {
      return formatDurationLength(this.length);
    },
  }
})
</script>

<style scoped>

</style>
