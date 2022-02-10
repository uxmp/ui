<template>
  <div class="container">
    <div class="controls">
      <div class="icon">
        <font-awesome-icon :icon="['fas', 'volume-off']" class="volume_icon volume_low" :title="$t('player_control.lower_volume')" />
      </div>
      <div class="volume_icon">
        <input type="range" class="amplitude-volume-slider"/>
      </div>
      <div class="icon">
        <font-awesome-icon :icon="['fas', 'volume-up']" class="volume_icon volume_high" :title="$t('player_control.raise_volume')" />
      </div>
    </div>
    <br />
    <div class="control-container">
      <div class="amplitude-prev control-button">
        <font-awesome-icon :icon="['fas', 'step-backward']" :title="$t('player_control.previous')" />
      </div>
      <div class="control-button" v-on:click="toggleState()" v-if="playerState == true" :title="$t('player_control.pause')">
        <font-awesome-icon :icon="['fas', 'pause']" />
      </div>
      <div class="control-button control-button-paused" v-on:click="toggleState()" v-else :title="$t('player_control.play')">
        <font-awesome-icon :icon="['fas', 'play']" />
      </div>
      <div class="amplitude-next control-button">
        <font-awesome-icon :icon="['fas', 'step-forward']" :title="$t('player_control.next')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import Player from '../Lib/Player'

export default defineComponent({
  name: 'PlayerControl',
  setup() {
    const player = inject('ply') as Player;
    return {
      player,
    };
  },
  props: {
    playerState: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleState(): void {
      this.player.togglePlayerState(!this.playerState);
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
  