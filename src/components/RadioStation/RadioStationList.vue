<template>
  <h1>Radio stations</h1>
  <div class="create">
    <router-link :to="'/radiostations/create'">+ Create</router-link>
  </div>
  <template v-if="radioStations !== null">
    <div class="songTable">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="station in radioStations" :key="station.getId()">
            <td>
              <font-awesome-icon class="playButton" :icon="['fas', 'play']" v-on:click="play(station)" title="Play radio station" />
            </td>
            <td>
              {{ station.getName() }}
            </td>
            <td>
              {{ station.getUrl() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <template v-else>
    <LoadingIcon />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { plainToInstance } from 'class-transformer';
import HttpRequest from '../Lib/HttpRequest';
import RadioStationInterface from '../../model/RadioStationInterface'
import RadioStation from '../../model/RadioStation'
import Player from '../Lib/Player';
import LoadingIcon from '../Lib/LoadingIcon.vue'

export default defineComponent({
  name: 'RadioStationList',
  data() {
    return { 
      radioStations: null as null|Array<RadioStationInterface>
    }
  },
  components: {
    LoadingIcon
  },
  async created(): Promise<void> {
    this.getRadioStations()
  },
  methods: {
    async play(station: RadioStationInterface): Promise<void> {
      Player.playRadiostation(station, this);
    },
    async getRadioStations(): Promise<void> {
      HttpRequest.get(`radiostations`).then(res => {
        this.radioStations = res.data.items.map((album_data: any): RadioStationInterface => {
          return plainToInstance(RadioStation, album_data);
        });
      });
    },
  }
})
</script>

<style scoped>
div.create {
  text-align: left;
}

.playButton {
  cursor: pointer;
}

.playButton:hover {
  color: rgb(85, 57, 5);
}
</style>
