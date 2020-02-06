<template>
  <v-card flat width="600">
    <v-tabs background-color="transparent" centered color="black" class="mb-5">
      <v-tab v-for="item in items" :key="item">
        <div style="width: 100px">{{ item }}</div>
      </v-tab>

      <v-tab-item style="height: 375px">
        <LoginTab />
      </v-tab-item>

      <v-tab-item>
        <RegisterTab />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import auth from "../../auth";
import synclog from "../../synclog";
import LoginTab from "./LoginTab";
import RegisterTab from "./RegisterTab";

export default {
  components: {
    LoginTab,
    RegisterTab
  },
  data() {
    return {
      items: ["Login", "Register"]
    };
  },
  methods: {},
  created() {
    auth();
    synclog;
  }
};
</script>

<style>
</style>