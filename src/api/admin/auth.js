import Vue from 'vue';

async function login(data) {
  const res = await Vue.http({
    url: '/v1/login',
    method: 'POST',
    data,
  });

  return res.data;
}

async function introspect() {
  const res = await Vue.http({
    url: '/v1/introspect',
    method: 'GET',
  });

  return res.data;
}

async function logout() {
  const res = await Vue.http({
    url: '/v1/logout',
    method: 'POST',
  });

  return res.data;
}

export default {
  login,
  introspect,
  logout,
};
