<template>
  <v-app>
    <Navbar v-if="$route.name !== 'login' && $route.name !== 'device-login'" />
    <v-content>
      <router-view :user="user"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/NavbarComponents/Navbar";
// import backend from "./Service";
import auth from "./auth";
import synclog from "./synclog";
import { mapState } from "vuex";

export default {
  name: "App",
  methods: {
    async getUser() {
      const user = await backend.getUserInfo();
      this.$state.commit("getUser", user.data);
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

  data: () => ({}),
  computed: {
    ...mapState(["user"])
  },
  created() {
    this.redirectUnauthorized();
    this.getUser();
    auth();
    synclog;
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
