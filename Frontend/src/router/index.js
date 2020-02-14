import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Profile from "../views/Profile"
import About from "../views/About";
import Login from "../views/Login";
import StreamRoom from "../views/StreamRoom";
import DeviceManager from "../views/DeviceManager";
import DeviceLogin from "../views/DeviceLogin";
import DeviceHome from "../views/DeviceHome";
import UserManagement from "../views/UserManagement";
import StreamManagement from "../views/StreamManagement"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/stream/:streamName",
    name: "stream",
    component: StreamRoom
  },
  {
    path: "/devices",
    name: "devices",
    component: DeviceManager
  },
  {
    path: "/device-login",
    name: "device-login",
    component: DeviceLogin
  },
  {
    path: "/device-home",
    name: "device-home",
    component: DeviceHome
  },
  {
    path: "/user-management",
    name: "user-management",
    component: UserManagement
  },
  {
    path: "/stream-management",
    name: "stream-management",
    component: StreamManagement
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
