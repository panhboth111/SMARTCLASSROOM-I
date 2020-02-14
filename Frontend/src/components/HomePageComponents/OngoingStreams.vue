<template>
  <div>
    <v-row class="mt-8 mb-3">
      <h1 class="title">
        <span class="font-weight-regular">Ongoing</span>
        streams
      </h1>
      <v-spacer></v-spacer>
      <!-- Not used as of right now -->
      <!-- <v-btn text small>Show more</v-btn> -->
    </v-row>
    <v-row>
      <v-col v-for="stream in streams" :key="stream.id" :lg="4" :md="6" :xs="12">
        <v-card
          dark
          :to="`/stream/${stream.id}`"
          :id="`${stream.id}`"
          :ref="`${stream.title}`"
          @click="myClickEvent"
        >
          <v-img :src="stream.img_url" class="white--text align-end" height="240px">
            <v-card-title v-text="stream.title"></v-card-title>
            <v-card-subtitle v-text="stream.author"></v-card-subtitle>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    streams: Object
  }
};
</script>

<style>
</style>