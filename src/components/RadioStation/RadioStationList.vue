<template>
  <h1>/ Radio stations</h1>
  <div class="create">
    <router-link :to="'/radiostation/edit'">+ Create</router-link>
  </div>
  <template v-if="radioStations !== null">
    <div class="songTable">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Url</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="station in radioStations" :key="station.getId()">
            <td>
              <font-awesome-icon class="playButton button" :icon="['fas', 'play']" v-on:click="play(station)" title="Play radio station" />
            </td>
            <td>
              {{ station.getName() }}
            </td>
            <td>
              {{ station.getUrl() }}
            </td>
            <td>
              <router-link :to="'/radiostation/edit/' + station.getId()">
                <font-awesome-icon class="editButton button" :icon="['fas', 'tools']" title="Edit station" />
              </router-link>
              <font-awesome-icon class="deleteButton button" :icon="['fas', 'minus-circle']" v-on:click="deleteStation(station)" title="Delete station" />
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
    async deleteStation(deleteStation: RadioStationInterface): Promise<void> {
      HttpRequest.delete(`radiostation/` + deleteStation.getId()).then(() => {
        this.radioStations = this.radioStations.filter(station => station.getId() !== deleteStation.getId() )
      });
    },
  }
})
</script>

<style scoped>
div.create {
  text-align: left;
}

.playButton:hover {
  color: rgb(85, 57, 5);
}

.deleteButton:hover {
  color: rgb(107, 0, 0);
}

.editButton {
  margin-right: 20px;
  color: #ffffff;
}

.editButton:hover {
  color: rgb(85, 57, 5);
}
</style>