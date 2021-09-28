<template>
  <div class="container">
    <div class="controls">
      <div class="icon">
        <font-awesome-icon :icon="['fas', 'volume-off']" class="volume_icon volume_low" />
      </div>
      <div class="volume_icon">
        <input type="range" class="amplitude-volume-slider"/>
      </div>
      <div class="icon">
        <font-awesome-icon :icon="['fas', 'volume-up']" class="volume_icon volume_high" />
      </div>
    </div>
    <br />
    <div class="control-container">
      <div class="amplitude-prev control-button">
        <font-awesome-icon :icon="['fas', 'step-backward']" />
      </div>
      <div class="control-button" v-on:click="toggleState()" v-if="playing == true">
        <font-awesome-icon :icon="['fas', 'pause']" />
      </div>
      <div class="control-button control-button-paused" v-on:click="toggleState()" v-else>
        <font-awesome-icon :icon="['fas', 'play']" />
      </div>
      <div class="amplitude-next control-button">
        <font-awesome-icon :icon="['fas', 'step-forward']" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Player from '../Lib/Player'

export default defineComponent({
  name: 'PlayerControl',
  data() {
    return {
      playing: true
    }
  },
  methods: {
    toggleState() {
      Player.togglePlayerState(!this.playing);

      this.playing = !this.playing;
    }
  }
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

div.control-button {
  display: inline-block;
  color: rgb(85, 57, 5);
  height: 50px;
  width: 50px;
  font-size: 150%;
}

div.control-button-paused {
  animation: blinker 3s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 20%;
  }
}

div.control-button:hover {
  color: rgb(175, 118, 12);
}
</style>
  