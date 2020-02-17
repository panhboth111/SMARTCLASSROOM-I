import axios from "axios";
import cookie from "./cookie";
import { URL } from "../config";
const url = `http://${URL}:3000/`;

class Service {
  // Get UserInfo
  static getUserInfo() {
    const token = cookie.getCookie("auth-token"); //window.localStorage.getItem("auth-token")
    return axios.get(`${url}users/user`, {
      params: {},
      headers: { "auth-token": token }
    });
  }

  // Get Users info
  static getAllUsers() {
    const token = cookie.getCookie("auth-token");
    return axios.get(`${url}users/allUsers`, {
      params: {},
      headers: { "auth-token": token }
    });
  }

  // Start Stream
  static getCurrentlyStreaming(limit, status) {
    const token = cookie.getCookie("auth-token");
    return axios.post(
      `${url}streams/getCurrentlyStream`,
      { limit, status },
      {
        params: {},
        headers: { "auth-token": token }
      }
    );
  }

  // Start Stream
  static startStream(
    streamTitle,
    description,
    isPrivate,
    password,
    streamBy,
    role
  ) {
    console.log("Start");
    const token = cookie.getCookie("auth-token");
    const route = role === "Device" ? "deviceStartStream" : "startStream";
    console.log(streamTitle + description + isPrivate + password);
    return axios.post(
      `${url}streams/${route}`,
      {
        streamTitle,
        description,
        isPrivate,
        password,
        streamBy
      },
      { params: {}, headers: { "auth-token": token } }
    );
  }

  // Join Stream
  static async joinStream(streamCode, pwd) {
    const token = cookie.getCookie("auth-token");
    const result = await axios.post(
      `${url}streams/joinStream`,
      {
        streamCode,
        pwd
      },
      { params: {}, headers: { "auth-token": token } }
    );

    if (result.data.errCode != undefined) {
      window.replace("/StreamNotFound");
    } else {
      return result.data;
    }
  }

  // Edit Stream
  static async editStream(streamCode, streamTitle, description) {
    const token = cookie.getCookie("auth-token"); //window.localStorage.getItem("auth-token")
    const result = await axios.post(
      `${url}streams/editstream`,
      {
        streamCode,
        streamTitle,
        description
      },
      {
        params: {},
        headers: { "auth-token": token }
      }
    );

    return result.data;
  }

  // Stop stream
  static async stopStream() {
    const token = cookie.getCookie("auth-token"); //window.localStorage.getItem("auth-token")
    const result = await axios.get(`${url}streams/stopStream`, {
      params: {},
      headers: { "auth-token": token }
    });

    if (result.data.status) {
      window.location.replace("/home");
    }
  }

  // Get Stream detail
  static getStreamDetail(streamCode) {
    const token = cookie.getCookie("auth-token");
    return axios.post(
      `${url}streams/getStreamDetail`,
      { streamCode },
      { params: {}, headers: { "auth-token": token } }
    );
  }

  // Post Data for signing up
  static async signUp(email, pwd, name) {
    return axios.post(`${url}auth/signUp`, {
      email,
      pwd,
      name
    });
  }

  // Change userRole
  static async changeRole(email, role) {
    const token = cookie.getCookie("auth-token"); //window.localStorage.getItem("auth-token")
    const result = await axios.post(
      `${url}users/changeRole`,
      {
        email,
        role
      },
      {
        params: {},
        headers: { "auth-token": token }
      }
    );

    return result.data;
  }

  // Post Data for login
  static async login(email, pwd) {
    const credential = await axios.post(`${url}auth/login`, {
      email,
      pwd
    });
    const { message, success, token } = credential.data;
    if (success) {
      cookie.setCookie("auth-token", token, 30); //window.localStorage.setItem("auth-token",token)
      localStorage.setItem("LastLogged", Date.now());
      alert(message);
      window.location.replace("/home");
    }
    return message;
  }

  static async deviceLogin(email, pwd) {
    const credential = await axios.post(`${url}auth/login`, {
      email,
      pwd
    });
    const { token } = credential.data;
    if (token) {
      cookie.setCookie("auth-token", token, 30); //window.localStorage.setItem("auth-token",token)
      localStorage.setItem("LastLogged", Date.now());
      window.location.replace("/home");
      return null;
    } else {
      return { message: credential.data.message };
    }
  }

  // Logout from all browser tab
  static async logout() {
    cookie.setCookie("auth-token", "", 30);
    localStorage.setItem("LastLogged", Date.now());
  }

  // Get All Chats
  static async getAllChat(roomId) {
    const chat = await axios.post(`http://localhost:4000/getChat`, {
      roomId
    });
    if (chat.data != undefined) {
      console.log(chat);
      return {
        chats: chat.data.chats,
        questions: chat.data.questions,
        announcement: chat.data.announcement
      };
    } else {
      return null;
    }
  }
}

export default Service;
