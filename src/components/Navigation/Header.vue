<template>
    <div class="grid-user" v-if="isLoggedIn()">
        <div>
        </div>
        <div class="gridItem">
            <router-link to="/usersettings">
                <font-awesome-icon :icon="['fas', 'user']" :title="$t('user_settings.title')" />
            </router-link>
        </div>
        <div class="gridItem">
            <a v-on:click="logout()">
                <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" :title="$t('user.logout')" />
            </a>
        </div>
    </div>
    <div class="grid" v-if="!isLoggedIn()">
        <div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HttpRequest from '../Lib/HttpRequest';

export default defineComponent({
  name: 'Header',
  emits: ['hidePlayer'],
  methods: {
    async logout(): Promise<void> {
      this.$emit('hidePlayer');

      HttpRequest.post(
        'common/logout',
      ).then(() => {
        this.$store.dispatch('authStorage/logout');
        this.$store.dispatch('favorites/reset');

        this.$router.push('/login')
      });
    },
    isAdmin(): boolean {
      return this.$store.getters['authStorage/isAdmin'] == true;
    },
    isLoggedIn(): boolean {
      console.log(this.$store.getters['authStorage/isLogged'])
      return this.$store.getters['authStorage/isLogged'] == true;
    }
  },
})
</script>

<style scoped>
div.grid-user {
    display: grid;
    grid-template-columns: auto 100px 60px;
    width: 100%;
    height: 100%;
}
div.grid {
    display: grid;
    grid-template-columns: auto;
    width: 100%;
    height: 100%;
}
div.gridItem {
    font-size: 140%;
    vertical-align: middle;
    height: 100%;
    line-height: 60px;
}
</style>
