<template>
  <h1>/ {{ $t('settings.catalogs.title') }}</h1>
  <template v-if="catalogs !== null">
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>{{ $t('settings.user.table.columns.name') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="catalog in catalogs" :key="catalog.id">
            <td>{{ catalog.id }}</td>
            <td>
              {{ catalog.path }}
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
import {defineComponent} from 'vue'
import LoadingIcon from '../../Lib/LoadingIcon.vue'
import HttpRequest from '../../Lib/HttpRequest';
import UserListItemInterface from '../../../model/UserListItemInterface';

export default defineComponent({
  name: 'CatalogList',
  data() {
    return { 
      catalogs: [] as Array<{id: number, path: string}>
    }
  },
  components: {
    LoadingIcon
  },
  async created(): Promise<void> {
    this.getCatalogs()
  },
  methods: {
    async getCatalogs(): Promise<void> {
      HttpRequest.get(`/settings/catalogs`).then(res => {
        this.catalogs = res.data.items.map((user_data: any): UserListItemInterface => {
          return user_data;
        });
      });
    },
  }
})
</script>

<style scoped>
</style>
