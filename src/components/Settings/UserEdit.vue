<template>
  <h1>/ <router-link :to="'/settings/user'">{{ $t('settings.user.title') }}</router-link> / {{ $t('settings.user.edit_title') }}</h1>
  <div class="box">
    <h3>{{ $t('settings.user.header.user') }}</h3>
    <form @submit="save()" v-on:submit.prevent>
      <table>
        <thead>
          <tr>
            <th>{{ $t('settings.user.table.columns.name') }}</th>
            <td>
              <input type="text" class="textInput" :placeholder="$t('settings.user.name_placeholder')" v-model="name" required :readonly="!isNewUser()" />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isNewUser()">
            <td colspan="2" class="savebutton_row">
              <input type="button" class="savebutton" @click="save()" :value="$t('settings.user.save_title')" />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
  <div class="box" v-if="!isNewUser()">
    <form @submit="save()" v-on:submit.prevent>
    <h3>{{ $t('settings.user.header.password') }}</h3>
    <div class="creationBox" style="margin-top: 10px;">
      <input type="password" class="textInput" :placeholder="$t('settings.user.password_placeholder')" v-model="password" required />
      <input type="button" class="button" @click="setPassword()" :value="$t('settings.user.save_title')" />
    </div>
    </form>
  </div>
</template>

<script lang="ts">
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
      password: ''
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
    password: {
      set: function(val: string): void {
        this.password = val;
      },
      get: function(): string {
        return this.password;
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
    isNewUser(): boolean {
      return this.user.getId() === 0;
    },
    async save(): Promise<void> {
      if (this.user.getId() === 0 && this.name !== '') {
        this.create();
      }
    },
    async create(): Promise<void> {
      HttpRequest.post(
        '/settings/user',
        {
          name: this.user.getName()
        }
      ).then((): void => {
        this.$router.push('/settings/user');

        this.$notify({
          text: this.$t("settings.user.created_message"),
          group: "app"
        });
      })
      .catch((): void => {
        this.$notify({
          text: this.$t("settings.user.creation_error_message"),
          type: "error",
          group: "error"
        });
      });
      ;
    },
    async setPassword(): Promise<void> {
      HttpRequest.put(
        '/settings/user/password',
        {
          userId: this.user.getId(),
          password: this.password
        }
      ).then((): void => {
        this.$notify({
          text: this.$t("settings.user.password_saved_message"),
          group: "app"
        });
      })
      .catch((): void => {
        this.$notify({
          text: this.$t("settings.user.error_message"),
          type: "error",
          group: "error"
        });
      });
      ;
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

div.box {
  width: 500px;
  margin: auto;
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
.savebutton_row {
  text-align: center;
}

.savebutton {
  width: 100%;
}
</style>
