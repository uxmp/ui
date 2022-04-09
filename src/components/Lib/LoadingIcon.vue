<template>
  <template v-if="state === 1">
    <div class="spinner" :style="{ width: size + 'px', height: size + 'px', margin: margin + 'px auto' }"></div>
  </template>
  <template v-if="state === 2">
    <div class="failed">
      <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
    </div>
  </template>
  <template v-if="state === 3">
    <div class="success">
      <font-awesome-icon :icon="['fas', 'circle-check']" />
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoadingState from './LoadingState'

export default defineComponent({
  name: 'LoadingIcon',
  props: {
    size: {
      type: Number,
      default: 40
    },
    margin: {
      type: Number,
      default: 100
    },
    state: {
      type: Number,
      default: LoadingState.LOADING
    }
  }
})
</script>

<style scoped>
div.failed {
  color: red;
  margin: 5px auto;
  text-align: center;;
}

div.success {
  color: green;
  margin: 5px auto;
  text-align: center;;
}

.spinner {
  background-color: rgb(255, 255, 255);

  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes sk-rotateplane {
  0% { 
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg) 
  } 50% { 
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg) 
  } 100% { 
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>
