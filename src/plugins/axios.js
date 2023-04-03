import axios from 'axios';
import VueAxios from 'vue-axios';

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

    Vue.use(VueAxios, instance);
  },
};
