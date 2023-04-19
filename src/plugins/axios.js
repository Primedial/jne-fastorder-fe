import { Message } from 'element-ui';
import axios from 'axios';
import axios2 from 'axios';
import VueAxios from 'vue-axios';
import router from '@/router';

export default {
  install(Vue) {
    const publicUrls = ['/v1/login'];
    const instance = axios.create({
      baseURL: `${process.env.VUE_APP_API_URL}/api`,
    });
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (!publicUrls.includes(config.url)) {
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
      if (error?.response?.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
      }
      return Promise.reject(error);
    });

    const adminPublicUrls = ['/v1/login'];
    const adminInstance = axios2.create({
      baseURL: `${process.env.VUE_APP_API_URL}/api/admin`,
    });
    adminInstance.interceptors.request.use((config) => {
      if (!adminPublicUrls.includes(config.url)) {
        const token = localStorage.getItem('token');
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    adminInstance.interceptors.response.use((response) => response, (error) => {
      if (error?.response?.data?.message) {
        Message({
          type: 'error',
          message: error?.response?.data?.message,
        });
      }
      if (error?.response?.status === 401) {
        localStorage.removeItem('token');
        router.push('/mysales/login');
      }
      return Promise.reject(error);
    });

    Vue.use(VueAxios, { axios: instance, http: adminInstance });
  },
};
