<template>
  <div class="ma-10">
    <v-row class="my-12">
      <h1 class="display-1">Device Manager</h1>
      <v-spacer></v-spacer>
      <!-- Not used as of right now -->
      <!-- <v-btn text>Add New Device</v-btn> -->
    </v-row>

    <v-dialog v-model="editDevice" width="500px">
      <v-card>
        <v-card-title>
          <span class="title font-weight-regular">Edit device</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="deviceName" label="Enter a new device name"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="editDevice = false">Cancel</v-btn>
          <v-btn text @click="editDeviceName()">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card
      flat
      v-for="device in devices"
      :key="device.deviceId"
      class="my-4"
      style="border-radius: 10px"
      :id="device.deviceId"
    >
      <v-expansion-panels>
        <v-expansion-panel>
          <v-row class>
            <v-col class="text-left px-10 py-5">
              <div class="headline">{{ device.deviceName }}</div>
              <div
                :class="
                    (device.online ? 'green--text' : 'red--text') +
                      ' font-weight-bold body-1 text-uppercase mt-4'
                  "
              >{{ device.online ? "Online" : "Offline" }}</div>
            </v-col>
            <v-col cols="2" class="d-flex justify-end align-center">
              <div class="mr-5">
                <v-tooltip bottom>
                  <template v-slot:activator="{on}">
                    <v-btn icon @click="deviceId = device.deviceId; rebootDevice()" v-on="on">
                      <v-icon>mdi-power</v-icon>
                    </v-btn>
                  </template>
                  <span>Reboot device</span>
                </v-tooltip>
                <v-tooltip bottom v-if="user.role === 'Admin'">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      @click.stop="deviceId = device.deviceId; editDevice = true"
                      v-on="on"
                      >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Edit device</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>mdi-record</v-icon>
                    </v-btn>
                  </template>
                  <span>Stop stream</span>
                </v-tooltip>
              </div>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-expansion-panel-header>
            <span class="overline">Show details</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="subtitle-1">
              <span class="font-weight-bold" :class="device.online ? 'green--text' : 'red--text'">
                {{
                device.cameraPlugged ? "Camera Connected " : "Camera Not Connected"
                }}
              </span>
              <!-- {{ device.cameraPlugged}} -->
            </div>
            <div class="subtitle-1">
              <span class="font-weight-bold">
                {{
                device.streaming ? "Currently Streaming: " : ""
                }}
              </span>
              {{ device.streaming ? "" : "Not Streaming" }}
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script>
// import axios from "axios";
import io from "socket.io-client";
import {URL} from "../../config"
export default {
  name: "device-manager",
  data() {
    return {
      socket: io(`http://${URL}:3001`),
      editDevice: false,
      devices: [],
      deviceId: "",
      deviceName: ""
    };
  },
  methods: {
    getDevices() {
      this.socket.on("info", device_info => {
        this.devices = device_info;
        console.log(this.devices);
      });
    },  
    rebootDevice() {
      console.log("Rebooting");
    }
  },
  mounted() {
    this.getDevices();
  },
  props: {
    user: Object
  }
};
</script>
