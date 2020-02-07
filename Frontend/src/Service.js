import axios from "axios";
import cookie from "./cookie";
const url = "http://10.10.15.11:3000/";

class Service {
  // Get UserInfo
  static getUserInfo() {
    const token = cookie.getCookie("auth-token"); //window.localStorage.getItem("auth-token")
    return axios.get(`${url}users/user`, {
      params: {},
      headers: { "auth-token": token }
    });
  }
 
  // Start Stream
  static getCurrentlyStreaming(limit) {
    const token = cookie.getCookie("auth-token");
    return axios.post(
      `${url}users/getCurrentlyStream`,
      { limit },
      {
        params: {},
        headers: { "auth-token": token }
      }
    );
  }

  // Start Stream
  static startStream(streamTitle, description, isPrivate, password,streamBy,role) {
    const token = cookie.getCookie("auth-token");
    const route = (role==='Device')?'deviceStartStream':'startStream'
    console.log(streamTitle + description + isPrivate + password);
    return axios.post(
      `${url}users/${route}`,
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
      `${url}users/joinStream`,
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

  // Stop stream
  static async stopStream() {
    const token = cookie.getCookie("auth-token"); //window.localStorage.getItem("auth-token")
    const result = await axios.get(`${url}users/stopStream`, {
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
      `${url}users/getStreamDetail`,
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

  // Post Data for login
  static async login(email, pwd) {
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
}

export default Service;
