import Vue from 'vue';

const BASE_URL = '/v1/wallet';

async function topUpWallet(data) {
  const res = await Vue.axios({
    url: `${BASE_URL}/topup`,
    method: 'PATCH',
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
};
