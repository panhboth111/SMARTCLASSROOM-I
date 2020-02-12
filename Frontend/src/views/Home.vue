<template>
  <div class="px-8 pb-8">
    <OngoingStreams :streams="this.streams" />

    <!-- <PreviousVideos :videos="this.videos" />

    <CommunityVideos :videos="this.videos" />-->
  </div>
</template>

<script>
import backend from "../Service";
import io from "socket.io-client";
import OngoingStreams from "../components/HomePageComponents/OngoingStreams";
import {URL} from '../../config'
// I disabled these because it is not implemented as of right now

// import PreviousVideos from "../components/HomePageComponents/PreviousVideos";
// import CommunityVideos from "../components/HomePageComponents/CommunityVideos";

export default {
  props: {
    user: Object
  },
  components: {
    OngoingStreams
    // PreviousVideos,
    // CommunityVideos
  },
  data: () => {
    return {
      socket: io(`http://${URL}:3001`),
      streams: []
      // videos: [
      //   {
      //     id: 1,
      //     title: "Introduction to Design Patterns",
      //     author: "Vignesh Manoharan",
      //     img_url:
      //       "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      //   },
      //   {
      //     id: 2,
      //     title: "Introduction to Design Patterns",
      //     author: "Vignesh Manoharan",
      //     img_url:
      //       "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      //   },
      //   {
      //     id: 3,
      //     title: "Introduction to Design Patterns",
      //     author: "Vignesh Manoharan",
      //     img_url:
      //       "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      //   }
      // ]
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
    }
  },
  created() {
    this.getcurrentlyStreaming(6);
  }
};
</script>

<style>
</style>