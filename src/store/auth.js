import auth from '@/api/auth';

const defaultState = () => ({
  isLoggedIn: false,
  user: {
    id: null,
    name: '',
    email: '',
    date_of_birth: '',
    phone_no: '',
    address: '',
  },
});

const mutations = {
  SET_LOGGED_IN: (state) => {
    state.isLoggedIn = true;
  },
  SET_USER_DETAIL: (state, payload) => {
    state.user = { ...payload };
  },
  RESET_STATE: (state) => {
    state.user = { ...defaultState().user };
  },
  SET_LOADED: (state) => {
    state.loaded = true;
  },
};
const actions = {
  async introspect({ commit }) {
    try {
      const res = await auth.introspect();
      commit('SET_LOGGED_IN');
      commit('SET_USER_DETAIL', res.data);
    } catch (e) {
      console.log(e);
    }
    commit('SET_LOADED');
  },
};

const getters = {
  isLoaded: (state) => state.loaded,
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user,
};

export default {
  namespaced: true,
  state: {
    ...defaultState(),
    loaded: false,
  },
  mutations,
  actions,
  getters,
};
