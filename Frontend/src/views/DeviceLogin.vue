<template>
  <form action>
    <input type="text" v-model="username" id="username" />
    <br />
    <input type="password" v-model="password" id="password" />
    <br />
    <button type="submit" id="submitButton">Submit</button>
  </form>
</template>

<script>
export default {
  name: "DeviceLogin",
  data: () => {
    return {
      username: "",
      password: ""
    };
  }
};
</script>

<style>
</style>