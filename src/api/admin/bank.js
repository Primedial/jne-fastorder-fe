import Vue from 'vue';

const BANK_BASE_URL = '/v1/bank';
export default {
  async getAll(params) {
    const res = await Vue.http({
      url: BANK_BASE_URL,
      method: 'GET',
      params,
    });

    return res.data;
  },
  async create(data) {
    const res = await Vue.http({
      url: BANK_BASE_URL,
      method: 'POST',
      data,
    });

    return res.data;
  },
};
