<template>
  <h1>/ {{ $t('user_settings.title') }}</h1>
  <template v-if="userSettings !== null">
    <div class="box">
      <form @submit="save()" v-on:keyup.enter="save()">
        <table>
          <tr>
            <th>{{ $t('user_settings.table.settings_title') }}</th>
            <th>{{ $t('user_settings.table.value_title') }}</th>
          </tr>
          <tr>
            <td>
              {{ $t('user_settings.language') }}
            </td>
            <td>
              <select v-model="selectedLanguage">
                <option v-for="option in languageOptions" :value="option.value" v-bind:key="option.value">
                  {{ $t(option.text) }}
                </option>
                {{ userSettings.getLanguage() }}
              </select>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="savebutton_row">
              <input type="button" class="button" @click="save()" :value="$t('user_settings.save')" />
            </td>
          </tr>
        </table>
      </form>
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
import UserSettingsInterface from '../../model/UserSettingsInterface'
import UserSettings from '../../model/UserSettings'
import LoadingIcon from '../Lib/LoadingIcon.vue'
import { AxiosResponse } from 'axios';

export default defineComponent({
  name: 'UserSettings',
  data() {
    return { 
      userSettings: null as null|UserSettingsInterface,
      languageOptions: [
        { text: 'country_iso2.en', value: 'en' },
        { text: 'country_iso2.de', value: 'de' },
      ],
    }
  },
  components: {
    LoadingIcon
  },
  computed: {
   selectedLanguage: {
      set: function(val: string): void {
        this.userSettings.setLanguage(val)
      },
      get: function(): string {
        return this.userSettings.getLanguage()
      }
    },
  },
  async created(): Promise<void> {
    this.getUserSettings()
  },
  methods: {
    async getUserSettings(): Promise<void> {
      HttpRequest.get(`usersettings`).then(res => {
        this.userSettings = plainToInstance(UserSettings, res.data)
      });
    },
    async save(): Promise<void> {
      let language = this.userSettings.getLanguage();

      this.$i18n.locale = language

      this.$store.dispatch('authStorage/setLanguage', {
        language
      });

      HttpRequest.put(
        'usersettings',
        {
          language: this.userSettings.getLanguage(),
        }
      ).then((response: AxiosResponse): void => {
        this.$notify({
          text: this.$t("user_settings.saved"),
          group: "app"
        });
      })
      .catch(() => {
        this.$notify({
          text: this.$t("user_settings.error_message"),
          type: "error",
          group: "error"
        });
      });
    }
  }
})
</script>

<style scoped>
div.box {
  width: 500px;
  margin: auto;
  padding: 5px;
}

div.box form div {
  display: block;
  margin: auto;
  width: 100%;
}

.savebutton_row {
  text-align: center;
}
</style>
