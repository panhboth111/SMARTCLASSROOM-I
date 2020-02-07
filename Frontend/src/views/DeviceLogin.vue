<template>
  <form action>
    <input type="text" v-model="username" id="username" key="username" />
    <br />
    <input type="password" v-model="password" id="password" key="password" />
    <br />
    <v-btn id="submitButton" color="black" dark block height="50" @click="login()">Login</v-btn>
  </form>
</template>

<script>
import backend from '../Service'
export default {
  name: "DeviceLogin",
  data: () => {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const message = await backend.deviceLogin(this.username, this.password);
      alert(message.message);
    }
  }
};
</script>

<style>
</style>