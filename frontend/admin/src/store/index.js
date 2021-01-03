import axios from "axios";
import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import profile from './modules/profile';
import setting from './modules/setting';
import city from './modules/city';
import district from './modules/district';
import branch from './modules/branch';
import courier from './modules/courier';
import user from './modules/user';
import task from './modules/task';
import address from './modules/address';
import dashboard from './modules/dashboard';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  state: {
    errors: [],
    loader: true,
    searchData: null,
    currencyData: null,
  },

  getters: {
    errors: state => state.errors,
    loader: state => state.loader,
    search: state => state.searchData,
    currency: state => state.currencyData
  },

  actions: {
    async getCurrency({ commit }) {
      commit("setErrors", {}, { root: true });
      await axios.get(process.env.VUE_APP_API_URL + "currency")
      .then(response => {
        commit("setCurrency", response.data);
      });
    },
  },

  mutations: {
    setErrors(state, errors) { state.errors = errors; },
    setLoader(state, loader) { state.loader = loader; },
    setSearch(state, data) { state.searchData = data; },
    setCurrency(state, data) { state.currencyData = data; }
  },

  modules: {
    auth,
    profile,
    setting,
    city,
    district,
    branch,
    courier,
    user,
    task,
    address,
    dashboard
  }
});
