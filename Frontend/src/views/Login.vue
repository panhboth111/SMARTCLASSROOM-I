<template>
  <div class="d-flex align-center container-div">
    <span class="bg"></span>
    <LoginCard />
  </div>
</template>

<script>
import LoginCard from "../components/LoginComponents/LoginCard";
export default {
  components: {
    LoginCard
  }
};
</script>

<style>
.container-div {
  height: 100%;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80")
    no-repeat center center;
  background-size: cover;
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
</style>
