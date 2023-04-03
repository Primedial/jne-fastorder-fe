import Vue from 'vue';

const AWB_BASE_URL = '/v1/awb';

async function getDestinations() {
  const res = await Vue.axios({
    url: `${AWB_BASE_URL}/destination`,
    method: 'GET',
  });

  return res.data;
}

async function getOrigins() {
  const res = await Vue.axios({
    url: `${AWB_BASE_URL}/origin`,
    method: 'GET',
  });

  return res.data;
}

async function checkTarrif(data) {
  const res = await Vue.axios({
    url: `${AWB_BASE_URL}/tarrif`,
    method: 'POST',
    data,
  });

  return res.data;
}

export default {
  getDestinations,
  getOrigins,
  checkTarrif,
};
