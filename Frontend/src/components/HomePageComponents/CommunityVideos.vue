<template>
  <div>
    <v-row class="mt-8">
      <h1 class="title">
        <span class="font-weight-regular">Videos from the</span>
        community
      </h1>
      <v-spacer></v-spacer>
      <v-btn text small>Show more</v-btn>
    </v-row>
    <v-row>
      <v-col v-for="video in videos" :key="video.id" :lg="4" :md="6" :xs="12">
        <v-card dark :to="`/stream/${video.title}`">
          <v-img :src="video.img_url" class="white--text align-end" height="210px">
            <v-card-title v-text="video.title"></v-card-title>
            <v-card-subtitle v-text="video.author"></v-card-subtitle>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    videos: Object
  }
};
</script>

<style>
</style>