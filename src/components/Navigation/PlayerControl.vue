<template>
  <div class="container">
    <div class="controls">
      <div class="icon">
        <svg class="volume_icon volume_low" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polygon fill="none" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
      </div>
      <div class="volume_icon">
        <input type="range" class="amplitude-volume-slider"/>
      </div>
      <div class="icon">
        <svg class="volume_icon volume_high" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polygon fill="none" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
      </div>
    </div>
    <br />
    <div class="control-container">
      <div class="amplitude-prev"></div>
      <div class="amplitude-play-pause"></div>
      <div class="amplitude-next"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlayerControl',
})
</script>

<style scoped>
div.container {
  width: 100%;
}

div.controls div {
  display: inline-flex;
  text-align: center;
}

div.controls div.icon {
  width: 40px;
}

svg.volume_high {
  margin-left: 20px;
}
svg.volume_low {
  margin-left: 10px;
}

svg.volume_icon {
  width: 20px;
  height: 20px;
}

svg.volume_icon polygon,
svg.volume_icon path {
  stroke: #ffffff;
}
</style>
  