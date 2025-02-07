/*
* @Author: @vedatbozkurt
* @Date:   2020-06-26 14:42:53
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-07-16 19:43:14
*/
import axios from "axios";
const namespaced= true;

const state = {
  courierData: {}
};

/*getters: {
    user: state => state.userData
  },*/

  const getters = {
   courier: state => state.courierData
};

const actions =  {
  async getCourierData({ commit }) {
      commit("setLoader", true, { root: true });
    await axios.get(process.env.VUE_APP_API_URL + "profile")
    .then(response => {
      commit("setCourierData", response.data);
      commit("setLoader", false, { root: true });
    })
    .catch(() => {
      localStorage.removeItem("authToken");
      commit("setLoader", false, { root: true });
    });
  },
  async uploadCourierData({ commit }, data) {
    commit("setLoader", true, { root: true });
    commit("setErrors", {}, { root: true });
    await axios.post(process.env.VUE_APP_API_URL + "profile", data)
    .then(response => {
      commit("setCourierData", response.data.data);
      commit("setLoader", false, { root: true });
    });
  },
}

const mutations =  {
  setCourierData(state, courier) { state.courierData = courier }
}


export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
