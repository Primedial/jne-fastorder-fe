import Vue from 'vue';

export default {
  async getAll(params) {
    const res = await Vue.http({
      url: '/v1/user',
      method: 'GET',
      params,
    });

    return res.data;
  },
};
