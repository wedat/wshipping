/*
* @Author: @vedatbozkurt
* @Date:   2020-06-26 14:42:53
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-07-07 22:16:11
*/
import axios from "axios";
const namespaced= true;

const state = {
  userData: null,
};

/*getters: {
    user: state => state.userData
  },*/

  const getters = {
  // allPosts: state => state.posts,
  user: state => state.userData,
};

const actions =  {
  async sendLoginRequest({ commit }, data) {
    commit("setErrors", {}, { root: true });
    commit("setLoader", true, { root: true });
    await axios.post(process.env.VUE_APP_API_URL + "login", data)
    .then(response => {
      commit("setUserData", response.data.data.name);
      localStorage.setItem("authToken", response.data.data.token);
      commit("setLoader", false, { root: true });
    })
    .catch(() => {
      localStorage.removeItem("authToken");
      commit("setLoader", false, { root: true });
    });
  },
 /* sendRegisterRequest({ commit }, data) {
    commit("setErrors", {}, { root: true });
    return axios
    .post(process.env.VUE_APP_API_URL + "register", data)
    .then(response => {
      commit("setUserData", response.data.user);
      localStorage.setItem("authToken", response.data.token);
    });
  },*/
  sendLogoutRequest({ commit }) {
    commit("setLoader", true, { root: true });
    axios.post(process.env.VUE_APP_API_URL + "logout").then(() => {
      commit("setUserData", null);
      localStorage.removeItem("authToken");
      commit("setLoader", false, { root: true });
    });
  }
}

const  mutations =  {
  setUserData(state, user) { state.userData = user; },
}


export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
