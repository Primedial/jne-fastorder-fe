import Vue from 'vue';
import { contactUsageType } from '@/constants/awb';

const CONTACT_URL = '/v1/contact';

async function getContact(params) {
  const res = await Vue.axios({
    url: CONTACT_URL,
    method: 'GET',
    params,
  });

  return res.data;
}

async function getContactDetail(id) {
  const res = await Vue.axios({
    method: 'GET',
    url: `${CONTACT_URL}/${id}`,
  });

  return res.data;
}

async function createEdit(data) {
  const param = data.contact_type === contactUsageType.SHIPPER ? 'shipper' : 'receiver';
  const res = await Vue.axios({
    method: 'POST',
    url: `${CONTACT_URL}/${param}`,
    data,
  });

  return res.data;
}

export default {
  getContact,
  getContactDetail,
  createEdit,
};
