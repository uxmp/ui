<template>
  <div>
    <h1>Login</h1>
    <div class="loginBox">
      <div class="errorMessage">
        {{ msg }}
      </div>
      <div>
        <form @submit="login()" v-on:keyup.enter="login()">
          <div>
            <input type="text" class="textInput" placeholder="Username" v-model="username" required />
          </div>
          <div>
            <input type="password" class="textInput" placeholder="Password" v-model="password" required />
          </div>
          <div>
            <input type="button" class="button" @click="login()" value="Login" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { AxiosResponse } from 'axios';
import HttpRequest from '../Lib/HttpRequest';

export default {
  data() {
    return {
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
          this.msg = data.msg;
        } else {
          const token = data.token;
          const user = data.user;

          this.$store.dispatch('authStorage/login', { token, user });

          HttpRequest.get(
            'user/favorite'
          ).then((response: AxiosResponse) => {
            const favorites = response.data;

            this.$store.dispatch('favorites/init', { favorites });
          });

          this.$router.push('/');
        }
      });
    }
  }
};
</script>
<style scoped>
div.errorMessage {
  color: rgb(206, 7, 17);

}

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
