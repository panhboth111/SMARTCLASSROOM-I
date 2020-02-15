<template>
  <v-app>
    <Navbar v-if="$route.name !== 'login' && $route.name !== 'device-login'" :user="user" />
    <v-content>
      <router-view :user="user"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/NavbarComponents/Navbar";
// import backend from "./Service";
// import auth from "./auth";
// import synclog from "./synclog";

export default {
  name: "App",
  methods: {
    async getUser() {
      const user = await backend.getUserInfo();
      this.user.name = user.data.name;
      this.user.role = user.data.role;
      this.user.isStreaming = user.data.isStreaming;
      this.user.currentStream = user.data.currentStream;
      this.user.email = user.data.email;
    },
    async redirectUnauthorized() {
      if (
        window.location.pathname === "/devices" &&
        (this.user.role !== "Admin" || this.user.role !== "Lecturer")
      )
        window.location.replace("/");
    }
  },
  components: {
    Navbar
  },

  data: () => ({
    user: {
      name: "",
      role: "",
      isStreaming: false
    }
  }),

  created() {
    this.redirectUnauthorized();
    this.getUser();
    // auth();
    // synclog;
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
