import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import adminAuth from './adminAuth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    adminAuth,
  },
});
