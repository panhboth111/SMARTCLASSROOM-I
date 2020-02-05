<template>
  <v-card height="600" width="1000" class="mx-auto">
    <v-row align="center" no-gutters>
      <v-col cols="5">
        <v-card height="600" style="width: 100%" class="text-center">
          <v-img class="white--text align-center grey darken-4" height="600">
            <h1 class="display-2 text-uppercase">
              <span class="font-weight-light">Class</span>
              <span class="font-weight-bold">Time</span>
            </h1>
            <h2 class="subtitle-2 mt-4 mb-12">Lecture streaming service</h2>
            <h3 class="overline">A FLIP - ZEAL JOINT PROJECT</h3>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="7">
        <v-card tile height="600" style="width: 100%" class="text-center">
          <v-img class="align-center white" height="600">
            <FormTabs />
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import FormTabs from "./FormTabs";
export default {
  components: {
    FormTabs
  }
};
</script>

<style>
v-col {
  height: 400px;
}
* {
  margin: 0px;
  padding: 0px;
}
</style>
