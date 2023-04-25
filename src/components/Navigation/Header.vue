<template>
    <div class="grid-user" v-if="isLoggedIn()">
        <div class="gridItem logo">
            <router-link to="/">UXMP</router-link>
        </div>
        <div class="gridItem search">
            <Search />
        </div>
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
        <div class="gridItem logo">
            UXMP
        </div>
        <div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HttpRequest from '../Lib/HttpRequest';
import Search from "./Search.vue";
import SongListView from "../Lib/SongListView.vue";

export default defineComponent({
  name: 'Header',
  components: {SongListView, Search},
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
      return this.$store.getters['authStorage/isLogged'] == true;
    }
  },
})
</script>

<style scoped>
div.grid-user {
    display: grid;
    grid-template-columns: 250px 400px auto 100px 60px;
    width: 100%;
    height: 100%;
}
div.grid {
    display: grid;
    grid-template-columns: 100px auto;
    width: 100%;
    height: 100%;
}
div.gridItem {
    font-size: 140%;
    vertical-align: middle;
    height: 100%;
    line-height: 60px;
}
div.search {
    font-size: 110%;
    vertical-align: middle;
    line-height: 60px;
    text-align: left;
    padding-left: 10px;
}
div.search input {
    margin: 0 0 0 10px;
    border: 0;
    width: 300px
}
div.logo {
    font-style: italic;
    font-weight: bold;
    color: rgb(192, 140, 44);
    text-decoration: none;
    font-size: 160%;
    text-align: left;
    margin-left: 30px;
}
</style>
