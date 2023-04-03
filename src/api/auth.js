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

export default {
  login,
  introspect,
};
