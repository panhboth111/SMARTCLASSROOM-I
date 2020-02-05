<template>
  <v-container class="px-12">
    <v-form ref="form" @submit.prevent="login()">
      <v-text-field id="usernameInput" label="E-mail" v-model="username" color="black"></v-text-field>
      <v-text-field
        id="passwordInput"
        label="Password"
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        color="black"
      ></v-text-field>

      <v-checkbox
        color="black"
        v-model="login_checkbox"
        label="Remember my password"
        required
        class="mb-5 mt-6"
      ></v-checkbox>

      <v-btn id="loginBtn" color="black" dark block height="50" @click="login()">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import backend from "../../Service";

export default {
  data() {
    return {
      login_checkbox: true,
      showPassword: false,
      password: "",
      username: ""
    };
  },
  methods: {
    async login() {
      const message = await backend.login(this.username, this.password);
      alert(message.message);
    }
  }
};
</script>

<style>
</style>