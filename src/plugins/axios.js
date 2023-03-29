import axios from 'axios';
import VueAxios from 'vue-axios';

export default {
  install(Vue) {
    const instance = axios.create({
      baseURL: 'https://localhost:9000',
    });

    Vue.use(VueAxios, instance);
  },
};
