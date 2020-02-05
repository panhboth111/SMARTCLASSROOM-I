import cookie from "./cookie";

function auth() {
  const auth_token = cookie.getCookie("auth-token"); //window.localStorage.getItem("auth-token")
  if (auth_token !== null && auth_token !== "") {
    if (window.location.pathname == "/") {
      window.location.replace("/home");
    }
  } else {
    if (window.location.pathname != "/") {
      window.location.replace("/");
    }
  }
}

export default auth;
