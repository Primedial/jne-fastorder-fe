import Vue from 'vue';

export default {
  async getAll() {
    const res = await Vue.http({
      url: '/v1/user_type',
      method: 'GET',
    });

    return res.data;
  },
  async create(data) {
    const res = await Vue.http({
      url: '/v1/user_type',
      method: 'POST',
      data,
    });

    return res.data;
  },
};
