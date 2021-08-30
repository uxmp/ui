<template>
  <div>
    <h1>Login</h1>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="text" placeholder="Password" v-model="password" />
    <input type="button" @click="login" value="Login" />
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>
<script>
import AuthService from './AuthService.ts';

export default {
  data() {
    return {
      username: '',
      password: '',
      msg: ''
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          username: this.username,
          password: this.password
        };
        const response = await AuthService.login(credentials);
        this.msg = response.msg;

        const token = response.data.token;
        const user = response.data.user;

        this.$store.dispatch('login', { token, user });

        this.$router.push('/');
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  }
};
</script>