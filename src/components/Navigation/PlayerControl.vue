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
      <div class="amplitude-prev">
        <font-awesome-icon :icon="['fas', 'step-backward']" />
      </div>
      <div class="amplitude-play" v-on:click="aggi()" v-if="playing === true">
        <font-awesome-icon :icon="['fas', 'pause']" />
      </div>
      <div class="amplitude-pause" v-on:click="aggi()" v-else>
        <font-awesome-icon :icon="['fas', 'play']" />
      </div>
      <div class="amplitude-next">
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
    aggi() {
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

.amplitude-next,
.amplitude-prev,
.amplitude-pause,
.amplitude-play,
.amplitude-play-pause {
  display: inline-block;
  color: rgb(85, 57, 5);
  height: 50px;
  width: 50px;
  font-size: 150%;
}

.amplitude-next:hover,
.amplitude-prev:hover,
.amplitude-pause:hover,
.amplitude-play:hover,
.amplitude-play-pause:hover {
  color: rgb(175, 118, 12);
}

.amplitude-paused {
  color: rgb(85, 57, 5);
}
.amplitude-playing {
  color: rgb(85, 57, 5);
}
</style>
  