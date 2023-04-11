export default {
  namespaced: true,
  state: {
    loaded: false,
  },
  getters: {
    isLoaded: (state) => state.loaded,
  },
  mutations: {
    SET_LOADED: (state) => {
      state.isLoaded = true;
    },
  },
};
