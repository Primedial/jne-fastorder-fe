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
    wallet: {
      amount: 0,
    },
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
    if (localStorage.getItem('token')) {
      try {
        const res = await auth.introspect();
        commit('SET_LOGGED_IN', true);
        commit('SET_USER_DETAIL', res.data);
      } catch (e) {
        // do nothing
      }
    }
    commit('SET_LOADED', null, { root: true });
  },
};

const getters = {
  isLoaded: (state) => state.loaded,
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user.user,
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
