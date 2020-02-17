import { getUserInfo } from "./types";
import backend from "../../Service";
export default {
  getUserInfo: async ({ commit }) => {
    const user = await backend.getUserInfo();
    const history = await backend.getUserHistory();
    commit(getUserInfo, { user: user.data, history: history.data.message });
  }
};
