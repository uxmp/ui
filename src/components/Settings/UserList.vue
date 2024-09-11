<template>
  <h1>/ {{ $t('settings.user.title') }}</h1>
  <div class="create">
    <router-link :to="'/settings/user/edit'">+ {{ $t('settings.user.create') }}</router-link>
  </div>
  <template v-if="userlist !== null">
    <div>
      <table>
        <thead>
          <tr>
            <th>{{ $t('settings.user.table.columns.name') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userlist" :key="user.getId()">
            <td>
              <router-link :to="'/settings/user/edit/' + user.getId()">{{ user.getName() }}</router-link>
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
import { defineComponent} from 'vue'
import LoadingIcon from '../Lib/LoadingIcon.vue'
import HttpRequest from '../Lib/HttpRequest';
import { plainToInstance } from 'class-transformer';
import UserListItem from '../../model/UserListItem';
import UserListItemInterface from '../../model/UserListItemInterface';

export default defineComponent({
  name: 'UserList',
  data() {
    return { 
      userlist: null as null|Array<UserListItemInterface>
    }
  },
  components: {
    LoadingIcon
  },
  async created(): Promise<void> {
    await this.getUsers()
  },
  methods: {
    async getUsers(): Promise<void> {
      HttpRequest.get(`/settings/user`).then(res => {
        this.userlist = res.data.items.map((user_data: object): UserListItemInterface => {
          return plainToInstance(UserListItem, user_data);
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
</style>
