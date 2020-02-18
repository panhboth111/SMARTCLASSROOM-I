<template>
  <v-app>
    <div id="newStreamRoom" class="stream">
      <v-card v-if="!hasLoaded" class="loading-message" flat color="#000000">
        <v-row justify="space-around">
          <v-card-title
            class="header justify-space-around white--text"
          >The stream is loading. Please wait...</v-card-title>
        </v-row>
        <v-row justify="space-around">
          <v-progress-circular indeterminate class="mb-6" color="white"></v-progress-circular>
        </v-row>
      </v-card>
    </div>

    <v-card flat>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-container>
            <v-row class="px-3">
              <v-col cols="10" class="text-left">
                <div class="headline">{{streamTitle}}</div>
                <div class="body-2 font-weight-light">{{author}}</div>
              </v-col>
              <v-col cols="2" class="d-flex justify-end align-center">
                <div class="mx-2">
                  <v-icon color="red lighten-2">mdi-eye</v-icon>
                </div>
                <div>
                  <span class="red--text text--lighten-2">34</span>
                </div>
                <div class="ml-4">
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>

          <v-divider></v-divider>

          <v-expansion-panel-header>
            <!-- <div class="link">Show Details</div> -->
            <span class="overline">Show description</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col>
                <p>{{description}}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1">
                <span class="subtitle-1">Tags:</span>
              </v-col>
              <v-col cols="11">
                <span>
                  <v-chip dark class="mr-2" v-for="tag in tags" :key="tag">
                    {{
                    tag
                    }}
                  </v-chip>
                </span>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-app>
</template>

<script>
// import StreamDetails from "../StreamComponents/StreamDetails";
import backend from "../../Service";

export default {
  name: "streambox",
  components: {
    // StreamDetails
  },
  // metaInfo: {
  // 	title: 'StreamRoom',
  // 	script: [
  // 		{ src: 'https://meet.jit.si/external_api.js', async: true, defer: true }
  // 	]
  // },
  data() {
    return {
      api : null,
      hasLoaded: true,
      streamName: this.$route.params.streamName,
      streamTitle: "",
      description: "",
      author: "",
      tags: [
        "#web-apps",
        "#design-patterns",
        "#batch6",
        "#html",
        "#batch8",
        "#batch7"
      ]
    };
  },
  async created() {
    this.getStreamDetails()
  },
  destroyed(){
    console.log("stopping.......");
    backend.stopStream();
    // this.socket.emit('stop',this.user.email)
  },
  methods: {
    async getStreamDetails() {
      const streamDetail = await backend.getStreamDetail(
        this.$route.params.streamName
      );
      console.log(streamDetail);
      if (streamDetail.data) {
        this.streamTitle = streamDetail.data.streamTitle;
        this.author = streamDetail.data.ownerName;
        this.description = streamDetail.data.description;
        this.streamOn(streamDetail.data.streamCode,this.streamTitle);
      }
    },
    async streamOn(streamCode,streamTitle){
        // eslint-disable-next-line no-unused-vars
        const {domain, options, role, name} = await backend.joinStream(streamCode,"")
        console.log(domain)
        this.api = null
        $( document ).ready(function() {
            options["parentNode"] = document.querySelector('#newStreamRoom');
            this.api = new JitsiMeetExternalAPI(domain, options);
            this.api.executeCommand('displayName', name);
            this.api.executeCommand('subject', streamTitle);
        });
    }
  }
};

</script>

<style scoped>
.stream {
  height: 600px;
  background-color: #000000;
  border: 5px solid #000000;
}
.loading-message {
  position: relative;
  top: 40%;
}

.link {
  color: #0275d8;
  text-decoration: underline;
}
</style>
