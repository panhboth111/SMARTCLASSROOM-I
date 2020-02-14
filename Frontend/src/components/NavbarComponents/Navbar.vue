<template>
  <nav>
    <v-app-bar class="black lighten-2 pr-2" dark flat app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer; stream_drawer = !stream_drawer" id="drawerBtn"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <router-link to="/home" exact class="white--text" style="text-decoration: none">
          <span class="font-weight-thin title">Class</span>
          <span class="font-weight-bold title">Time</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined v-if="user.isStreaming" class="red" id="stopStreamBtn" @click="stopStream()">
        <v-icon left>mdi-record</v-icon>Stop Stream
      </v-btn>
      <StartStream v-else :user="user" />
      <v-btn icon class="ml-4">
        <v-icon @click="signout()">mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="stream_drawer"
      app
      clipped
    >
      <template v-slot:prepend>
        <v-list-item two-line class="my-3">
          <v-list-item-avatar color="pink">
            <span class="white--text">CL</span>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle class="caption text-uppercase">{{ user.role }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense class="mt-3">
          <v-list-item-group v-model="item" color="primary">
            <v-list-item router to="/home">
              <v-list-item-content>
                <v-list-item-title v-text="'Home'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item router to="/devices" v-if="user.role !== 'Student'">
              <v-list-item-content>
                <v-list-item-title v-text="'Device Manager'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item router to="/user-management" v-if="user.role === 'Admin'">
              <v-list-item-content>
                <v-list-item-title v-text="'User Management'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item router to="/stream-management" v-if="user.role === 'Admin'">
              <v-list-item-content>
                <v-list-item-title v-text="'Stream Management'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import StartStream from "./StartStream";
import auth from "../../auth";
import backend from "../../Service";
import io from "socket.io-client";
import {URL} from '../../../config'

export default {
  data: () => {
    return {
      socket: io(`http://${URL}:3001`),
      stream_drawer: false,
      drawer: false,
      item: 1,
      items: [
        { text: "Home", route: "/home" },
        { text: "Device Manager", route: "/devices" },
        { text: "User", route: "/user-management" }
      ]
    };
  },
  props: {
    user: Object
  },
  methods: {
    signout() {
      backend.logout();
      auth();
    },
    stopStream() {
      console.log("stopping.......");
      backend.stopStream();
      this.socket.emit('stop',this.user.email)
    }
  },
  components: {
    StartStream
  },
  created() {
    console.log(this.$route);
  }
};
</script>
