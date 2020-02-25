<template>
  <v-container>
    <v-row class="ml-1 mt-8 mb-10">
      <h1 class="display-1">Stream Management</h1>
      <v-spacer></v-spacer>
      <v-btn text small @click="refresh()">Refresh</v-btn>
    </v-row>
    <v-data-table :items="streams" :headers="streamHeaders" class="elevation-1">
      <template v-slot:item="props">
        <tr>
          <td @click="onStreamClick(props.item)">{{ props.item.streamCode }}</td>
          <td @click="onStreamClick(props.item)">{{ props.item.streamTitle }}</td>
          <td @click="onStreamClick(props.item)">{{ props.item.ownerName }}</td>
          <td @click="onStreamClick(props.item)">{{ props.item.description }}</td>
          <td @click="onStreamClick(props.item)">{{ props.item.streamFrom }}</td>
          <td @click="onStreamClick(props.item)" :class="props.item.isActive ? 'red--text' : 'blue--text'">
            {{ props.item.isActive ? "LIVE" : "ENDED" }}
          </td>
          <td>
            <v-btn
              outlined
              v-if="props.item.isActive"
              class="red white--text"
              id="stopStreamBtn"
              @click="stopStream(props.item.streamCode, props.item.owner)"
            >
              <v-icon left>mdi-record</v-icon>Stop Stream
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="editStreamModal" max-width="600px">
      <v-card>
        <v-card-title>Edit a stream</v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="streamTitle"></v-text-field>
          <v-text-field
            label="Description"
            v-model="description"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onCancel()">Cancel</v-btn>
          <v-btn text class="font-weight-bold" @click="onStreamSave()"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import backend from "../Service";
import io from "socket.io-client";
import { URL } from "../../config";
export default {
  data: () => ({
    //socket: io(`https://${URL}`),
   socket2: io(`${URL}:3000`),
    streamCode: "",
    streamTitle: "",
    description: "",
    editStreamModal: false,
    streamHeaders: [
      { text: "Stream Code", value: "streamCode" },
      { text: "Title", value: "streamTitle" },
      { text: "Author", value: "streamAuthor" },
      { text: "Description", value: "description" },
      { text: "From", value: "from" },
      { text: "Status", value: "status" },
      { text: "Stop Stream", value: "Stop Stream" }
    ],
    streams: [],
    user: {}
  }),
  methods: {
    // On Stream Click
    onStreamClick(stream) {
      this.streamTitle = stream.streamTitle;
      this.description = stream.description;
      this.streamCode = stream.streamCode;

      this.editStreamModal = true;
    },
    onCancel() {
      this.editStreamModal = false;
    },
    // On Stream Save
    async onStreamSave() {
      const result = await backend.editStream(
        this.streamCode,
        this.streamTitle,
        this.description
      );
      if (result.errCode) {
        alert(result.message);
      } else {
        this.streamTitle = this.description = this.streamCode = "";
        this.getAllStreams();
        this.editStreamModal = false;
      }
    },
    async getAllStreams() {
      const streams = await backend.getCurrentlyStreaming(6, null);

      this.streams = streams.data;
      console.log(this.streams);
    },
    async stopStream(streamCode, email) {
      this.editStreamModal = false;
      //this.socket.emit("stop", email);
      console.log(email);
      await backend.stopStream("admin", streamCode);
      this.socket2.emit("streamStop", streamCode);
      this.getAllStreams();
    },
    getUser() {
      this.user = this.$store.getters.user;
    },
    async refresh(){
      this.getAllStreams()
    }
  },
  created() {
    this.getAllStreams();
    this.getUser();
  }
};
</script>

<style></style>
