import axios from './axios';
import elementUI from './elementUI';
import '@/assets/styles/main.scss';

const plugins = {
  install(Vue) {
    Vue.use(axios);
    Vue.use(elementUI);
  },
};

export default plugins;
