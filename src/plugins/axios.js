import { Message } from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import router from '@/router';

export default {
  install(Vue) {
    const publicUrls = ['/v1/login'];
    const instance = axios.create({
      baseURL: `${process.env.VUE_APP_API_URL}/api`,
    });
    instance.interceptors.request.use((config) => {
      if (!publicUrls.includes(config.url)) {
        const token = localStorage.getItem('token');
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    instance.interceptors.response.use((response) => response, (error) => {
      if (error?.response?.data?.message) {
        Message({
          type: 'error',
          message: error?.response?.data?.message,
        });
      }
      return Promise.reject(error);
    });

    Vue.use(VueAxios, instance);
  },
};
