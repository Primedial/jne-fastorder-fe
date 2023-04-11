import auth from '@/api/admin/auth';

const defaultState = () => ({
  isLoggedIn: false,
  user: {
    id: null,
    name: '',
    email: '',
    address: '',
  },
});

const mutations = {
  SET_LOGGED_IN: (state, val) => {
    state.isLoggedIn = val;
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
    if (localStorage.getItem('admintoken')) {
      try {
        const res = await auth.introspect();
        commit('SET_LOGGED_IN', true);
        commit('SET_USER_DETAIL', res.data);
      } catch (e) {
        // do nothing
      }
    }
    commit('app/SET_LOADED');
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
