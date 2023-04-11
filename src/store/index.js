import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import app from './app';
import adminAuth from './adminAuth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoaded: false,
  },
  getters: {
    loaded: (state) => state.isLoaded,
  },
  mutations: {
    SET_LOADED(state) {
      state.isLoaded = true;
    },
  },
  actions: {
  },
  modules: {
    app,
    auth,
    adminAuth,
  },
});
