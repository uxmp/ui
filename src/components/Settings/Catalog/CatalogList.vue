<template>
  <h1>/ {{ $t('settings.catalogs.title') }}</h1>
  <template v-if="catalogs !== null">
    <div>
      <table>
        <thead>
          <tr>
            <th>{{ $t('settings.catalogs.table.columns.id') }}</th>
            <th>{{ $t('settings.catalogs.table.columns.path') }}</th>
            <th>{{ $t('settings.catalogs.table.columns.last_updated') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="catalog in catalogs" :key="catalog.id">
            <td>{{ catalog.id }}</td>
            <td>
              {{ catalog.path }}
            </td>
            <td>
              <FormatDateTime :date="catalog.lastUpdate" />
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
import FormatDateTime from "@/components/Lib/Format/FormatDateTime.vue";

export default defineComponent({
  name: 'CatalogList',
  data() {
    return { 
      catalogs: null as null|Array<{id: number, path: string, lastUpdate: null|Date}>
    }
  },
  components: {
    FormatDateTime,
    LoadingIcon
  },
  async created(): Promise<void> {
    await this.getCatalogs()
  },
  methods: {
    async getCatalogs(): Promise<void> {
      HttpRequest.get(`/settings/catalogs`).then(res => {
        this.catalogs = res.data.items.map((catalog: {id: number, path: string, lastUpdate: null|string}): {id: number, path: string, lastUpdate: null|Date} => {
          if (catalog.lastUpdate !== null) {
            return {
              id: catalog.id,
              path: catalog.path,
              lastUpdate: new Date(catalog.lastUpdate)
            };
          }
          return {
            id: catalog.id,
            path: catalog.path,
            lastUpdate: null
          }
        });
      });
    },
  }
})
</script>

<style scoped>
</style>
