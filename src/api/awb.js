import Vue from 'vue';

const AWB_BASE_URL = '/v1/awb';

async function getDestinations(params) {
  const res = await Vue.axios({
    url: `${AWB_BASE_URL}/destination`,
    method: 'GET',
    params,
  });

  return res.data;
}

async function getOrigins(params) {
  const res = await Vue.axios({
    url: `${AWB_BASE_URL}/origin`,
    method: 'GET',
    params,
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

async function generateAWB(data) {
  const res = await Vue.axios({
    url: AWB_BASE_URL,
    method: 'POST',
    data,
  });

  return res.data;
}

async function bulkGenerateAWB(data) {
  const res = await Vue.axios({
    url: `${AWB_BASE_URL}/bulk`,
    method: 'POST',
    data,
  });

  return res.data;
}

async function getDeliveryHistory(params) {
  const res = await Vue.axios({
    url: AWB_BASE_URL,
    method: 'GET',
    params,
  });

  return res.data;
}

async function getDeliveryOverview(params) {
  const res = await Vue.axios({
    url: `${AWB_BASE_URL}/overview`,
    method: 'GET',
    params,
  });

  return res.data;
}

export default {
  getDestinations,
  getOrigins,
  checkTarrif,
  generateAWB,
  getDeliveryHistory,
  bulkGenerateAWB,
  getDeliveryOverview,
};
