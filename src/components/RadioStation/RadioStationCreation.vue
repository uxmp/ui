<template>
  <h1>Create radio station</h1>
  <div class="creationBox">
    <div class="errorMessage">
      {{ msg }}
    </div>
    <div>
      <form @submit="create()" v-on:keyup.enter="create()">
        <div>
          <input type="text" class="textInput" placeholder="Station name" v-model="name" required />
        </div>
        <div>
          <input type="text" class="textInput" placeholder="Url" v-model="url" required />
        </div>
        <div>
          <input type="button" class="button" @click="create()" value="Create station" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { defineComponent } from 'vue'
import HttpRequest from '../Lib/HttpRequest';
import LoadingIcon from '../Lib/LoadingIcon.vue'

export default defineComponent({
  name: 'RadioStationCreation',
  data() {
    return { 
      name: '',
      url: '',
      msg: ''
    }
  },
  components: {
    LoadingIcon
  },
  methods: {
    async create(): Promise<void> {
      HttpRequest.post(
        'radiostation',
        {
          name: this.name,
          url: this.url
        }
      ).then((response: AxiosResponse): void => {
        let data = response.data;
        if (data.msg) {
          this.msg = data.msg;
        } else {
          this.$router.push('/radiostations');
        }
      });
    }
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
