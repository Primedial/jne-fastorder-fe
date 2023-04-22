import Vue from 'vue';

async function login(data) {
  const res = await Vue.axios({
    url: '/v1/login',
    method: 'POST',
    data,
  });

  return res.data;
}

async function introspect() {
  const res = await Vue.axios({
    url: '/v1/introspect',
    method: 'GET',
  });

  return res.data;
}

async function logout() {
  const res = await Vue.axios({
    url: '/v1/logout',
    method: 'POST',
  });

  return res.data;
}

async function resetPassword(data) {
  const res = await Vue.axios({
    url: '/v1/reset-password',
    method: 'POST',
    data,
  });

  return res.data;
}

async function setPassword(data, token) {
  const res = await Vue.axios({
    url: '/v1/set-password',
    method: 'POST',
    data,
    params: { token },
  });

  return res.data;
}

async function verify(data, token) {
  const res = await Vue.axios({
    url: '/v1/verify',
    method: 'POST',
    data,
    params: { token },
  });

  return res.data;
}

export default {
  login,
  introspect,
  logout,
  setPassword,
  resetPassword,
  verify,
};
