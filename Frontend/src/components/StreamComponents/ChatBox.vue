<template>
  <v-app>
    <v-card>
      <!-- <v-system-bar color="#000000" dark>
				<v-spacer></v-spacer>

				<v-icon>mdi-window-minimize</v-icon>

				<v-icon>mdi-window-maximize</v-icon>

				<v-icon>mdi-close</v-icon>
      </v-system-bar>-->

      <v-card-text>
        <p class="overline mb-0 mt-2">Live</p>
        <p class="title my-0">Stream chat</p>
      </v-card-text>
      <v-tabs v-model="tab" background-color="transparent" centered color="black" class="mb-5">
        <v-tab>
          <div style="width: 100px">Chat</div>
        </v-tab>
        <v-tab>
          <div style="width: 100px">Question</div>
        </v-tab>
      </v-tabs>

      <!-- <v-card class="chat-box">
          <div
            class="message"
            v-for="message in messages"
            v-bind:key="message._id"
          >
            <div class="message-text py-2">
              <span class="username">{{ message.username }}</span>
              : {{ message.msg }}
            </div>
            <v-divider></v-divider>
          </div>
      </v-card>-->

      <v-card-text>
        <p class="overline mb-0 mt-2">Announcement</p>
        <p
          :class="announcement !== '' ? 'title ':'title font-italic font-weight-light' + ' my-0'"
        >{{announcement !== "" ? announcement: "No announcements right now"}}</p>
      </v-card-text>
      <v-divider></v-divider>

      <v-container class="pa-1 chat-box" id="messageBody">
        <!-- <div class="message" v-for="message in messages" v-bind:key="message._id">
          <div class="message-text py-2">
            <span class="username">{{ message.username }}</span>
            : {{ message.msg }}
          </div>
          <v-divider></v-divider>
        </div>-->

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <div class="px-3">
                <div v-for="message in chats" :key="message._id" class="message pb-1">
                  <span class="font-weight-bold" >{{message.username}}</span> -
                  <span v-html="message.message"></span>
                </div>
              </div>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <div>
                <div v-for="message in questions" :key="message._id" class="message">
                  <span class="font-weight-bold">{{message.username}}</span> -
                  <span>{{message.message}}</span>
                </div>
              </div>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
      <v-card-actions>
        <v-container class="pa-1">
          <v-form @submit.prevent="sendMessage()" autocomplete="off">
            <!-- <v-text-field
            label="Enter Your Message Here"
            type="text"
            filled
            rounded
            dense
            outlined
            v-model="msg"
            append-outer-icon="mdi-send"
            @click:append-outer="sendMessage()"
            />-->
            <!-- <v-text-field
            v-model="msg"
            solo
            label="Send a message"
            ></v-text-field>-->


            <v-text-field
              color="black"
              filled
              solo
              label="Send a message"
              type="text"
              append-icon="mdi-send"
              v-model="msg"
              @keyup="setEmoji"
              @click:append="sendMessage()"
            ></v-text-field>
            <p id="emojionearea"></P>
          </v-form>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import io from "socket.io-client";
import backend from "../../Service"
import emojis from "emojis"
import { URL } from "../../../config";
// import emojiCo from "emoji-js"
// import axios from 'axios'
export default {
  name: "chatbox",
  data() {
    return {
      username: "",
      socket: io(`${URL}:4000`),
      users: [],
      msg: "",
      tab: null,
      chats: [],
      questions: [],
      announcement: ""
    };
  },
  props: {
    user: Object
  },
  methods: {
    async getAllChat() {
      const roomId = window.location.href.split("stream/")[1]
      const { chats, questions, announcement } = await backend.getAllChat(roomId)    
        if (chats != undefined){
          this.chats = chats
        }
        if(questions != undefined){
          this.questions = questions
        }
        if(announcement != undefined){
          this.announcement = announcement;
        }
    },
    // eslint-disable-next-line no-unused-vars
    setEmoji(event){
      const emojiReg = /.?:[a-z,0-9]{0,}:.?/ig
      // alert(event.keyCode)
      if (emojiReg.test(this.msg)){
        this.msg = emojis.unicode(this.msg)
      }
    },
    getText() {
      const roomId = window.location.href.split("stream/")[1];
      this.socket.on(roomId, ({ chats, questions, announcement }) => {
        if (chats != undefined){
          this.chats.push(chats)
        }
        if(questions != undefined){
          this.questions.push(questions)
        }
        if(announcement != undefined){
          this.announcement = announcement;
        }
        // console.log(chats)
          console.log(this.chats)

      });
    }
    ,
    sendMessage() {
      const roomId = window.location.pathname.split("stream/")[1];

      this.socket.emit("input", {
        username: this.user.name,
        email:this.user.email,
        message: this.msg,
        roomId
      });
      this.msg = "";
    }
    
  },
  mounted() {
    this.getText();
  },
  created() {
    this.getAllChat();
  }
};
</script>

<style scoped>
.chat-box {
  height: 600px;
  overflow: auto;
}
.username {
  text-decoration: underline;
  font-weight: bold;
  color: #0275d8;
}
</style>
