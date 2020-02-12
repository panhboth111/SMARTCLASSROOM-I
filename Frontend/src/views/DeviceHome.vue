<template>
  <div>
    <div v-for="stream in streams" :key="stream.id">
      <router-link :to="`/stream/${stream.id}`" :id="stream.title" :ref="stream.title"></router-link>
    </div>
  </div>
</template>

<script>
import backend from "../Service";
import io from "socket.io-client";

export default {
  name: "device-home",
  data: () => {
    return {
      socket: io("http://10.10.17.15:3001"),
      streams: []
    };
  },
  methods: {
    async getcurrentlyStreaming(limit) {
      const streams = await backend.getCurrentlyStreaming(limit);
      console.log(streams.data);
      if (streams.data) {
        streams.data.forEach(stream => {
          this.streams.push({
            id: stream.streamCode,
            title: stream.streamTitle,
            description: stream.description,
            isPrivate: true,
            author: stream.ownerName,
            date: stream.date,
            img_url: "http://kit8.net/images/detailed/4/data_centre.png"
          });
        });
      }
    },
    
  },
  created() {
    this.getcurrentlyStreaming(6);
  }
};
</script>

<style>
</style>