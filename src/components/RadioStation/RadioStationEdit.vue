<template>
  <h1>/ <router-link :to="'/radiostations'">{{ $t('radio_stations.title') }}</router-link> / {{ $t('radio_stations_edit.edit_title') }}</h1>
  <div class="creationBox">
    <div class="errorMessage">
      {{ msg }}
    </div>
    <div>
      <form @submit="create()" v-on:keyup.enter="create()">
        <div>
          <input type="text" class="textInput" :placeholder="$t('radio_stations_edit.station_name_placeholder')" v-model="name" required />
        </div>
        <div>
          <input type="text" class="textInput" :placeholder="$t('radio_stations_edit.station_url_placeholder')" v-model="url" required />
        </div>
        <div>
          <input type="button" class="button" @click="save()" :value="$t('radio_stations_edit.save_title')" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { defineComponent } from 'vue'
import RadioStation from '../../model/RadioStation';
import RadioStationInterface from '../../model/RadioStationInterface';
import EntityLoader from '../Lib/EntityLoader';
import HttpRequest from '../Lib/HttpRequest';

export default defineComponent({
  name: 'RadioStationEdit',
  data() {
    return { 
      radioStation: new RadioStation() as RadioStationInterface,
      msg: ''
    }
  },
  computed: {
    name: {
      set: function(val: string): void {
        this.radioStation.setName(val.trim());
      },
      get: function(): string {
        return this.radioStation.getName();
      }
    },
    url: {
      set: function(val: string): void {
        this.radioStation.setUrl(val.trim());
      },
      get: function(): string {
        return this.radioStation.getUrl();
      }
    },
  },
  async created(): Promise<void> {
    let stationId = +this.$route.params.stationId;
    if (stationId !== 0) {
      EntityLoader.loadRadioStation(stationId).then((station: RadioStationInterface) => this.radioStation = station);
    }
  },
  methods: {
    async save(): Promise<void> {
      if (this.radioStation.getId() === 0) {
        await this.create();
      } else {
        await this.persist();
      }
    },
    async create(): Promise<void> {
      HttpRequest.post(
        'radiostation',
        {
          name: this.radioStation.getName(),
          url: this.radioStation.getUrl(),
        }
      ).then((response: AxiosResponse): void => {
        let data = response.data;
        if (data.msg) {
          this.msg = data.msg;
        } else {
          this.$router.push('/radiostations');
        }
      });
    },
    async persist(): Promise<void> {
      HttpRequest.put(
        '/radiostation/' + this.radioStation.getId(),
        {
          name: this.radioStation.getName(),
          url: this.radioStation.getUrl(),
        }
      ).then((response: AxiosResponse): void => {
        let data = response.data;
        if (data.msg) {
          this.msg = data.msg;
        } else {
          this.$router.push('/radiostations');
        }
      });
    },
  }
})
</script>

<style scoped>
div.creationBox {
  width: 500px;
  margin: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.308);
  border: 1px #446683 solid;
  padding: 5px;
}

div.creationBox form div {
  display: block;
  margin: auto;
  width: 100%;
}

input[type=text], input[type=password] {
  width: 80%;
}

input[type=button] {
  width: 80%;
}
</style>
