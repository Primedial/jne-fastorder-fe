import Vue from 'vue';

const BASE_URL = '/v1/wallet';

async function topUpWallet(data) {
  const res = await Vue.axios({
    url: `${BASE_URL}/topup`,
    method: 'PUT',
    data,
  });

  return res.data;
}

async function withdraw(data) {
  const res = await Vue.axios({
    url: `${BASE_URL}/withdraw`,
    method: 'PUT',
    data,
  });

  return res.data;
}

async function getWalletHistory(params) {
  const res = await Vue.axios({
    url: `${BASE_URL}/history`,
    method: 'GET',
    params,
  });

  return res.data;
}

export default {
  topUpWallet,
  getWalletHistory,
  withdraw,
};
