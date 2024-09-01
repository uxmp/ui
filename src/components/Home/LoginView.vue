<template>
  <div>
    <h1>/ {{ $t("login.title") }}</h1>
    <div class="loginBox">
      <div>
        <form @submit="login()" v-on:keyup.enter="login()">
          <div>
            <input type="text" class="textInput" :placeholder="$t('login.username_placeholder')" v-model="username" required />
          </div>
          <div>
            <input type="password" class="textInput" :placeholder="$t('login.password_placeholder')" v-model="password" required />
          </div>
          <div>
            <input type="button" class="button" @click="login()" :value="$t('login.login_title')" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { AxiosResponse } from 'axios';
import HttpRequest from '../Lib/HttpRequest';
import { plainToInstance } from 'class-transformer';
import User from '../../model/User'
import {defineComponent} from "vue";
import {useUserStore} from "../../components/Store/UserStore";
import {useFavoriteStore} from "../..//components/Store/FavoriteStore";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const favoriteStore = useFavoriteStore();

    return {
      userStore,
      favoriteStore,
      username: '',
      password: '',
      msg: ''
    };
  },
  methods: {
    async login(): Promise<void> {
      HttpRequest.post(
        'common/login',
        {
          username: this.username,
          password: this.password
        }
      ).then((response: AxiosResponse): void => {
        let data = response.data.data;
        if (data.msg) {
          this.$notify({
            title: this.$t("user.login.error_title"),
            text: this.$t("user.login.error_text"),
            type: "error",
            group: "error"
          });
        } else {
          let user = plainToInstance(User, data.user)

          this.userStore.login(
            data.token,
            user
          );

          this.$i18n.locale = user.getLanguage()

          HttpRequest.get(
            'user/favorite'
          ).then((response: AxiosResponse) => {
            this.favoriteStore.init(response.data)
          });

          HttpRequest.get(
            'usersettings/acl'
          ).then((response: AxiosResponse) => {
            this.userStore.setAcl(response.data);
          });

          this.$router.push('/');
        }
      });
    }
  }
});
</script>
<style scoped>
div.loginBox {
  width: 500px;
  margin: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.308);
  border: 1px #446683 solid;
  padding: 5px;
}

div.loginBox form div {
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
