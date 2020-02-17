import { getUserInfo } from "./types";
import backend from "../../Service";
export default {
  getUserInfo: async ({ commit }) => {
    const user = await backend.getUserInfo();
    commit(getUserInfo, user.data);
  }
};
