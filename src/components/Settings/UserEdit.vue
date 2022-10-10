<template>
  <h1>/ <router-link :to="'/settings/user'">{{ $t('settings.user.title') }}</router-link> / {{ $t('settings.user.edit_title') }}</h1>
  <div class="creationBox">
    <div class="errorMessage">
      {{ msg }}
    </div>
    <div>
      <form @submit="create()" v-on:keyup.enter="create()">
        <div>
          <input type="text" class="textInput" :placeholder="$t('settings.user.name_placeholder')" v-model="name" required />
        </div>
        <div>
          <input type="button" class="button" @click="save()" :value="$t('settings.user.save_title')" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { defineComponent } from 'vue'
import User from '../../model/User';
import UserInterface from '../../model/UserInterface';
import EntityLoader from '../Lib/EntityLoader';
import HttpRequest from '../Lib/HttpRequest';
import LoadingIcon from '../Lib/LoadingIcon.vue'

export default defineComponent({
  name: 'UserEdit',
  data() {
    return { 
      user: new User(),
      msg: ''
    }
  },
  components: {
    LoadingIcon
  },
  computed: {
    name: {
      set: function(val: string): void {
        this.user.setName(val.trim());
      },
      get: function(): string {
        return this.user.getName();
      }
    },
  },
  async created(): Promise<void> {
    let userId = +this.$route.params.userId;
    if (userId !== 0) {
      EntityLoader.loadUser(userId).then((user: UserInterface) => this.user = user);
    }
  },
  methods: {
    async save(): Promise<void> {
      if (this.user.getId() === 0) {
        this.create();
      } else {
        this.persist();
      }
    },
    async create(): Promise<void> {
      HttpRequest.post(
        '/settings/user',
        {
          name: this.user.getName()
        }
      ).then((response: AxiosResponse): void => {
        let data = response.data;
        if (data.msg) {
          this.msg = data.msg;
        } else {
          this.$router.push('/user/edit');
        }
      });
    },
    async persist(): Promise<void> {
      HttpRequest.put(
        '/settings/user/' + this.user.getId(),
        {
          name: this.user.getName()
        }
      ).then((response: AxiosResponse): void => {
        let data = response.data;
        if (data.msg) {
          this.msg = data.msg;
        } else {
          this.$router.push('/user/edit');
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
