<template>
  <v-container class="px-12">
    <v-form ref="form" @submit.prevent="register()">
      <v-text-field label="Username" v-model="register_username" color="black"></v-text-field>
      <v-text-field label="Email" v-model="register_email" color="black"></v-text-field>
      <v-text-field
        label="Password"
        v-model="register_password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        color="black"
      ></v-text-field>

      <v-checkbox
        color="black"
        v-model="register_checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="I agree with the Terms and Conditions."
        required
        class="mb-5 mt-6"
      ></v-checkbox>

      <v-btn color="black" dark block height="50" @click="register()">Register</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import backend from "../../Service";

export default {
  data() {
    return {
      register_checkbox: false,
      register_username: "",
      register_email: "",
      register_password: "",
      showPassword: false
    };
  },
  methods: {
    async login() {
      const message = await backend.login(this.username, this.password);
      alert(message.message);
    },
    async register() {
      const user = await backend.signUp(
        this.register_email,
        this.register_password,
        this.register_username
      );
      const { message, errCode } = user.data;
      if (errCode) {
        alert(message);
      } else {
        this.username = this.register_email;
        this.password = this.register_password;
        this.login();
      }
    }
  }
};
</script>

<style>
</style>