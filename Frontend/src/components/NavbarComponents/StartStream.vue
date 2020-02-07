<template>
  <div>
    <v-dialog v-model="create_stream" max-width="670px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" outlined id="startStreamBtn">
          <v-icon left>mdi-record</v-icon>Go Live
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="title font-weight-regular">Create stream</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <!-- <v-text-field
              id="streamTitleInput"
              label="Title"
              color="black"
              required
              v-model="streamTitle"
            ></v-text-field> -->
            <v-text-field
              id="title"
              label="Title"
              color="black"
              required
              v-model="streamTitle"
            ></v-text-field>
            <v-text-field
              id="owner"
              label="owner"
              color="black"
              v-if="user.role === 'Device'"
              v-model="streamBy"
            ></v-text-field>
            <v-text-field
              id="descriptionInput"
              label="Description"
              color="black"
              v-model="description"
              required
            ></v-text-field>

            <v-switch
              v-if="user.role !== 'Student'"
              class="pa-0"
              dense
              color="grey darken-2"
              v-model="is_from_webcam"
              label="From your webcam"
            ></v-switch>
            <v-switch
              v-if="is_from_webcam"
              id="isPrivateToggle"
              class="pa-0 mt-5"
              dense
              color="grey darken-2"
              v-model="is_private"
              label="Private stream"
            ></v-switch>
            <v-text-field label="Password" color="black" required v-if="is_private"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="create_stream = false">Cancel</v-btn>
          <v-btn
            text
            v-on="on"
            class="font-weight-black"
            @click="user.role === 'Student' || user.role === 'Device' || is_from_webcam ? startStream() : select_class = true"
            id="startBtn"
            :disabled="streamTitle === ''"
          >Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="select_class" max-width="780px">
      <v-card>
        <v-card-title>
          <span class="title font-weight-regular">Setup</span>
        </v-card-title>
        <v-card-text>
          <p class="my-2">Where are you streaming from?</p>
          <v-select
            :items="devices.map(x => x['deviceName'])"
            v-model="selectedDevice"
            :menu-props="{ maxHeight: '200' }"
            label="Select a class"
            solo
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="select_class = false">Cancel</v-btn>

          <v-dialog v-model="select_classes" max-width="800px">
            <template v-slot:activator="{ on }">
              <v-btn
                text
                v-on="on"
                class="font-weight-black"
                id="startStreamBtn"
                :disabled="selectedDevice === ''"
              >Continue</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="title font-weight-regular">Setup</span>
              </v-card-title>
              <v-card-text>
                <p class="my-2">Would you like to cast the stream to other rooms?</p>
                <div class="checkboxes_overflow">
                  <v-checkbox
                    v-for="device in devices"
                    :key="device.deviceId"
                    class="mb-0 pb-0"
                    color="black"
                    v-model="device.value"
                    :label="device.deviceName"
                    :disabled="device.deviceName === selectedDevice"
                  ></v-checkbox>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black darken-1" text @click="select_classes = false">Cancel</v-btn>
                <v-btn
                  id="startBtn"
                  color="black darken-1"
                  class="font-weight-black"
                  text
                  @click="deviceStartStream()"
                >Continue</v-btn>
                <v-overlay :value="loading">
                  <v-progress-circular indeterminate size="100"></v-progress-circular>
                </v-overlay>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import backend from "../../Service";
//import axios from "axios";
import io from "socket.io-client";

export default {
  data: () => ({
    loading: false,
    devices: [],
    socket: io("http://10.10.15.11:3001"),
    selectedDevice: "",
    tag_list: [],
    create_stream: false,
    tags: [
      "#web-apps",
      "#design-patterns",
      "#batch6",
      "#html",
      "#batch8",
      "#batch7"
    ],
    value: false,
    select_class: false,
    select_classes: false,
    classes_cast: [
      { name: "KIT Campus I - Classroom 1", value: false },
      { name: "KIT Campus I - Classroom 2", value: false },
      { name: "KIT Campus I - Classroom 3", value: false },
      { name: "KIT Campus II - Classroom 1", value: false },
      { name: "KIT Campus II - Classroom 2", value: false },
      { name: "KIT Campus II - Classroom 3", value: false }
    ],
    is_conference: false,
    is_private: false,
    streamTitle: "",
    description: "",
    password: "",
    is_from_webcam: false,
    deviceNames: [],
    streamingUser: "",
    streamBy: "",
    userCurrentStream: ""
  }),
  props: {
    user: Object
  },
  methods: {
    async startStream() {
      console.log("startstream")
      const stream = await backend.startStream(
        this.streamTitle,
        this.description,
        this.is_private,
        this.password,
        this.streamBy,
        this.user.role,
        true
      );
      console.log("backk")
      this.user.isStreaming = stream.data.isStreaming;
      // axios.post("http://10.10.15.11:5000/devices/startStreaming", {
      //   streamTitle: this.streamTitle,S
      //   description: this.description,
      //   isPrivate: this.is_private,
      //   deviceId: this.selectedDevice
      // });
      // axios.post("http://10.10.15.11:5000/devices/startProjecting", {
      //   deviceIds: [],
      //   streamBoxId: "meet"
      // });
      this.start_stream = false;
      this.userCurrentStream = stream.data.streamCode;
      location.reload()
      window.location.replace(`/stream/${this.userCurrentStream}`);
    },
    getAvailableDevices() {
      this.socket.on("info", device_info => {
        this.devices = device_info.filter(device => device.online && !device.streaming && device.cameraPlugged)
        console.log(this.devices)
      });
    },
    async deviceStartStream() {
      console.log("device start")
      this.loading = true;
      const deviceIds = [];
      const selectedClasses = this.devices.filter(x => x["value"] == true);
      selectedClasses.forEach(x => deviceIds.push(x.deviceId));
      // axios.post("http://10.10.15.11:3001/devices/startStreaming", {
      //   deviceIds: deviceIds,
      //   deviceId:
      //     this.devices.filter(x => x["deviceName"] === this.selectedDevice)[0][
      //       "deviceId"
      //     ] || "None",
      //   owner: this.user.name,
      //   streamTitle: this.streamTitle,
      //   description: this.description,
      //   userEmail: this.user.email
      // });
      this.socket.emit('startStreaming',{deviceIds,
        deviceId:this.devices.filter(x => x["deviceName"] === this.selectedDevice)[0]["deviceId"] || "None",
        userEmail:this.user.email,
        streamTitle:this.streamTitle,
        description:this.description
      })
      this.socket.on("redirect", async ({ streamBy, streamCode }) => {
        console.log(streamBy);
        console.log(this.user.email);
        console.log(streamCode);
        location.reload();
        if (this.user.email == streamBy) {
          window.location.replace(`/stream/${streamCode}`);
        }
      });
    }
  },
  created() {
    this.getAvailableDevices();
    this.devices.forEach(x => (x["value"] = true));
    this.streamingUser = this.user.name;
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

.checkboxes_overflow {
  max-height: 200px;
  overflow: auto;
}
</style>
