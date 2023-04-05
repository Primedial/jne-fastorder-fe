import Vue from 'vue';

const CONTACT_URL = '/v1/contact';

async function getContact(params) {
  const res = await Vue.axios({
    url: CONTACT_URL,
    method: 'GET',
    params,
  });

  return res.data;
}

export default {
  getContact,
};
